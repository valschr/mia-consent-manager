<script>
  import Home from './Home.svelte'
  import Choose from './Choose.svelte'

  let viewState = 'CHOOSE'

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
      <Home on:changeView={changeView} />
    {:else if viewState === 'CHOOSE'}
      <Choose on:changeView={changeView} />
    {/if}
  </div>

</main>
