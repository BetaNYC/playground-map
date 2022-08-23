<script lang="ts">
  export let name;
  export let color = "#9e9e9e";
  export let checked = false;
</script>

<label
  class="px-1 py-2 text-xl leading-4 align-middle font-medium inline-block relative 
  hover:bg-gray-100
  hover:outline hover:outline-1 cursor-pointer"
  ><input type="checkbox" bind:checked />
  <span class="w-3 h-3 inline-block mr-1" style="background-color: {color}" />{name}</label
>