<script>
  //   let changeView
  import { createEventDispatcher } from 'svelte'
  import translate from './translation'
  export let scripts
  export let title
  export let subtitle
  export let description
  export let highlightColor

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
    <span class="miconsent__headline">{title}</span>
    <span class="miconsent__subline">{subtitle}</span>
    <p class="miconsent__info">{description}</p>
    <!-- <div>
      <a href="{{ imprintURL }}">{translate('ACCEPT_ALL')}</a>
    </div> -->
  </div>
  <div class="miconsent__options">
    <div class="miconsent__option decline_all">
      <button on:click={() => dispatch('close')}>
        {translate('NO_THANKS')}
      </button>
    </div>
    <div class="miconsent__option">
      <button on:click={() => dispatch('changeView', 'CHOOSE')}>
        {translate('I_WANT_TO_CHOOSE')}
      </button>
    </div>
    <div class="miconsent__option accept_all">
      <button
        style={`background-color: ${highlightColor}`}
        on:click={() => acceptAll()}>
        {translate('ACCEPT_ALL')}
      </button>
    </div>
  </div>
</main>
