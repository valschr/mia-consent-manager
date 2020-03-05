<script>
  import Home from './Home.svelte'
  import Choose from './Choose.svelte'
  import { handleGrantDone } from './grantHandler'
  export let scripts

  let viewState = 'HOME'
  function changeView(event) {
    viewState = event.detail
  }
</script>

<style type="text/scss" global>
  @import './global.scss';
</style>

<main>
  <div class="miconsent">
    {#if viewState === 'HOME'}
      <Home {scripts} on:done={handleGrantDone} on:changeView={changeView} />
    {:else if viewState === 'CHOOSE'}
      <Choose {scripts} on:done={handleGrantDone} on:changeView={changeView} />
    {/if}
  </div>

</main>
