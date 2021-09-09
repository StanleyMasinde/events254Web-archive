export default async function ({ $axios, route }) {
  if (process.server) {
    const u = `https://analytics.opensource254.co.ke/matomo.php?action_name=Events254&idsite=1&url=https://${process.env.APP_URL}/${route.fullPath}`
    await $axios.post(u)
    return
  }
  const _paq = window._paq = window._paq || []
  /* tracker methods like "setCustomDimension" should be called before "trackPageView" */
  _paq.push(['trackPageView'])
  _paq.push(['enableLinkTracking'])
  _paq.push(['enableHeartBeatTimer'])

  const u = '//analytics.opensource254.co.ke/'
  _paq.push(['setTrackerUrl', u + 'matomo.php'])
  _paq.push(['setSiteId', '1'])
  const d = document; const g = d.createElement('script'); const s = d.getElementsByTagName('script')[0]
  g.async = true; g.src = u + 'matomo.js'; s.parentNode.insertBefore(g, s)
}
