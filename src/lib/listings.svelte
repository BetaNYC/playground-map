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

<div class="listings">
  <h4>
    {#if filters.length}
      There are
    {/if}
    {listings.length} playgrounds
    {#if filters.length}
      with {filters.map((i) => i.name).join("; ")} in the city.
    {/if}
  </h4>
  {#if $queryAddress}
    <h5>
      {listings.filter((i) => i.distance < 1).length} are within 1 mile of the address.
    </h5>
  {/if}
  <ul>
    {#each listings as item (item.id)}
      <li on:click={() => itemClick(item)}>
        {item.name}
        <div class="labels">
          {#each item.labels as label}
            <div
              class="icon"
              style="background-color: {label.color}"
              title={label.name}
            />
          {/each}
        </div>
      </li>
    {/each}
  </ul>
</div>

<style>
  .listings {
    padding: 1rem 2rem;
    background-color: #ddd;
    overflow-y: scroll;
    height: 100%;
  }

  ul {
    list-style: none;
    padding: 0;
  }

  li {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    border-bottom: 1px solid rgba(0, 0, 0, 0.1);
    cursor: pointer;
  }

  .icon {
    width: 0.8em;
    height: 0.8em;
    display: inline-block;
    margin-right: 2px;
  }
</style>
