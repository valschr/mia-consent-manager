const translation = {
  NO_THANKS: {
    en: 'Decline All',
    de: 'Alle ablehnen',
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
  SAVE: {
    en: 'Save',
    de: 'Speichern',
  },
  IMPRINT: {
    en: 'Legal Notice',
    de: 'Impressum',
  },
  PRIVACY_POLICY: {
    en: 'Privacy Policy',
    de: 'Datenschutzerklärung',
  },
  MORE_INFO: {
    en: 'show more',
    de: 'mehr Informationen',
  },
  LESS_INFO: {
    en: 'show less',
    de: 'weniger Informationen',
  },
}

export default (key, language) => {
  const lang = language || window.navigator.userLanguage || window.navigator.language
  if (!translation[key]) return ''
  return translation[key][lang] || translation[key]['en']
}
