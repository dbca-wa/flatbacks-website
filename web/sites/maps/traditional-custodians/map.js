let map;
let ISWAG_LAYER;

const toGroups = [
  {
    name: 'Kimberley',
    lat: -16.284106,
    lon: 126.07867,
    logo: 'icons/trans.png',
    page: 'kariyara.html',
    isVisible: true,
    children: [
      {
        name: 'Mayala',
        lat: -16.3357,
        lon: 123.5887,
        logo: 'icons/badge_mayala.png',
        marker: null,
      },
      {
        name: 'Nyul Nyul',
        lat: -17.174573,
        lon: 121.605688,
        logo: 'icons/badge_nyulnyul-rangers.png',
        marker: null,
      },
      {
        name: 'Bardi Jawi',
        lat: -15.964416,
        lon: 122.907453,
        logo: 'icons/badge_bardijawi-rangers.png',
        page: 'kariyara-child1.html',
        marker: null,
      },
      {
        name: 'Dambimangari',
        lat: -15.237858,
        lon: 123.717576,
        logo: 'icons/badge-dambimangari-rangers.png',
        page: 'kariyara-child2.html',
        marker: null,
      },
      {
        name: 'Wunambal Gaambera',
        lat: -14.180201,
        lon: 125.641601,
        logo: 'icons/badge_uunguu-rangers.png',
        page: '#',
        marker: null,
      },
      {
        name: 'Balanggarra',
        lat: -14.086241,
        lon: 127.544863,
        logo: 'icons/badge_balanggarra-rangers.png',
        page: '#',
        marker: null,
      },
      {
        name: 'Miriuwung-Gajerrong',
        lat: -14.575747,
        lon: 128.624532,
        logo: 'icons/badge_mg-rangers.png',
        page: '/who-we-are/traditional-custodians/miriuwung-gajerrong-country',
        marker: null,
        addLink: true,
      },
    ],
    marker: null,
    popup: null,
  },
];

const towns = [
  // { name: 'Karratha', lat: -20.736, lon: 115.846001, isVisible: true, marker: null },
  // { name: 'Port Hedland', lat: -20.3111, lon: 118.6094, isVisible: true, marker: null },
  // { name: 'Broome', lat: -17.9618, lon: 122.2370, isVisible: true, marker: null },
];

// Initialize the map
const initializeMap = () => {
  map = L.map('map').setView([-16.947, 122.234], 6);

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  }).addTo(map);
};

// Create the ISWAG marker
const createISWAGMarker = () => {
  const ISWAG = {
    lat: -14.562317701914843,
    long: 123.13476562500001,
    image: 'icons/iswag.png',
    name: 'ISWAG',
  };
  const marker = L.marker([ISWAG.lat, ISWAG.long], {
    icon: L.icon({
      iconUrl: ISWAG.image,
      iconSize: [80, 80],
      name: ISWAG.name,
    }),
  });

  // Add tooltip for ISWAG
  marker.bindTooltip(ISWAG.name, { permanent: false, direction: 'top' });
  return marker;
};
const createNyangumartaMarker = () => {
  const Nyangumarta = {
    lat: -20.062317701914843,
    long: 121.33476562500001,
    image: 'icons/logo_nyangumarta.png',
    name: 'Nyangumarta',
  };
  const marker = L.marker([Nyangumarta.lat, Nyangumarta.long], {
    icon: L.icon({
      iconUrl: Nyangumarta.image,
      iconSize: [60, 60],
      name: Nyangumarta.name,
    }),
  });

  marker.bindTooltip(Nyangumarta.name, { permanent: false, direction: 'top' });
  return marker;
};
const createYawuruMarker = () => {
  const Yawuru = {
    lat: -18.762317701914843,
    long: 122.33476562500001,
    image: 'icons/logo_yawuru.png',
    name: 'Yawuru',
  };
  const marker = L.marker([Yawuru.lat, Yawuru.long], {
    icon: L.icon({
      iconUrl: Yawuru.image,
      iconSize: [60, 60],
      name: Yawuru.name,
    }),
  });

  marker.bindTooltip(Yawuru.name, { permanent: false, direction: 'top' });
  return marker;
};
const createKaraMarker = () => {
  const Kara = {
    lat: -18.762317701914843,
    long: 121.33476562500001,
    image: 'icons/badge_karajarri-rangers.png',
    name: 'Karajarri',
  };
  const marker = L.marker([Kara.lat, Kara.long], {
    icon: L.icon({
      iconUrl: Kara.image,
      iconSize: [60, 60],
      name: Kara.name,
    }),
  });

  marker.bindTooltip(Kara.name, { permanent: false, direction: 'top' });
  return marker;
};
const createNgarlaMarker = () => {
  const Ngarla = {
    lat: -18.762317701914843,
    long: 120.83476562500001,
    image: 'icons/logo_Wanparta_AC.png',
    name: 'Ngarla',
  };
  const marker = L.marker([Ngarla.lat, Ngarla.long], {
    icon: L.icon({
      iconUrl: Ngarla.image,
      iconSize: [60, 60],
      name: Ngarla.name,
    }),
  });

  marker.bindTooltip(Ngarla.name, { permanent: false, direction: 'top' });
  return marker;
};
const createNgarlumaMarker = () => {
  const Ngarluma = {
    lat: -20.262317701914843,
    long: 116.53476562500001,
    image: 'icons/Ngarluma.png',
    name: 'Ngarluma',
  };
  const marker = L.marker([Ngarluma.lat, Ngarluma.long], {
    icon: L.icon({
      iconUrl: Ngarluma.image,
      iconSize: [60, 60],
      name: Ngarluma.name,
    }),
  });

  marker.bindTooltip(Ngarluma.name, { permanent: false, direction: 'top' });
  return marker;
};

