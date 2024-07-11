const LENS_API_URL = 'https://api.lens.dev'

const content =  `Learned about all the web3 lingo on @orbapp.lens app, and also got a NFT. Now I'm certified slang master 🧙

#orb #orbapp #orbsbt`

export const getLensAddressByUser = async (handle: string) => {
    try {
      handle = (handle ?? '').replace('@', '').toLowerCase()
      const req = await fetch(`${LENS_API_URL}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          query: `query Profile {
            profile( request: { handle: "${handle}"}) {
              ownedBy
            }
          }`
        })
      })
      if (req.ok) {
        const data = await req.json()
        console.log(data)
        if (!data?.data?.profile?.ownedBy) {
          return null
        }
        return data.data.profile.ownedBy.toLowerCase()
      } else {
        console.log(await req.json())
      }
    } catch (e) {
      console.log(e)
    }
    return null
  }

const web3Preview = {}
const hasMentions = (content ?? '').match(/(@.*?\.lens)/gi)

if (hasMentions) {
  const mentions = {} as Record<string, string>
  for (const mention of hasMentions) {
    console.log(mention)
    const address = await getLensAddressByUser(mention)
    if (address) {
      mentions[mention] = address
    }
  }
  if (Object.keys(mentions).length) {
    web3Preview.mentions = mentions
  }
}

console.log(web3Preview)