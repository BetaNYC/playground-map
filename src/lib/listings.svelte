<script lang="ts">
  import {
    mapStore,
    playgrounds,
    selectedFilters,
    queryAddress,
    popup,
  } from "../stores";

  import createPopup from "./createPopup";
  import distance from "@turf/distance";

  let listings = [];
  let filters = [];

  $: {
    filters = $selectedFilters.filter(({ checked }) => checked);
    let filteredPlaygrounds = $playgrounds;
    if (filters) {
      filteredPlaygrounds = $playgrounds.filter((playground) => {
        return filters.every(({ fieldName, checked }) => {
          return playground[fieldName] === checked;
        });
      });
    }

    //add distance to address if queryAddress is valid, and sort
    if ($queryAddress) {
      filteredPlaygrounds.map((i) => {
        i.distance = distance($queryAddress.center, i.coordinates, {
          units: "miles",
        });
      });
      filteredPlaygrounds = filteredPlaygrounds.sort(
        (a, b) => a.distance - b.distance
      );
    }

    listings = filteredPlaygrounds;
  }

  function itemClick(item) {
    //close previous popup
    if ($popup) $popup.remove();

    //create popup at location
    popup.set(createPopup($mapStore, item));
  }
</script>

<div class="overflow-y-scroll bg-gray-50 px-8 py-4 h-full">
  <h3 class="text-lg font-semibold mb-2">
    {#if filters.length}
      There are
    {/if}
    <strong>{listings.length} playgrounds</strong>
    {#if filters.length}
      with
      {#each filters as filter}
        <br /><span style="color: {filter.color};">{filter.name}</span>
      {/each}
      in the city.
    {/if}
  </h3>
  {#if $queryAddress}
    <h4 class="text-lg mb-4">
      {listings.filter((i) => i.distance < 1).length} are within 1 mile of {$queryAddress.name}
      (<strong>in bold</strong>).
    </h4>
  {/if}
  <ul class="" role="menu" aria-label="Playground List">
    {#each listings as item (item.id)}
      <li
        on:click={() => itemClick(item)}
        on:keydown={(e) => {
          if (e.key === "Enter") {
            e.preventDefault();
            itemClick(item);
          }
        }}
        tabindex="0"
        class="hover:bg-gray-200 focus:bg-gray-200 pl-2 
        flex flex-row place-content-between border-b-2 border-black border-opacity-5 cursor-pointer"
      >
        {#if item?.distance < 1}
          <strong>{item.name}</strong>
        {:else}
          {item.name}
        {/if}
        <div class="labels">
          {#each item.labels as label}
            <div
              class="w-3 h-3 inline-block mr-0.5"
              style="background-color: {label.color}"
              title={label.name}
            />
          {/each}
        </div>
      </li>
    {/each}
  </ul>
</div>