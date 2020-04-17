const translation = {
  NO_THANKS: {
    en: 'No thanks',
    de: 'Nein danke',
  },
  I_WANT_TO_CHOOSE: {
    en: 'I want to choose',
    de: 'Ich möchte wählen',
  },
  ACCEPT_ALL: {
    en: 'Accept All',
    de: 'Alle akzeptieren',
  },
  CHECK_ALL: {
    en: 'Check All',
    de: 'Alle wählen',
  },
  BACK: {
    en: 'Back',
    de: 'Zurück',
  },
  DONE: {
    en: 'Done',
    de: 'Fertig',
  },
  IMPRINT: {
    en: 'Imprint',
    de: 'Impressum',
  },
  PRIVACY_POLICY: {
    en: 'Privacy Policy',
    de: 'Datenschutzerklärung',
  },
}

export default (key) => {
  const lang = window.navigator.userLanguage || window.navigator.language
  if (!translation[key]) return ''
  return translation[key][lang] || translation[key]['en']
}
