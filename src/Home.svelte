<script>
  //   let changeView
  import { createEventDispatcher } from 'svelte'
  import t from './translation'
  export let language
  export let scripts
  export let title
  export let subtitle
  export let description
  export let infoButtons
  export let highlightColor
  export let imprintLink = ''
  export let privacyLink = ''
  const translate = (key) => t(key, language)
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
    {#if !!subtitle}
      <span class="miconsent__subline">{subtitle}</span>
    {/if}
    <p class="miconsent__info">{@html description}</p>
    <div class="miconsent__moreinfo">
      {#if !!imprintLink}
        <a href={imprintLink}>{translate('IMPRINT')}</a>
      {/if}
      {#if !!privacyLink}
        <a href={privacyLink}>{translate('PRIVACY_POLICY')}</a>
      {/if}
      {#each (typeof infoButtons !== 'undefined' ? infoButtons : []) as button}
        <a target="_blank" href={button.href}>{button.label}</a>
      {/each}
    </div>
  </div>
  <div class="miconsent__options">
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
  <div class="miconsent__decline decline_all">
    <button on:click={() => dispatch('close')}>
      {translate('NO_THANKS')}
    </button>
  </div>
</main>
