// import 'core-js'
import MiaConsentManager from './MiaConsentManager.svelte'

function init(props = { scripts: [] }) {
  return new MiaConsentManager({
    target: document.body,
    props: {
      title: 'Hi there!',
      description:
        'Choice is important! You are in control of all tools that we use to enhance your user experience and help us to improve our product.',
      subtitle: 'We`re the cookies',
      scripts: [
        {
          name: 'Google Analytics',
          description:
            'Allows us to analyze the statistics of visits to our site',
          domain: 'google.com',
          gtm: {
            grantEvent: 'GOOGLE_ANALYTICS',
          },
        },
        {
          name: 'Linked-In',
          description:
            'Allows us to analyze the statistics of visits to our site',
          domain: 'linkedin.com',
          gtm: {
            grantEvent: 'LINKED_IN',
          },
        },
      ],
    },
  })
}

export default init
