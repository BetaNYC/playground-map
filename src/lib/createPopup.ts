import { Popup } from "mapbox-gl";
import { filters } from "../stores";

function isJson(str) {
  try {
    JSON.parse(str);
  } catch (e) {
    return false;
  }
  return true;
}

export default function (map, props, convert = false, flyTo = true) {
  let p = props;
  //work around mapbox stringify
  Object.keys(p).forEach((key) => {
    const value = p[key];
    if (typeof value === "string" && isJson(value))
      p[key] = JSON.parse(value);
  });

  const icons = filters
    .filter(({ fieldName }) => {
      return p[fieldName];
    })
    .map(({ name, icon }) => {
      return `<div class="flex flex-row items-center mt-2 text-sm w-full">
        <img class="h-10 mr-1" src="${icon}"/>
        <span class="mr-2">${name}</span>
      </div>`;
    })
    .join("");

  let distance = "";
  if (p.distance) {
    distance += "<p class='text-lg'>" + p.distance.toFixed(2) + " miles the address</p>";
  }

  if (flyTo) {
    map.flyTo({ center: p.coordinates, zoom: 15 });
  }

  return new Popup()
    .setLngLat(p.coordinates)
    .setHTML(
      `
      <a href="${p.url}" target="_blank"><h3 class="text-xl font-bold leading-5 my-2">${p.name}</h3></a>
      <h4 class="text-lg mb-4 leading-4 text-gray-500">${p.Location}</h4>
      ${distance}
    ` + icons
    )
    .addTo(map);
}
