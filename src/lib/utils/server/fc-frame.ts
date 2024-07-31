import { getSetting, setSetting, STORE } from '$lib/utils/server/settings'
import { config } from '@/lib/config';
import { SECRET_COINMARKETCAP_API_KEY } from '$env/static/private'
import type { T_FRAME_API_BODY } from '$lib/types/fc-frame-post'
import { fcFrame, getDefaultButtons } from '$lib/utils/client/fc-frame'



// default-og-author.webp
// default-og-blog-about.webp
// default-og-blog-opt.webp


const DONATE_CHOOSE_CHAIN = config.baseSiteUrl + '/images/og/default-og-donate.webp'
const DONATE_AMOUNT_OP = config.baseSiteUrl + '/images/og/default-og-donate-amount-op.webp'
const DONATE_AMOUNT_BASE = config.baseSiteUrl + '/images/og/default-og-donate-amount-base.webp'
const DONATE_ERROR = config.baseSiteUrl + '/images/og/default-og-donate-failed.webp'
const DONATE_ERROR_BAD_CUSTOM_VALUE = config.baseSiteUrl + '/images/og/default-og-fail-custom-amount.webp'
const DONATE_SUCCESS = config.baseSiteUrl + '/images/og/default-og-donate-success.webp'
const AUTHOR_OG = config.baseSiteUrl + '/images/og/default-og-author.webp'
const BLOG_ABOUT_OG = config.baseSiteUrl + '/images/og/default-og-blog-about.webp'

// const donateButtons = [
//   {
//     text: 'Donate with Crypto',
//     index: 1,
//     redirect: false
//   },
//   {
//     text: 'Donate with Third Party',
//     index: 2,
//     redirect: false
//   },
// ]

const donateCryptoButtons = [
  {
    text: 'Donate using Base',
    index: 1,
    redirect: false
  },
  {
    text: 'Donate using Optimism',
    index: 2,
    redirect: false
  }
]

const aboutBlogButtons = [
  {
    text: 'About Blog',
    index: 1,
    redirect: false
  },
  {
    text: 'Support Blog',
    index: 2,
    redirect: false
  }
]

const getDonateButtons = (test = true) => {
  const testButton =   {
    text: 'Donate using Testnet',
    index: 3,
    redirect: false
  }
  if(test) {
    return donateCryptoButtons.concat(testButton)
  }
  return donateCryptoButtons
}

const donateValueButtons = [
  {
    text: 'Donate 1 USD',
    index: 1,
    redirect: false
  },
  {
    text: 'Donate 5 USD',
    index: 2,
    redirect: false
  },
  {
    text: 'Donate 10 USD',
    index: 3,
    redirect: false
  },
  {
    text: 'Donate 20 USD',
    index: 4,
    redirect: false
  },
  {
    text: 'Use custom value',
    index: 5,
    redirect: false
  }
]


