// import 'core-js'
import MiaConsentManager from './MiaConsentManager.svelte'

function init(props = { scripts: [] }) {
  return new MiaConsentManager({
    target: document.body,
    props,
  })
}

export default init
