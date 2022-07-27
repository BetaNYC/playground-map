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
      return `<div class="icon"><img src="${icon}"/>${name}</div>`;
    })
    .join("");

  let distance = "";
  if (p.distance) {
    distance += "<p>" + p.distance.toFixed(2) + " miles</p>";
  }

  if(flyTo){
    map.flyTo({ center: p.coordinates, zoom: 15 });
  }

  return new Popup()
    .setLngLat(p.coordinates)
    .setHTML(
      `
      <a href="${p.url}" target="_blank"><h2>${p.name}</h2></a>
      <h4>${p.Location}</h4>
      ${distance}
    ` + icons
    )
    .addTo(map);
}
