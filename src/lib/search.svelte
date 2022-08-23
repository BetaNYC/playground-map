<script lang="ts">
  import { mapStore, queryAddress } from "../stores";
  import { Marker } from "mapbox-gl";
  let name = "";
  let searchAddrs = [];
  let marker;
  let zoom = 14;

  function _set() {
    //clear searchAddrs
    searchAddrs = [];

    fetch(`https://geosearch.planninglabs.nyc/v1/search?text=${name}`)
      .then((response) => response.json())
      .then((response) => {
        //use the first address
        if (response.features.length) {
          const center = response.features[0].geometry.coordinates;
          $mapStore.flyTo({ center, zoom });

          if (marker) marker.remove();
          marker = new Marker({ color: "#FF0000" })
            .setLngLat(center)
            .addTo($mapStore);
        } else {
          //throw error
        }
      });
  }

  function _setLocation(addr) {
    const { name, center } = addr;
    queryAddress.set(addr);
    //clear searchAddrs
    searchAddrs = [];

    $mapStore.flyTo({ center, zoom });

    if (marker) marker.remove();
    marker = new Marker({ color: "#FF0000" })
      .setLngLat(center)
      .addTo($mapStore);
  }

  function _search() {
    if (name.length > 1) {
      fetch(`https://geosearch.planninglabs.nyc/v1/search?text=${name}`)
        .then((response) => response.json())
        .then(
          (response) =>
            (searchAddrs = response.features
              .map((feature) => ({
                name: feature.properties.label.replace(
                  ", New York, NY, USA",
                  ""
                ),
                center: feature.geometry.coordinates,
              }))
              .slice(0, 5))
        );
    } else {
      searchAddrs = [];
    }
  }
</script>

<form on:submit|preventDefault={_set} class="text-base flex justify-center align-top relative">
  <div class="flex-1 mr-2">
    <input
      class="outline outline-offset-2 outline-1 w-full p-1 mt-1"
      placeholder="Enter a NYC Address"
      type="text"
      name="address"
      bind:value={name}
      autocomplete="off"
      on:keyup={_search}
    />
    <ul class="m-0 pl-2" role="combobox" aria-label="address list">
      {#each searchAddrs as addr}
        <li
          role="option"
          tabindex="0"
          class=""
          on:click={() => _setLocation(addr)}
          on:keydown={(e) => e.key === "Enter" && _setLocation(addr)}
        >
          {addr.name}
        </li>
      {/each}
    </ul>
  </div>
  <button
    type="submit"
    class="bg-green-800 broder-none text-white px-5 py-2 mb-2 pointer-events-auto h-10"
  >Submit</button>
</form>