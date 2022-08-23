<script lang="ts">
  import { selectedFilters } from "../stores";
  import Checkbox from "./checkbox.svelte";

  $selectedFilters = [...$selectedFilters]
</script>

<div class="flex flex-col">
  {#each $selectedFilters as filter (filter.name)}
    <Checkbox
      name={filter.name}
      bind:checked={filter.checked}
      color={filter.color}
    />
  {/each}
</div>