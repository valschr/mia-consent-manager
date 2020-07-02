<script>
  import { createEventDispatcher } from 'svelte'
  import t from './translation'
  const dispatch = createEventDispatcher()
  export let language
  export let scripts
  export let title
  export let description
  export let highlightColor
  export let sliderColor
  let openIndex = null
  const translate = key => t(key, language)

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

  function showMore(index) {
    if (openIndex === index){
      return openIndex = null
    } 
    openIndex = index
  }
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
      {#each scripts as script, i}
        <div class="miconsent__scriptlist_item">
          <div class="miconsent__scriptlist_general" >
            <img
              alt="script icon"
              class="miconsent__scriptlist_item_icon"
              src={'https://www.google.com/s2/favicons?domain=' + script.domain} />
            <div>
              <span>{script.name}</span>
              <small>{script.description}</small>
              { #if script.info && script.info.length > 0 }
              <small on:click={() => showMore(i)} class="link" >{ openIndex !== i ? translate('MORE_INFO') : translate('LESS_INFO')}</small>
              { /if }
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
          <div class="miconsent__scriptlist_info { openIndex === i ? 'open ' : '' }">
            {#each (script.info || []) as info}
              <div class="miconsent__scriptlist_infoline">
                <span>{ info.label }</span>
                <span>{@html info.description }</span>
              </div>
            {/each}
          </div>
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
      <button on:click={() => dispatch('done', scripts)}>
        {translate('SAVE')}
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
