<script>
  import Home from './Home.svelte'
  import Choose from './Choose.svelte'
  import { handleGrantDone, getInitialState } from './grantHandler'
  export let scripts
  export let homeText
  export let chooseText
  export let blocking
  export let highlightColor = '#fc6e20'
  export let sliderColor = '#fe886c'
  export let imprintLink
  export let privacyLink

  const initialState = getInitialState(scripts)
  let viewState = 'HOME'
  let closed = !initialState.showPromp

  function showBlocking(blockingSetting) {
    const href = window.location.pathname
    if (!blockingSetting) return false
    if (imprintLink && imprintLink.length > 1 && href.indexOf(imprintLink) > -1)
      return false
    if (privacyLink && privacyLink.length > 1 && href.indexOf(privacyLink) > -1)
      return false
    return true
  }

  let showBlockingFlag = showBlocking(blocking)

  function changeView(event) {
    viewState = event.detail
  }
  function handleDone(e) {
    handleGrantDone(e)
    closed = true
  }
  function handleClose() {
    const declined = scripts.map(i => ({
      ...i,
      granted: false,
    }))
    console.log('declined', declined)
    handleGrantDone({
      detail: declined,
    })
    closed = true
  }
</script>

<style type="text/scss" global>
  @import './global.scss';
</style>

<main>
  {#if !closed}
    <div class="miconsent {showBlockingFlag ? 'blocking' : ''}">
      <div class="miconsent__container">
        {#if viewState === 'HOME'}
          <Home
            {...homeText}
            {highlightColor}
            {sliderColor}
            {imprintLink}
            {privacyLink}
            {scripts}
            on:done={handleDone}
            on:close={handleClose}
            on:changeView={changeView} />
        {:else if viewState === 'CHOOSE'}
          <Choose
            {...chooseText}
            {highlightColor}
            {sliderColor}
            {scripts}
            on:done={handleDone}
            on:changeView={changeView} />
        {/if}
      </div>
    </div>
  {/if}
</main>
