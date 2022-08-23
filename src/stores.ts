import type mapboxgl from "mapbox-gl";
import { writable, readable } from "svelte/store";

type Address = {
  name: string;
  center: number[];
};

export const filters = [
  {
    name: "Accessible ramps/transfer stations, or play elements",
    color: "#88c659",
    checked: false,
    icon: "https://www.nycgovparks.org/common_files/uploaded_content/park_rules_images/image-16931.gif",
    fieldName: "accessible",
  },
  {
    name: "Comfort stations",
    color: "#5394ac",
    checked: false,
    icon: "https://www.nycgovparks.org/common_images/img/restroom.gif",
    fieldName: "comfort_station",
  },
  {
    name: "ADA accessible comfort stations",
    color: "#00729d",
    checked: false,
    icon: "https://www.nycgovparks.org/common_images/img/restroom_accessible.gif",
    fieldName: "ada_comfort_station",
  },
  {
    name: "Inclusive play elements",
    color: "#c30771",
    checked: false,
    icon: "https://www.nycgovparks.org/common_images/img/fa-eye-regular.gif",
    fieldName: "sensor_friendly",
  },
];

async function fetchPlaygrounds(set) {
  //todo - add sanitization function
  const playgrounds = (
    await (
      await fetch(
        "https://corsproxy.io/?http://www.nycgovparks.org/bigapps/DPR_Playgrounds_001.json"
      )
    ).json()
  ).map((playground, i) => {
    //rename columns
    playground = {
      ...playground,
      coordinates: [+playground.lat, +playground.lon],
      id: i + 1,
      url: "https://www.nycgovparks.org/parks/" + playground.Prop_ID + "/facilities/playgrounds",
      propId: playground.Prop_ID,
      name: playground.Name,
      accessible: playground.Accessible === "Yes",
      comfort_station: playground.ADA_Accessible_Comfort_Station !== "No",
      ada_comfort_station:
        playground.ADA_Accessible_Comfort_Station === "Accessible",
      sensor_friendly: playground["Sensory-Friendly"] === "Y",
    };

    playground.labels = filters.filter(
      ({ fieldName }) => playground[fieldName]
    );

    return playground;
  });

  set(playgrounds);
}

export const mapStore = writable<mapboxgl.Map>();
export const playgrounds = readable([], (set) => {
  fetchPlaygrounds(set);
});
export const queryAddress = writable<Address>();
export const selectedFilters = writable<any>(filters);

export const popup = writable<mapboxgl.Popup>(null);
