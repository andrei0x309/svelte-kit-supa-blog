export const getDefaultButtons = (pageLink: string) => {
    return [
        {
            text: 'Visit Page',
            index: 0,
            action: 'link',
            target: pageLink,
            redirect: true
        },
        {
            text: 'About Author',
            index: 1,
            redirect: false
        },
        {
            text: 'About Blog',
            index: 2,
            redirect: false
        },
        {
            text: 'Support Blog',
            index: 3,
            redirect: false
        }
    ]
}

export const fcFrame = ({
    image,
    postUrl,
    buttons,
    textInput,
    txUrl,
    addHtml = false
}: {
    image: string,
    postUrl: string
    buttons?: {
        text: string,
        index: number,
        action?: string,
        target?: string,
        post_url?: string,
        redirect: boolean
    }[],
    textInput?: {
        placeholder: string,
    } | undefined
    txUrl?: string
    addHtml?: boolean
}) => {

    const BUTTONS = (buttons ?? []).map(({ text, index, redirect, action, target, post_url }) => {
        let buttonText = `
        <meta property="fc:frame:button:${index}${redirect ? ':post_redirect' : ''}" content="${text}" />
        `
        if (action) {
            buttonText += `
            <meta property="fc:frame:button:${index}:action" content="${action}" />
            `
        }
        if (target) {
            buttonText += `
            <meta property="fc:frame:button:${index}:target" content="${target}" />
            `
        }

        if (post_url) {
            buttonText += `
            <meta property="fc:frame:button:${index}:post_url" content="${post_url}" />
            `
        }

        return buttonText

    }).join('\n') ?? ''

    const TEXT_INPUT = textInput ?
        `<meta property="fc:frame:input:text" content="${textInput.placeholder}" />` : ''


    const HRML_START = `
    <!DOCTYPE html>
    <html>
      <head>
      <meta property="og:image" content="${image}" />
    `

    const HTML_END = `
      </head>
      <body>
      </body>
    </html>
    `
    let finalResult = ''
    if (addHtml) {
        finalResult += HRML_START
    }

    finalResult += `
      <meta property="fc:frame" content="vNext" />
      <meta property="fc:frame:image" content="${image}" />
      <meta property="fc:frame:post_url" content="${postUrl}" />
      ${BUTTONS}
      ${TEXT_INPUT}
      `
    if (addHtml) {
        finalResult += HTML_END
    }

    return finalResult
}