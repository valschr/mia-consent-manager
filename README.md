# Moodley Interactive Consent Manager

This consent manager is meant to easy up compliance with the GDPR cookie regulations. Its an easy to install, lightweight NPM package that adds the consent decision to the GTM data layer. Therefore the scripts for which consent was given can be activated via GTM triggers.
The decision will be stored as a cookie and saved for 12 months before consent has to given again. If new scripts are added only consent for these is asked from the user.


## Installation

``` npm install --save mia-consent-manager ```

## Usage 

```javascript
import MiaConsentManager from "mia-consent-manager"

MiaConsentManager({
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
  highlightColor: '#fc6e20',
  sliderColor: '#fe886c',
  scripts: [
    {
      name: "Google Analytics",
      description: "Allows us to analyze the statistics of visits to our site",
      domain: "google.com",
      gtm: {
        grantEvent: "GOOGLE_ANALYTICS"
      }
    },
    {
      name: "Linked-In",
      description: "Allows us to analyze the statistics of visits to our site",
      domain: "linkedin.com",
      gtm: {
        grantEvent: "LINKED_IN"
      }
    }
  ]
})

```

The "grantEvent" will be prefixed by "CM_GRANTED_" resulting in events like "CM_GRANTED_GOOGLE_ANALYTICS", "CM_GRANTED_LINKED_IN". 
These are then meant to be used within the GTM to trigger the scripts. 
