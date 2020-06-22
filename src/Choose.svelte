<script>
  import { createEventDispatcher } from 'svelte'
  import t from './translation'
  const dispatch = createEventDispatcher()
  const translate = (key) => t(key, language)
  export let scripts
  export let title
  export let description
  export let highlightColor
  export let sliderColor

  function onToogle(type, e) {
    if (type === 'ALL') {
      scripts.forEach(i => (i.granted = e.target.checked))
    } else {
      scripts.find(i => i.name === type).granted = e.target.checked
    }

    // trigger svelte update
    scripts = scripts
  }

  function acceptAll() {
    scripts.forEach(i => (i.granted = true))
    dispatch('done', scripts)
  }
  const areAllChecked = s => s.filter(i => !i.granted).length === 0
</script>

<style type="text/scss">

</style>

<main>
  <div class="miconsent__content">
    <span class="miconsent__headline">{title}</span>
    <span class="miconsent__info">{description}</span>
    <div class="miconsent__accept_all">
      {translate('CHECK_ALL')}
      <label on:change={e => onToogle('ALL', e)} class="switch large">
        <input checked={areAllChecked(scripts)} type="checkbox" />
        <span
          style={areAllChecked(scripts) ? `background-color: ${sliderColor}; box-shadow: 0 0 1px ${sliderColor};` : ''}
          class="slider round" />
      </label>
    </div>
    <div class="miconsent__scriptlist">
      {#each scripts as script}
        <div class="miconsent__scriptlist_item">
          <img
            alt="script icon"
            class="miconsent__scriptlist_item_icon"
            src={'https://www.google.com/s2/favicons?domain=' + script.domain} />
          <div>
            <span>{script.name}</span>
            <small>{script.description}</small>
          </div>
          <label class="switch">
            <input
              on:change={e => onToogle(script.name, e)}
              checked={script.granted}
              type="checkbox" />
            <span
              style={script.granted ? `background-color: ${sliderColor}; box-shadow: 0 0 1px ${sliderColor};` : ''}
              class="slider round" />
          </label>
        </div>
      {/each}
    </div>
  </div>
  <div class="miconsent__options">
    <div
      on:click={() => dispatch('changeView', 'HOME')}
      class="miconsent__option decline_all">
      <button>{translate('BACK')}</button>
    </div>
    <div class="miconsent__option">
      <button on:click={() => acceptAll()}>{translate('ACCEPT_ALL')}</button>
    </div>
    <div class="miconsent__option accept_all">
      <button
        style={`background-color: ${highlightColor}`}
        on:click={() => dispatch('done', scripts)}>
        {translate('DONE')}
      </button>
    </div>
  </div>
</main>
