import { getConsentCookie, setConsentCookie } from './localStateHandler'

export const handleGrantDone = (event) => {
  const scripts = event.detail
  setConsentCookie(scripts)
  if (typeof window === 'undefined' || !window.dataLayer) {
    return console.log(
      'GTM instance could not be detected, please ensure that it is installed'
    )
  }
  scripts.forEach((s) => {
    if (s.granted) {
      console.log('GRANT', s)
      dataLayer.push({
        event: `CM_GRANTED_${s.gtm ? s.gtm.grantEvent : s.name}`,
      })
    }
  })
}

export const getInitialState = (scripts) => {
  const currentState = getConsentCookie()
  scripts.forEach((i) => {
    const previouslyGranted = currentState.find((r) => r.name === i.name)
    if (previouslyGranted) {
      i.granted = previouslyGranted.granted
      i.consent_answered = true
      if (typeof dataLayer !== 'undefined') {
        dataLayer.push({
          event: `CM_GRANTED_${i.gtm ? i.gtm.grantEvent : i.name}`,
        })
      }
    }
  })
  return {
    scripts,
    showPromp:
      scripts.length !== scripts.filter((i) => i.consent_answered).length,
  }
}
