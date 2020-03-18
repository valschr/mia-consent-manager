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

  const initialState = getInitialState(scripts)
  let viewState = 'HOME'
  let closed = !initialState.showPromp
  function changeView(event) {
    viewState = event.detail
  }
  function handleDone(e) {
    closed = true
    handleGrantDone(e)
  }
  function handleClose() {
    closed = true
  }
</script>

<style type="text/scss" global>
  @import './global.scss';
</style>

<main>
  {#if !closed}
    <div class="miconsent {blocking ? 'blocking' : ''}">
      <div class="miconsent__container">
        {#if viewState === 'HOME'}
          <Home
            {...homeText}
            {highlightColor}
            {sliderColor}
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
