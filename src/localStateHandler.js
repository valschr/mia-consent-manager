// save the response of the user as a cookie
export const setConsentCookie = scripts => {
  const expires = new Date()
  expires.setTime(expires.getTime() + 365 * 24 * 60 * 60 * 1000)
  console.log('setConsentCookie')
  document.cookie =
    'mia_consent_manager=' +
    JSON.stringify(scripts) +
    ';' +
    expires.toUTCString() +
    ';path=/'
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
      return JSON.parse(c.substring(name.length, c.length))
    }
  }
  return []
}
