// import 'core-js'
import MiaConsentManager from './MiaConsentManager.svelte'

function init(props = { scripts: [] }) {
  return new MiaConsentManager({
    target: document.body,
    props: {
      blocking: true,
      homeText: {
        title: 'Lorem ipsum!',
        description:
          'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua.',
        subtitle: 'dolor sit amet',
      },
      chooseText: {
        title: 'Lorem ipsum!',
        description:
          'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua.',
      },
      privacyLink: '/privacy',
      imprintLink: '/imprint',
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
