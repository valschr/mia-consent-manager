import {
  getConsentCookie,
  setConsentCookie,
  setBinaryConsentCookie,
} from './localStateHandler'

export const handleGrantDone = (event) => {
  const scripts = event.detail
  setConsentCookie(scripts)

  scripts.forEach((s) => {
    setBinaryConsentCookie(s.gtm.grantEvent, !!s.granted)
    if (s.granted) {
      if (typeof window === 'undefined' || !window.dataLayer) {
        return console.log(
          'GTM instance could not be detected, please ensure that it is installed'
        )
      }
      dataLayer.push({
        event: `CM_GRANTED_${s.gtm ? s.gtm.grantEvent : s.name}`,
      })
    }
  })
}

export const getInitialState = (scripts) => {
  const currentState = getConsentCookie()
  // console.log('getInitialState', currentState)
  scripts.forEach((i) => {
    const previouslyGranted = currentState.find((r) => r.name === i.name)
    if (previouslyGranted) {
      i.granted = previouslyGranted.granted
      setBinaryConsentCookie(i.gtm.grantEvent, !!previouslyGranted.granted)
      i.consent_answered = true
    }
  })
  currentState
    .filter((r) => r.granted)
    .forEach((i) => {
      if (typeof dataLayer !== 'undefined') {
        dataLayer.push({
          event: `CM_GRANTED_${i.gtm ? i.gtm.grantEvent : i.name}`,
        })
      } else {
        console.log('CANT GRANT, dataLayer not defined:', i.name)
      }
    })
  return {
    scripts,
    showPromp:
      scripts.length !== scripts.filter((i) => i.consent_answered).length,
  }
}
