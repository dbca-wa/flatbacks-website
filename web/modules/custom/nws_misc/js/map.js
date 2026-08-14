(function ($, Drupal, drupalSettings, once) {
  'use strict';

  Drupal.behaviors.nwsMiscMap = {
    attach: function (context) {
      const items = drupalSettings.nws_misc && drupalSettings.nws_misc.mapItems ? drupalSettings.nws_misc.mapItems : [];
      const mapElements = once('nws-misc-map', '#map', context);

      if (!mapElements.length || !items.length) {
        return;
      }

      const map = initializeMap();
      const iswagLayer = createISWAGMarker();
      map.addLayer(iswagLayer);

      addTOGroupMarkers(map, items);
      handleZoomEvents(map, iswagLayer, items);
    }
  };

  function initializeMap() {
    const map = L.map('map').setView([-17.947, 122.234], 5);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(map);
    return map;
  }

  function createISWAGMarker() {
    const iswag = {
      lat: -14.562317701914843,
      long: 123.13476562500001,
      image: '/modules/custom/nws_misc/images/ISWAG.png',
      name: 'ISWAG',
    };
    return L.marker([iswag.lat, iswag.long], {
      icon: L.icon({
        iconUrl: iswag.image,
        iconSize: [80, 80],
        name: iswag.name,
      }),
    });
  }

  function addTOGroupMarkers(map, toGroups) {
    toGroups.forEach(function (group) {
      L.marker([group.lat, group.lon], {
        icon: L.icon({
          iconUrl: group.logo,
          iconSize: [32, 32],
          className: 'logo',
        }),
      }).addTo(map);
    });
  }

  function addChildMarkers(map, children, childMarkers) {
    children.forEach(function (child) {
      const marker = L.marker([child.lat, child.lon], {
        icon: L.icon({
          iconUrl: child.logo,
          iconSize: [32, 32],
          className: 'logo',
        }),
      });
      marker.bindPopup('<a class="marker-link" href="' + child.link + '">' + child.name + '</a>');
      map.addLayer(marker);
      childMarkers.push(marker);
    });
  }

  function handleZoomEvents(map, iswagLayer, toGroups) {
    const childMarkers = [];
    map.on('zoomend', function () {
      if (map.getZoom() >= 7) {
        if (map.hasLayer(iswagLayer)) {
          map.removeLayer(iswagLayer);
        }

        toGroups.forEach(function (group) {
          const bounds = map.getBounds();
          if (bounds.contains([group.lat, group.lon])) {
            addChildMarkers(map, group.children_map || [], childMarkers);
          }
        });
      } else {
        if (!map.hasLayer(iswagLayer)) {
          map.addLayer(iswagLayer);
        }
        childMarkers.forEach(function (marker) {
          map.removeLayer(marker);
        });
      }
    });
  }
})(jQuery, Drupal, drupalSettings, once);
