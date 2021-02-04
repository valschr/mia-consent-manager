// save the response of the user as a cookie
export const setConsentCookie = (scripts) => {
  const expires = new Date()
  expires.setTime(expires.getTime() + 365 * 24 * 60 * 60 * 1000)
  const scriptsToStore = scripts.map(s => ({ granted: !!s.granted, name: s.name }))
  const cookieString = 'mia_consent_manager=' + btoa(JSON.stringify(scriptsToStore)) + ';expires=' + expires.toUTCString() + ';path=/'
  document.cookie = cookieString
}

// get the existing settings
export const getConsentCookie = () => {
  var name = 'mia_consent_manager='
  var decodedCookie = decodeURIComponent(document.cookie)
  var ca = decodedCookie.split(';')
  for (var i = 0; i < ca.length; i++) {
    var c = ca[i]
    while (c.charAt(0) == ' ') {
      c = c.substring(1)
    }
    if (c.indexOf(name) == 0) {
      const cookieContent = c.substring(name.length, c.length)
      let jsonValue = undefined
      try {
        jsonValue = JSON.parse(atob(cookieContent))
      } catch (e) {}
      if (jsonValue) return jsonValue
      // fallback for cookies before base64 handler
      return JSON.parse(cookieContent)
    }
  }
  return []
}

export const setBinaryConsentCookie = (name, value) => {
  const expires = new Date()
  expires.setTime(expires.getTime() + 365 * 24 * 60 * 60 * 1000)
  document.cookie = `CM_${name}=${!!value};expires=${expires.toUTCString()};path=/`
}
