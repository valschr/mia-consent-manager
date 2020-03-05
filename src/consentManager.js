import App from './App.svelte'

export default props => {
  return new App({
    target: document.body,
    props,
  })
}
