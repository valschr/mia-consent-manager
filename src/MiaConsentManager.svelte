<script>
  import Home from './Home.svelte'
  import Choose from './Choose.svelte'
  import { handleGrantDone, getInitialState } from './grantHandler'
  export let scripts

  const initialState = getInitialState(scripts)
  console.log('initialState', initialState)
  let viewState = 'HOME'
  let closed = !initialState.showPromp
  function changeView(event) {
    viewState = event.detail
    closed = tr
  }
  function handleDone(e) {
    handleGrantDone(e)
    closed = true
  }
</script>

<style type="text/scss" global>
  @import './global.scss';
</style>

<main>
  {#if !closed}
    <div class="miconsent">
      {#if viewState === 'HOME'}
        <Home {scripts} on:done={handleGrantDone} on:changeView={changeView} />
      {:else if viewState === 'CHOOSE'}
        <Choose {scripts} on:done={handleDone} on:changeView={changeView} />
      {/if}
    </div>
  {/if}
</main>
