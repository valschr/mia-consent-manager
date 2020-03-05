<script>
  import { createEventDispatcher } from 'svelte'
  const dispatch = createEventDispatcher()

  export let scripts

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
</script>

<style type="text/scss">
  .switch {
    position: relative;
    display: inline-block;
    width: 52px;
    max-width: 52px;
    min-width: 52px;
    height: 20px;
    margin-right: 8px;
  }

  /* Hide default HTML checkbox */
  .switch input {
    opacity: 0;
    width: 0;
    height: 0;
  }

  /* The slider */
  .slider {
    position: absolute;
    cursor: pointer;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: #eee;
    transition: 0.4s;
  }

  .slider:before {
    position: absolute;
    content: '';
    height: 26px;
    width: 26px;
    left: -3px;
    bottom: -3px;
    background-color: white;
    transition: 0.2s ease-out;
    box-shadow: rgba(0, 0, 0, 0.15) 0px 3px 12px;
  }

  input:checked + .slider {
    background-color: #ffc823;
  }

  input:focus + .slider {
    box-shadow: 0 0 1px #ffc823;
  }

  input:checked + .slider:before {
    transform: translateX(34px);
  }

  /* Rounded sliders */
  .slider.round {
    border-radius: 34px;
  }

  .slider.round:before {
    border-radius: 50%;
  }
</style>

<main>
  <div class="miconsent__content">
    <span class="miconsent__headline">Hi there!</span>
    <span class="miconsent__info">
      Choice is important! You are in control of all tools that we use to
      enhance your user experience and help us to improve our product.
    </span>
    <div class="miconsent__accept_all">
      Check All
      <label on:change={e => onToogle('ALL', e)} class="switch large">
        <input
          checked={scripts.filter(i => !i.granted).length === 0}
          type="checkbox" />
        <span class="slider round" />
      </label>
    </div>
    <div class="miconsent__scriptlist">
      {#each scripts as script}
        <div class="miconsent__scriptlist_item">
          <img
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
            <span class="slider round" />
          </label>
        </div>
      {/each}
    </div>
  </div>
  <div class="miconsent__options">
    <div
      on:click={() => dispatch('changeView', 'HOME')}
      class="miconsent__option decline_all">
      <button>back</button>
    </div>
    <div class="miconsent__option">
      <button on:click={() => acceptAll()}>Accept All</button>
    </div>
    <div class="miconsent__option accept_all">
      <button on:click={() => dispatch('done', scripts)}>Done</button>
    </div>
  </div>
</main>
