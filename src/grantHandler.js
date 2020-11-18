import {
  getConsentCookie,
  setConsentCookie,
  setBinaryConsentCookie,
} from './localStateHandler'

const enableScriptTag = (key) => {
  const scriptNode = document.getElementById(key)
  if (!scriptNode) {
    return console.error(`script with the ID: ${key} not found`)
  }
  // scriptNode.setAttribute('type', 'text/javascript')
  const newScript = document.createElement('script')
  newScript.type = 'text/javascript'
  newScript.innerHTML = scriptNode.innerHTML
  scriptNode.parentNode.replaceChild(newScript, scriptNode);
}

const handleGrantedScript = (script) => {
  if (typeof dataLayer !== 'undefined') {
    dataLayer.push({
      event: `CM_GRANTED_${script.gtm ? script.gtm.grantEvent : script.name}`,
    })
  } else {
    console.log('CANT GRANT, dataLayer not defined:', script.gtm.grantEvent)
  }
  if (script.scriptId) {
    // this script is directly on the page via a script tag
    // this script needs to be enabled
    enableScriptTag(script.scriptId)
  }
}

export const handleGrantDone = (event) => {
  const scripts = event.detail
  setConsentCookie(scripts)

  scripts.forEach((s) => {
    setBinaryConsentCookie(s.gtm.grantEvent, !!s.granted)
    if (s.granted) {
      handleGrantedScript(s)
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
        handleGrantedScript(i)
      }
    }
  })

  return {
    scripts,
    showPromp:
      scripts.length !== scripts.filter((i) => i.consent_answered).length,
  }
}
