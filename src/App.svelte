<script lang="ts">
  import { mapStore, playgrounds, selectedFilters, popup } from "./stores";
  import mapboxgl from "mapbox-gl";
  import "mapbox-gl/dist/mapbox-gl.css";

  import Details from "./lib/details.svelte";
  import Search from "./lib/search.svelte";
  import Filters from "./lib/filters.svelte";
  import Listings from "./lib/listings.svelte";

  import createPopup from "./lib/createPopup";

  let map;
  let styleLoaded = false;
  let mapLoaded = false;
  mapboxgl.accessToken =
    "pk.eyJ1IjoiemhpayIsImEiOiJjaW1pbGFpdHQwMGNidnBrZzU5MjF5MTJiIn0.N-EURex2qvfEiBsm-W9j7w";

  async function initMap(container) {
    const parksStyle = await (
      await fetch(
        "https://4dvj5dcxge.execute-api.us-east-1.amazonaws.com/staging/https://www.nycgovparks.org/web/map/basemap-style.json"
      )
    ).json();

    //prefilter out labels
    const noLabelsStyle = {
      ...parksStyle,
      layers: parksStyle.layers.filter((layer) => {
        const fonts = layer.layout?.["text-font"] ?? [];
        return (
          !fonts.includes("AkkuratRegular") && !fonts.includes("AkkuratBold")
        );
      }),
    };

    map = new mapboxgl.Map({
      container,
      center: [-73.9544677734375, 40.718119379753446],
      zoom: 12,
      style: noLabelsStyle,
      attributionControl: false,
    });

    map.addControl(
      new mapboxgl.AttributionControl({
        customAttribution:
          '© City of New York;© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      })
    );

    map.addControl(
      new mapboxgl.NavigationControl({ showCompass: false }),
      "bottom-right"
    );

    map.on("style.load", () => {
      styleLoaded = true;
    });

    mapStore.set(map);
  }

  $: if (styleLoaded && map && $playgrounds.length && !mapLoaded) {
    const data = {
      type: "FeatureCollection",
      features: $playgrounds.map((row) => ({
        type: "Feature",
        properties: {
          ...row,
        },
        geometry: {
          type: "Point",
          coordinates: row.coordinates,
        },
      })),
    };
    map.addSource("playgrounds", {
      type: "geojson",
      data,
    });
    map.addLayer({
      id: "playgrounds-icon",
      type: "circle",
      source: "playgrounds",
      paint: {
        "circle-color": "rgba(59, 138, 61, 1)",
        "circle-stroke-color": "rgba(255, 255, 255, 1)",
        "circle-opacity": 1,
        "circle-stroke-opacity": 1,
        "circle-radius": {
          stops: [
            [10, 2],
            [14, 5],
          ],
        },
        "circle-stroke-width": {
          stops: [
            [8, 0.5],
            [14, 3],
          ],
        },
        "circle-pitch-scale": "map",
      },
    });

    map.addLayer({
      id: "playgrounds-labels",
      type: "symbol",
      source: "playgrounds",
      layout: {
        "text-field": "{name}",
        "symbol-placement": "point",
        "symbol-spacing": 250,
        "symbol-avoid-edges": false,
        "text-size": {
          stops: [
            [12, 14],
            [14, 17],
          ],
        },
        "text-anchor": "center",
        "text-font": ["AkkuratBold"],
      },
      paint: {
        "text-color": "#7b7b7b",
        "text-halo-color": "#ffffff",
        "text-halo-width": 1,
        "text-translate": [1, 20],
        "text-opacity": {
          stops: [
            [12, 0],
            [13, 0.8],
            [14, 1],
          ],
        },
      },
    });

    ["playgrounds-icon"].forEach((id) => {
      map.on("mouseenter", id, () => {
        map.getCanvas().style.cursor = "pointer";

        map.on("mouseenter", id, () => {
          map.getCanvas().style.cursor = "pointer";
        });

        map.on("click", id, (e) => {
          //close previous popup
          if ($popup) $popup.remove();
          const props = e.features[0].properties;
          popup.set(createPopup(map, props, true, false));
        });
      });
    });

    //run once
    mapLoaded = true;
  }

  $: {
    if (map && map.getLayer("playgrounds-icon")) {
      //filter for layers on change
      const filterArray = $selectedFilters
        .filter(({ checked }) => checked)
        .map(({ fieldName, checked }) => ["==", fieldName, checked]);

      if (filterArray) {
        map.setFilter("playgrounds-icon", ["all", ...filterArray]);
        map.setFilter("playgrounds-labels", ["all", ...filterArray]);
      } else {
        //remove filter
        map.setFilter("playgrounds-icon", []);
        map.setFilter("playgrounds-labels", []);
      }
    }
  }
</script>

<main class="p-0 max-w-screen-xl text-gray-700 px-6 py-0 mx-auto my-8">
  <h1 class="text-5xl font-bold">NYC Parks Playgrounds</h1>
  <p>
    Enter an address to get parks closest to you, then use filters to refine
    your search. Based on NYC Park's
    <a href="https://www.nycgovparks.org/facilities/playgrounds"
      >playgrounds page</a
    >.
  </p>
  <div class="flex-grow my-4 mx-auto w-auto relative">
    <Search />
    <Filters />
  </div>
  <p class="italic">
    Click on the map or select an item on the list for more details.
  </p>
  <div class="flex-grow my-4 mx-auto w-auto relative sm:flex-row">
    <div class="flex relative flex-wrap">
      <div class="is-half relative sm:w-1/2 w-full h-[30vh] sm:h-[70vh]">
        <Listings />
      </div>
      <div class="is-half relative sm:w-1/2 w-full h-[50vh] sm:h-[70vh]">
        <div id="map" use:initMap class="inset-0 absolute w-full h-full" />
      </div>
    </div>
  </div>

  <h2 class="text-3xl my-2">What do the accessible and inclusive icons mean?</h2>
  <div class="mx-auto w-11/12">
    <Details />
  </div>
</main>
