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
          marker = new Marker({color: "#FF0000"}).setLngLat(center).addTo($mapStore);
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
    marker = new Marker({color: "#FF0000"}).setLngLat(center).addTo($mapStore);
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

<form on:submit|preventDefault={_set}>
 <div>
    <input
    id="address"
    placeholder="Enter a NYC Address"
    type="text"
    name="address"
    bind:value={name}
    autocomplete="off"
    on:keyup={_search}
  />
  <ul>
    {#each searchAddrs as addr}
      <li on:click={() => _setLocation(addr)}>{addr.name}</li>
    {/each}
  </ul>
 </div>
  <input type="submit" value="Search" />
</form>

<style>
  form {
    font-family: "Lato", sans-serif;
    font-size: 0.9em;
    display: flex;
    align-items: center;
  }
  form div{
      flex: 1;
      margin-right: 5px;
  }
  #address {
    width: 100%;
    padding: 5px 15px;
    box-sizing: border-box;
    margin-bottom: 5px;
  }

  input[type="submit"] {
    background-color: #6a6a6a;
    border: none;
    color: white;
    padding: 5px 10px;
    text-decoration: none;
    cursor: pointer;
    font-family: "Lato", sans-serif;
    margin-bottom: 5px;
  }

  ul {
    padding-left: 10px;
    color: rgb(61, 61, 61);
    margin: 0px;
  }

  li {
    margin-left: 5px;
  }
</style>
