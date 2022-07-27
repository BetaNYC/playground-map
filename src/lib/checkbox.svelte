<script lang="ts">
  export let name;
  export let color = '#9e9e9e';
  export let checked = false;
</script>

<label class="checkbox"
  ><input type="checkbox" bind:checked={checked}/>
  <span
    style="background-color: {color}"
  />{name}</label
>

<style>
  .checkbox {
    padding-right: 0.6em;
    line-height: 1.6;
    vertical-align: middle;
    cursor: pointer;
    font-weight: 400;
    display: inline-block;
    position: relative;
  }
  .checkbox input {
    cursor: pointer;
  }
  span {
    width: 0.8em;
    height: 0.8em;
    display: inline-block;
    margin-right: 2px;
  }
</style>
