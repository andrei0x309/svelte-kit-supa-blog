// import { error } from '@sveltejs/kit';
// import { supabase } from '@/lib/deno/supaClientEdge'
// import { supabase } from '@/lib/node/supaClientFS'
//
import type { RequestHandler } from  './$types';
import { json } from '@sveltejs/kit';
// import { client } from '@/lib/deno/smtpClient'


import { SECRET_SMTP_HOST, SECRET_SMTP_PORT, SECRET_SMTP_USERNAME, SECRET_SMTP_PASSWORD  } from '$env/static/private'


// const validateEmail = (email: string) => {
//     return String(email)
//       .toLowerCase(
//       .match(
//         /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
//       );
//   };

export const POST: RequestHandler = (async ({ request }) => {
  try {
const {
    name,
    email,
    message,
    hCaptcha
} = await request.json()

console.log(name, email, message, hCaptcha)



// const emailMessage = {
//   from: "website@flashsoft.eu",
//   to: "andrei@flashsoft.eu",
//   subject: "Message title TEST2",
//   text: "Plaintext version of the message",
//   html: "<p>HTML version of the message</p>"
// };

// const transport = nodemailer.createTransport({
//   host: SECRET_SMTP_HOST,
//   port: SECRET_SMTP_PORT,
//   secure: false, // upgrade later with STARTTLS
//   auth: {
//     user: SECRET_SMTP_USERNAME,
//     pass: SECRET_SMTP_PASSWORD,
//   },
// } as TransportOptions);

// transport.sendMail(emailMessage).catch(err => console.error(err));

  
return json({data: 'ok'})

    } catch (e) {
      console.log(e)
      return json({error: 'Internal Server Error'}, {status: 500})
    }
  
}) satisfies RequestHandler;
