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
      language: 'en', // de, en are available
      scripts: [
        {
          name: 'Google Analytics',
          description:
            'Allows us to analyze the statistics of visits to our site',
          domain: 'google.com',
          scriptId: 'gascript',
          gtm: {
            grantEvent: 'GOOGLE_ANALYTICS',
          },
          info: [
            {
              label: 'Name',
              description: 'Google Analytics',
            },
            {
              label: 'Provider',
              description: 'Google LLC',
            },
            {
              label: 'Domain',
              description: '<a href="https://google.at">google.at</a>',
            },
          ],
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
