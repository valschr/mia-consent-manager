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
      if (!!previouslyGranted.granted) {
        if (typeof dataLayer !== 'undefined') {
          if (!i.gtm) {
            throw new Error('GRANT EVENT NOT DEFINED')
          }
        } else {
          console.log('CANT GRANT, dataLayer not defined:', i.gtm.grantEvent)
        }
      }
    }
  })

  return {
    scripts,
    showPromp:
      scripts.length !== scripts.filter((i) => i.consent_answered).length,
  }
}
