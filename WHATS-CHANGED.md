# What's changed

This page lists the changes to the NYC Parks Playgrounds map that a reader would notice: new features, fixes, and corrections when we published something wrong. Newest first. The map shows NYC Parks' own playground list and street map; it does not keep a copy of its own.

- **History begins:** 2022-07-26, the day the map first went live. Dates are the day each change was published to the site, in New York time.
- **Data refresh:** live, from NYC Parks' playground list, each time the page opens

To report a bug in the map, or to ask for a new feature, [open an issue on GitHub](https://github.com/BetaNYC/playground-map/issues).

## 2026-07-13: The NYC Parks street map loads through the site's relay

- **Tags:** Site
- **What changed:** The map's background is NYC Parks' own street map. Its pieces now load through the same relay the site already used for the playground list.
- **More detail:** [The commit](https://github.com/BetaNYC/playground-map/commit/c3cb761)

## 2023-08-24: Some playgrounds were placed in the wrong spot

- **Tags:** Data, Correction
- **What changed:** NYC Parks' playground list sometimes gives a playground's two map coordinates the other way round. Until this fix, the map read every row the same way, so it put those playgrounds far from New York City, and left them out of the nearest playgrounds and the count within one mile of an address. The map now reads each row the right way. The record does not show which playgrounds were affected, or since when.
- **If you used the old numbers:** If you noted the nearest playgrounds to an address, or how many are within one mile, before August 24, 2023, look again: the old list may have left some out. Nothing to re-check after that date.
- **More detail:** [The fix](https://github.com/BetaNYC/playground-map/commit/e83f795)

## 2023-03-29: Comfort stations are now called public restrooms

- **Tags:** Site
- **What changed:** The filters and the key now say "public restroom" and "ADA accessible public restroom" instead of "comfort station", after NYC Parks said it would stop using that term.
- **More detail:** [The pull request](https://github.com/BetaNYC/playground-map/pull/1)

## 2023-03-01: A new look, logos, and playgrounds.beta.nyc

- **Tags:** Site
- **What changed:** The map got new styles, larger playground dots when zoomed in, and the logos of BetaNYC and the Office of Council Member Eric Dinowitz, with a line saying the map was made in partnership between the two. It moved to its own address, playgrounds.beta.nyc.
- **More detail:** [Styles and logos](https://github.com/BetaNYC/playground-map/commit/2dc0d7f) · [Larger dots](https://github.com/BetaNYC/playground-map/commit/1282e51)

## 2023-01-03: Address search moves to the new GeoSearch

- **Tags:** Site
- **What changed:** The address search moved to version 2 of NYC Planning Labs' GeoSearch, the service that turns an address into a point on the map.
- **More detail:** [The commit](https://github.com/BetaNYC/playground-map/commit/7d93f53)

## 2022-08-24: A new search box and a bigger map

- **Tags:** Site
- **What changed:** The search box and filters were restyled, and the list and the map were made taller, with more room for the map on a phone.
- **More detail:** [Commits from August 23 and 24, 2022](https://github.com/BetaNYC/playground-map/commits/main/?since=2022-08-23&until=2022-08-25)

## 2022-07-30: Links to a playground's NYC Parks page could open the wrong page

- **Tags:** Site, Correction
- **What changed:** For the map's first four days, the link to each playground's NYC Parks page was built from the playground's place in our own list, not from its NYC Parks property number, so it could open the wrong page. Each link now uses the property number.
- **If you used the old numbers:** A link to a NYC Parks page that you copied from the map between July 26 and July 30, 2022 may not open the right playground. Use the link on the map now. Nothing else changed.
- **More detail:** [The fix](https://github.com/BetaNYC/playground-map/commit/c7784b0)

## 2022-07-26: The playground map goes live

- **Tags:** Site, Data
- **What changed:** Enter an address to list NYC Parks playgrounds from nearest to farthest, and filter for accessible play elements, comfort stations, ADA accessible comfort stations and inclusive play elements. Each playground is shown on a list and on NYC Parks' own street map.
- **More detail:** [The first commit](https://github.com/BetaNYC/playground-map/commit/ab8f30f)
