<script>
  //   let changeView
  import { createEventDispatcher } from 'svelte'
  export let scripts

  const dispatch = createEventDispatcher()

  function acceptAll() {
    scripts.forEach(i => (i.granted = true))
    dispatch('done', scripts)
  }
</script>

<style type="text/scss">

</style>

<main>
  <div class="miconsent__content">
    <span class="miconsent__headline">Hi there!</span>
    <span class="miconsent__subline">We're the cookies</span>
    <p class="miconsent__info">
      We waited to make sure that you were interested in the content of this
      website before bothering you, but we would love to be your companions
      during your visit...
      <br />
      Is that OK with you?
    </p>
  </div>
  <div class="miconsent__options">
    <div class="miconsent__option decline_all">
      <button>No thanks</button>
    </div>
    <div class="miconsent__option">
      <button on:click={() => dispatch('changeView', 'CHOOSE')}>
        I want to choose
      </button>
    </div>
    <div class="miconsent__option accept_all">
      <button on:click={() => acceptAll()}>Accept All</button>
    </div>
  </div>
</main>
