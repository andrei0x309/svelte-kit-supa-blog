export const getGoogleAnalyticsCode = (id: string) => {
    return `
<script async type="text/partytown" src="https://www.googletagmanager.com/gtag/js?id=G-0TYDTZGHS4"></script>
<script type="text/partytown">
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());

  gtag('config', '${id}');
</script>
`
}