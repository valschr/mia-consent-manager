export const handleGrantDone = event => {
  const scripts = event.detail
  console.log('grant done', scripts)
  if (typeof window === 'undefined' || !window.dataLayer) {
    return console.log(
      'GTM instance could not be detected, please ensure that it is installed'
    )
  }
  scripts.forEach(s => {
    dataLayer.push({ event: `CM_GRANTED_${s.gtm ? s.gtm.grantEvent : s.name}` })
  })
}