const createThalanyjiMarker = () => {
  const Thalanyji = {
    lat: -21.662317701914843,
    long: 115.33476562500001,
    image: 'icons/logo_thalanyjiAC-2024.png',
    name: 'Thalanyji',
  };
  const marker = L.marker([Thalanyji.lat, Thalanyji.long], {
    icon: L.icon({
      iconUrl: Thalanyji.image,
      iconSize: [60, 60],
      name: Thalanyji.name,
    }),
  });

  marker.bindTooltip(Thalanyji.name, { permanent: false, direction: 'top' });
  return marker;
};

const createKariyarraMarker = () => {
  const Kariyarra = {
    lat: -19.562317701914843,
    long: 118.93476562500001,
    image: 'icons/logo_KariyarraAboriginalCorporation.png',
    name: 'Kariyarra',
  };
  const marker = L.marker([Kariyarra.lat, Kariyarra.long], {
    icon: L.icon({
      iconUrl: Kariyarra.image,
      iconSize: [60, 60],
      name: Kariyarra.name,
    }),
  });

  marker.bindTooltip(Kariyarra.name, { permanent: false, direction: 'top' });
  return marker;
};

// Add TO group markers to the map and create persistent popups
const addTOGroupMarkers = () => {
  toGroups.forEach((group) => {
    if (group.isVisible) {
      const marker = L.marker([group.lat, group.lon], {
        icon: L.icon({
          iconUrl: group.logo,
          iconSize: [32, 32],
          className: 'logo-with-link',
        }),
      }).addTo(map);

      // Add tooltip instead of popup
      marker.bindTooltip(group.name, { permanent: false, direction: 'top' });

      group.marker = marker; // Store marker reference
    }
  });
};

// Toggle visibility of TO group markers
const toggleTOGroupMarkers = () => {
  toGroups.forEach((group) => {
    if (group.marker) {
      if (group.isVisible) {
        map.addLayer(group.marker);
        toggleChildMarkers(group); // Update child markers based on visibility
      } else {
        map.removeLayer(group.marker);
        toggleChildMarkers(group, false); // Ensure child markers are hidden
      }
    }
  });
};

// Toggle visibility of child markers of a TO group
const toggleChildMarkers = (group, visible = true) => {
  group.children.forEach((child) => {
    if (visible && map.getZoom() >= 7) {
      if (!child.marker) {
        // Create marker if it doesn't exist
        child.marker = L.marker([child.lat, child.lon], {
          icon: L.icon({
            iconUrl: child.logo,
            iconSize: [32, 32],
            className: 'logo-with-link',
          }),
        }).bindPopup(`<a class="marker-link" href="${child.page}">${child.name}</a>`);
      }
      map.addLayer(child.marker);
    } else {
      if (child.marker) {
        map.removeLayer(child.marker);
      }
    }
  });
};

// Create a popup
const createPopup = (group, keepOpen = false) => {
  return L.popup({
    closeOnClick: !keepOpen,
    closeButton: !keepOpen,
  })
    .setLatLng([group.lat, group.lon])
    .setContent(`<a class="marker-link" href="${group.page}">${group.name}</a>`);
};

// Add town markers to the map
const addTownMarkers = () => {
  towns.forEach((town) => {
    if (town.isVisible) {
      const marker = L.marker([town.lat, town.lon], {
        icon: L.divIcon({
          className: 'red-box',
          html: town.name,
        }),
      }).addTo(map);
      town.marker = marker; // Store marker reference
    }
  });
};

// Toggle visibility of town markers
const toggleTownMarkers = () => {
  towns.forEach((town) => {
    if (town.marker) {
      if (town.isVisible) {
        map.addLayer(town.marker);
      } else {
        map.removeLayer(town.marker);
      }
    }
  });
};

// Handle map zoom events
const handleZoomEvents = () => {
  map.on('zoomend', () => {
    const zoomLevel = map.getZoom();
    if (zoomLevel >= 8) {
      towns.forEach((town) => {
        //map.removeLayer(town);
      });
    }
    if (zoomLevel >= 6) {
      if (map.hasLayer(ISWAG_LAYER)) {
        map.removeLayer(ISWAG_LAYER);
      }
      toGroups.forEach((group) => {
        if (group.isVisible) {
          const bounds = map.getBounds();
          if (bounds.contains([group.lat, group.lon])) {
            addChildMarkers(group);
          }
        }
      });
    } else {
      if (!map.hasLayer(ISWAG_LAYER)) {
        map.addLayer(ISWAG_LAYER);
      }
      // Remove all child markers
      toGroups.forEach((group) => {
        toggleChildMarkers(group, false);
      });
    }
  });
};