const getApiPrice = async () => {
    const response = await fetch('https://pro-api.coinmarketcap.com/v2/cryptocurrency/quotes/latest?id=1027', {
        headers: {
            'X-CMC_PRO_API_KEY': SECRET_COINMARKETCAP_API_KEY,
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    })
    const data = await response.json()
    return data.data['1027'].quote.USD.price
}

const getEthValueInDollars = async (dollars: number, token: string) => {
    try {
        let ethPrice = (await getSetting(STORE.ETH_PRICE))?.value
        const now = Date.now()
        const lastUpdate = (new Date(ethPrice?.updated_at)).getTime()
        const diff = (now - lastUpdate) / (1000 * 60)
         if (!ethPrice || diff > 8) {
            ethPrice = await getApiPrice()
            if(!ethPrice) {
                return null
            }
            await setSetting(STORE.ETH_PRICE, ethPrice)
        }
        return BigInt(dollars / ethPrice).toString()
    } catch (error) {
        console.error(error)
        return null
    }
}

const etherUnits = {
  gwei: 9,
  wei: 18,
}

function parseUnits(value: string, decimals: number) {
  let [integer, fraction = '0'] = value.split('.')

  const negative = integer.startsWith('-')
  if (negative) integer = integer.slice(1)

  fraction = fraction.replace(/(0+)$/, '')

  if (decimals === 0) {
    if (Math.round(Number(`.${fraction}`)) === 1)
      integer = `${BigInt(integer) + 1n}`
    fraction = ''
  } else if (fraction.length > decimals) {
    const [left, unit, right] = [
      fraction.slice(0, decimals - 1),
      fraction.slice(decimals - 1, decimals),
      fraction.slice(decimals),
    ]

    const rounded = Math.round(Number(`${unit}.${right}`))
    if (rounded > 9)
      fraction = `${BigInt(left) + BigInt(1)}0`.padStart(left.length + 1, '0')
    else fraction = `${left}${rounded}`

    if (fraction.length > decimals) {
      fraction = fraction.slice(1)
      integer = `${BigInt(integer) + 1n}`
    }

    fraction = fraction.slice(0, decimals)
  } else {
    fraction = fraction.padEnd(decimals, '0')
  }

  return BigInt(`${negative ? '-' : ''}${integer}${fraction}`)
}

function parseEther(ether: string, unit: 'wei' | 'gwei' = 'wei') {
  return parseUnits(ether, etherUnits[unit])
}


export const sendNativeTokenTx = async (address: string, amount: string, chain: string) => {
  const value = parseEther(amount).toString()

  const chainId = chain.startsWith('0x') ? `eip155:${parseInt(chain, 16)}` : `eip155:${chain}`
  return { 
  chainId,
  method: "eth_sendTransaction",
  params: {
    abi: [],
    to: address,
    data: "0x",
    value,
  }
}
}

const notImplemented = () => {
  return new Response(`Not Implemented`,
  {
    headers: {
      'Cache-Control': 'max-age=0, s-maxage=3600',
      'Content-Type': 'text/html'
    },
    status: 200
  });
}

export const getFrameServerResponse = async (page: string, untrustedData: T_FRAME_API_BODY) => {

  const buttonIndex = untrustedData.untrustedData.buttonIndex

  switch (page) {
    case 'user':
      return new Response(`Not Implemented`,

      {
        headers: {
          'Cache-Control': 'max-age=0, s-maxage=3600',
          'Content-Type': 'text/html'
        },
        status: 200
      });
    case 'donate':
      return new Response(`Not Implemented`,

      {
        headers: {
          'Cache-Control': 'max-age=0, s-maxage=3600',
          'Content-Type': 'text/html'
        },
        status: 200
      });
    case 'donate-op':
      return new Response(`Not Implemented`,

      {
        headers: {
          'Cache-Control': 'max-age=0, s-maxage=3600',
          'Content-Type': 'text/html'
        },
        status: 200
      });
    case 'donate-base':

    return new Response(`Not Implemented`,

    {
      headers: {
        'Cache-Control': 'max-age=0, s-maxage=3600',
        'Content-Type': 'text/html'
      },
      status: 200
    });
    case 'donate-test':
      return new Response(`Not Implemented`,

      {
        headers: {
          'Cache-Control': 'max-age=0, s-maxage=3600',
          'Content-Type': 'text/html'
        },
        status: 200
      });
    default:
      let image
      const postUrlBase = config.baseSiteUrl + '/fc-frame-handler?page='
      let postUrl = postUrlBase + 'default'
      let redirectUrl = config.baseSiteUrl

      switch (Number(buttonIndex)) {
        case 2:
          image = AUTHOR_OG
          break
        case 3:
          image = DONATE_CHOOSE_CHAIN
          break
        case 4:
          image = DONATE_SUCCESS
          break
        case 5:
          image = DONATE_ERROR
          break
        case 6:
          image = DONATE_ERROR_BAD_CUSTOM_VALUE
          break
        default:
          return notImplemented()
      }

      const buttons = getDefaultButtons(redirectUrl)

      return new Response(
        fcFrame({
          image,
          buttons,
          postUrl
        }),
      {
        headers: {
          'Cache-Control': 'max-age=0, s-maxage=3600',
          'Content-Type': 'text/html'
        },
        status: 200
      });
  }
}