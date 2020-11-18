# Moodley Interactive Consent Manager

This consent manager is meant to ease up compliance with the GDPR cookie regulations. Its an easy to install, lightweight NPM package that adds the consent decision to the GTM data layer. Therefore the scripts for which consent was given can be activated via GTM triggers.
The decision will be stored as a cookie and saved for 12 months before consent has to be given again. If new scripts are added only consent for these is asked from the user.

![alt packagesize](https://badgen.net/bundlephobia/min/mia-consent-manager 'package size')
![alt packagesize zip](https://badgen.net/bundlephobia/minzip/mia-consent-manager 'package size zip')

![alt showcase](https://valschr.github.io/mia-consent-manager/mia_consent_manager_showcase.gif 'showcase')

## Installation

`npm install --save mia-consent-manager`

## Usage

```javascript
import MiaConsentManager from 'mia-consent-manager'
import 'mia-consent-manager/bundle.css'

MiaConsentManager({
  blocking: true, // if true the consent modal will cover the entire screen, if false it will be in the left bottom corner
  homeText: {
    title: 'Lorem ipsum!',
    description:
      'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua.',
    subtitle: 'dolor sit amet', // this is optional
  },
  chooseText: {
    title: 'Lorem ipsum!',
    description:
      'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua.',
  },
  highlightColor: '#fc6e20',
  sliderColor: '#fe886c',
  privacyLink: '/privacy',
  imprintLink: '/imprint',
  language: 'en', // de, en are available
  scriptId: 'gascript', // if set the script tag with this ID gets enabled. This can be used if GTM is not used to toggle scripts
  scripts: [
    {
      name: 'Google Analytics',
      description: 'Allows us to analyze the statistics of visits to our site',
      domain: 'google.com',
      gtm: {
        grantEvent: 'GOOGLE_ANALYTICS',
      },
      info: [{
        label: 'Name',
        description: 'Google Analytics'
      }, {
        label: 'Provider',
        description: 'Google LLC'
      },{
        label: 'Domain',
        description: '<a href="https://google.at">google.at</a>'
      }]
    },
    {
      name: 'Linked-In',
      description: 'Allows us to analyze the statistics of visits to our site',
      domain: 'linkedin.com',
      gtm: {
        grantEvent: 'LINKED_IN',
      },
    },
  ],
})
```

The "grantEvent" will be prefixed by "CM_GRANTED\*" resulting in events like "CM_GRANTED_GOOGLE_ANALYTICS", "CM_GRANTED_LINKED_IN".
These are then meant to be used within the GTM to trigger the scripts.

### Browser Support 

According to this specification:  
http://browsersupport.moodley-interactive.com/

### Usage with GTM

This consent manager sets a cookie for every single script that was granted. Within GTM these cookies can be used to add scripts to the dom.

### Usage without gtm

If no GTM is used this consent manager can be used to enable tools that were added via a script tag directly.  
But you have to modify the script tag beforehand  

This is how an example GA tag would look like 
```html
<!-- Google Analytics -->
<script>
(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
})(window,document,'script','https://www.google-analytics.com/analytics.js','ga');

ga('create', 'UA-XXXXX-Y', 'auto');
ga('send', 'pageview');
</script>
<!-- End Google Analytics -->

```

But it has to be modified like so:
```html
<!-- Google Analytics -->
<script type="application/json" id="mygatag" >
(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
})(window,document,'script','https://www.google-analytics.com/analytics.js','ga');

ga('create', 'UA-XXXXX-Y', 'auto');
ga('send', 'pageview');
</script>
<!-- End Google Analytics -->
```
note: The type application/json was set, this "disables" the script tag initially.   
We also added an ID to the tag, this ID must be set in the config (scriptId). 

After the user granted the script the type will be changed to text/javascript and therefore enable the script.

### CSS Styling

Styling follows the BEM syntax; every class is prefixed with miconsent and existing styles can easily be overwritten by using:
```css
  .miconsent .miconsent__[element] 
```

### Possible Design Adjustment

Highlight and slider colors can be changed using the JS settings. All other styling can be adjusted using CSS overwrites. 