// Add child markers to the map and keep track of them
const addChildMarkers = (group) => {
  group.children.forEach((child) => {
    if (!child.marker) {
      const marker = L.marker([child.lat, child.lon], {
        icon: L.icon({
          iconUrl: child.logo,
          iconSize: [32, 32],
          className: child.addLink ? 'logo-with-link' : 'logo-without-link',
        }),
      });

      // Add tooltip instead of popup
      marker.bindTooltip(child.name, { permanent: false, direction: 'top' });
      //marker.on('click', function(e) {     window.open("http://www.google.com", '_blank');   });
      if (child.addLink) {
        marker.on('click', function (e) {
          window.open(child.page, '_parent');
        });
      }
      child.marker = marker; // Store marker reference
    }
    if (group.isVisible && map.getZoom() >= 7) {
      map.addLayer(child.marker);
    }
  });
};

// Create checkbox for towns
const createTownCheckbox = (town, index) => {
  const checkbox = document.createElement('input');
  checkbox.type = 'checkbox';
  checkbox.id = `town-${index}`;
  checkbox.checked = town.isVisible;
  checkbox.onchange = () => {
    town.isVisible = checkbox.checked;
    // toggleTownMarkers();
  };

  const label = document.createElement('label');
  label.htmlFor = `town-${index}`;
  label.appendChild(document.createTextNode(town.name));

  const br = document.createElement('br');

  const townsFilters = document.getElementById('towns-filters');
  townsFilters.appendChild(checkbox);
  townsFilters.appendChild(label);
  townsFilters.appendChild(br);
};

// Create checkbox for TO Groups
const createTOGroupCheckbox = (group, index) => {
  const checkbox = document.createElement('input');
  checkbox.type = 'checkbox';
  checkbox.id = `group-${index}`;
  checkbox.checked = group.isVisible;
  checkbox.onchange = () => {
    group.isVisible = checkbox.checked;
    toggleTOGroupMarkers();
    handleZoomEvents(); // Reapply zoom events to update child visibility
  };

  const label = document.createElement('label');
  label.htmlFor = `group-${index}`;
  label.appendChild(document.createTextNode(group.name));

  const br = document.createElement('br');

  const toGroupsFilters = document.getElementById('togroups-filters');
  toGroupsFilters.appendChild(checkbox);
  toGroupsFilters.appendChild(label);
  toGroupsFilters.appendChild(br);
};

// Create filter controls for toggling visibility
const createFilterControls = () => {
  towns.forEach((town, index) => {
    createTownCheckbox(town, index);
  });

  toGroups.forEach((group, index) => {
    createTOGroupCheckbox(group, index);
  });
};

// Initialize the map and add all elements
const main = () => {
  initializeMap();
  ISWAG_LAYER = createISWAGMarker();
  map.addLayer(ISWAG_LAYER);
  Yawuru_LAYER = createYawuruMarker();
  map.addLayer(Yawuru_LAYER);
  Kara_LAYER = createKaraMarker();
  map.addLayer(Kara_LAYER);
  Ngarla_LAYER = createNgarlaMarker();
  map.addLayer(Ngarla_LAYER);
  Ngarluma_LAYER = createNgarlumaMarker();
  map.addLayer(Ngarluma_LAYER);
  Thalanyji_LAYER = createThalanyjiMarker();
  map.addLayer(Thalanyji_LAYER);
  Kariyarra_LAYER = createKariyarraMarker();
  map.addLayer(Kariyarra_LAYER);
  Nyangumarta_LAYER = createNyangumartaMarker();
  map.addLayer(Nyangumarta_LAYER);
  Yawuru_LAYER.on('click', function (e) {
    window.open('/who-we-are/traditional-custodians/yawuru-country', '_parent');
  });
  Kara_LAYER.on('click', function (e) {
    window.open('/who-we-are/traditional-custodians/eighty-mile', '_parent');
  });
  Ngarla_LAYER.on('click', function (e) {
    window.open('/who-we-are/traditional-custodians/eighty-mile', '_parent');
  });
  Yawuru_LAYER.on('click', function (e) {
    window.open('#', '_self');
  });
  Nyangumarta_LAYER.on('click', function (e) {
    window.open('/who-we-are/traditional-custodians/eighty-mile', '_parent');
  });
  Ngarluma_LAYER.on('click', function (e) {
    window.open('/who-we-are/traditional-custodians/ngarluma-country', '_parent');
  });
  Thalanyji_LAYER.on('click', function (e) {
    window.open('/who-we-are/traditional-custodians/thalanyji-country', '_parent');
  });
  Kariyarra_LAYER.on('click', function (e) {
    window.open('/who-we-are/traditional-custodians/kariyarra-country', '_parent');
  });

  addTOGroupMarkers();
  //addTownMarkers();
  createFilterControls();
  handleZoomEvents();
};

main();
