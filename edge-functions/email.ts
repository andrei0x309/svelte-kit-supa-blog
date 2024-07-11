import { createClient } from "https://esm.sh/@supabase/supabase-js";

const SUPA_TOKEN = Deno.env.get('TOKEN')
const EMAIL_ID = Deno.env.get('EMAIL_ID')
const EMAIL_SECRET = Deno.env.get('EMAIL_SECRET')

const EMAIL_API_AUTH = 'https://api.sendpulse.com/oauth/access_token'
const EMAIL_API_ENDPOINT = 'https://api.sendpulse.com/smtp/emails'
const SECRET_HCAPTCHA_SECRET = Deno.env.get('SECRET_HCAPTCHA_SECRET')

const options = {
  schema: "public",
  autoRefreshToken: true,
  persistSession: true,
  detectSessionInUrl: true,
};

const supabase = createClient(
  "https://lcspcmmpolegvalxkfsu.supabase.co",
  SUPA_TOKEN,
  options,
);
 
const validateEmail = (email: string) => {
  return String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
};

export default async (request: Request) => {
    let  name, email, message, hCaptcha;
    try {
      ({ name, email, message, hCaptcha } = await request.json());
    } catch (error) {
      return Response.json({error: 'Missing required fields, email, hCaptcha, message'}, {status: 400})
    }
    if(!email || !message || !hCaptcha ) {
        return Response.json({error: 'Missing required fields, email, hCaptcha, message'}, {status: 400})
    }
    if(message.length > 2000) {
        return Response.json({error: 'Message too long'}, {status: 400})
    }
    if(message.length < 10) {
        return Response.json({error: 'Message too short'}, {status: 400})
    }
    if(name?.length > 150) {
        return Response.json({error: 'Name too long'}, {status: 400})
    }
    if(!validateEmail(email)) {
        return Response.json({error: 'Invalid email'}, {status: 400})
    }

    try {
      const response = await fetch(`https://hcaptcha.com/siteverify`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: new URLSearchParams({
          secret: SECRET_HCAPTCHA_SECRET,
          response: hCaptcha
        })
      })
      const { success } = await response.json()
      if(!success) {
        return Response.json({error: 'Invalid hCaptcha'}, {status: 400})
      }
    } catch (error) {
      return Response.json({error: 'Error validating hCaptcha'}, {status: 500})
    }
    
    try{
      
      const { data, error } = await supabase.from('fsk_email_token').select('*').eq('id', 1).limit(1)

      if(error) {
        return Response.json({error: 'Error accesing auth doken email DB'}, {status: 500})
      }

      if(!data || !data[0]) {
        return Response.json({error: 'Access token not found in DB'}, {status: 500})
      }

      let { token } = data[0]
      const expiration = Date.now() + 3600000
      const oldExpiration = (new Date(data[0]?.expiration ?? 0)).getTime()
      if(oldExpiration <= expiration || !token?.access_token) {
        const response = await fetch(EMAIL_API_AUTH, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            grant_type: 'client_credentials',
            client_id: EMAIL_ID,
            client_secret: EMAIL_SECRET
          })
        })

        if(response.status !== 200) {
          return Response.json({error: 'Error Getting Auth Token'}, {status: 500})
        }

        token = await response.json()
        const { error } = await supabase.from('fsk_email_token').upsert({id: 1, token: JSON.stringify(token), expiration: new Date(expiration).toISOString()})
        if(error) {
          console.error('Error updating token in DB', JSON.stringify(error))
        }
      }

      const emailMessage = {
        "email": {
          "text": message,
          "subject": `New message from ${name || 'anonymous'} (${email})`,
          "from": {
            "name": "Flashsoft Website",
            "email": "website@flashsoft.eu"
          },
          "to": [
            {
              "name": "Andrei O.",
              "email": "andrei@flashsoft.eu"
            }
          ]
        }
      }

      const response = await fetch(EMAIL_API_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token?.access_token}`
        },
        body: JSON.stringify(emailMessage)
      })

      if(response.status !== 200) {
        return Response.json({error: 'Error Sending email to API'}, {status: 500})
      }

      setTimeout(async () => {
      await supabase.from('fsk_email_copy').insert({json: JSON.stringify(emailMessage)})
      }, 50)
      
      return Response.json({data: 'ok'}, {status: 200})
    } catch (e) {
      return Response.json({error: `Internal Server Error: ${String(e)}`}, {status: 500})
    }
}
