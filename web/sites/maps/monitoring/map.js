let map;
let ISWAG_LAYER;


// Initialize the map
const initializeMap = () => {
  map = L.map('map').setView([-16.947, 122.234], 6);
  
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  }).addTo(map);
};

// Create the Thevenard marker
const createThevMarker = () => {
  const Thev = {
    lat: -21.456048, 
    long: 115.001675,
    image: 'icons/pin.webp',
    name: 'Thevenard Island',
  };
  const marker = L.marker([Thev.lat, Thev.long], {
    icon: L.icon({
      iconUrl: Thev.image,
      iconSize: [40, 40],
      name: Thev.name,
    }),
  });  
  // Add tooltip for Thevenard
  marker.bindTooltip(Thev.name, { permanent: true, direction: 'top' });
  return marker;
};
// Create the Cape Domett marker
const createCapeDomettMarker = () => {
  const CapeDomett = {
    lat: -14.830302167840283,
    long: 128.38368615722658,
    image: 'icons/pin.webp',
    name: 'Cape Domett',
  };
  const marker = L.marker([CapeDomett.lat, CapeDomett.long], {
    icon: L.icon({
      iconUrl: CapeDomett.image,
      iconSize: [40, 40],
      name: CapeDomett.name,
    }),
  });  
  // Add tooltip for Cape Domett
  marker.bindTooltip(CapeDomett.name, { permanent: true, direction: 'top' });
  return marker;
};
const createYawuruMarker = () => {
  const Yawuru = {
    lat: -20.594438, 
    long: 117.173859,
    image: 'icons/black-dot.png',
    name: 'Cape Lambert',
  };
  const marker = L.marker([Yawuru.lat, Yawuru.long], {
    icon: L.icon({
      iconUrl: Yawuru.image,
      iconSize: [20, 20],
      name: Yawuru.name,
    }),
  });

  marker.bindTooltip(Yawuru.name, { permanent: true, direction: 'bottom' });
  return marker;
};
const createHedlandMarker = () => {
  const Hedland = {
    lat: -20.306113, 
    long: 118.613829,
    image: 'icons/black-dot.png',
    name: 'Port Hedland',
  };
  const marker = L.marker([Hedland.lat, Hedland.long], {
    icon: L.icon({
      iconUrl: Hedland.image,
      iconSize: [20, 20],
      name: Hedland.name,
    }),
  });

  marker.bindTooltip(Hedland.name, { permanent: true, direction: 'bottom' });
  return marker;
};
const createDelambreMarker = () => {
  const Delambre = {
    lat: -20.45022690521864,
    long: 117.07068465312501,
    image: 'icons/pin.webp',
    name: 'Delambre Island',
  };
  const marker = L.marker([Delambre.lat, Delambre.long], {
    icon: L.icon({
      iconUrl: Delambre.image,
      iconSize: [40, 40],
      name: Delambre.name,
    }),
  });

  marker.bindTooltip(Delambre.name, { permanent: true, direction: 'top' });
  return marker;
};
const createNgarlaMarker = () => {
  const Ngarla = {
    lat: -19.575317892869453,
    long: 120.98144531250001,
    image: 'icons/black-dot.png',
    name: 'Eighty Mile Beach',
  };
  const marker = L.marker([Ngarla.lat, Ngarla.long], {
    icon: L.icon({
      iconUrl: Ngarla.image,
      iconSize: [20, 20],
      name: Ngarla.name,
    }),
  });

  marker.bindTooltip(Ngarla.name, { permanent: true, direction: 'bottom' });
  return marker;
};
const createRoebuckMarker = () => {
  const Roebuck = {
    lat: -18.126591,
    long: 122.129154,
    image: 'icons/pin.webp',
    name: 'Roebuck Bay',
  };
  const marker = L.marker([Roebuck.lat, Roebuck.long], {
    icon: L.icon({
      iconUrl: Roebuck.image,
      iconSize: [40, 40],
      name: Roebuck.name,
    }),
  });
  marker.bindTooltip(Roebuck.name, { permanent: true, direction: 'left' });
  return marker;
};

const createThalanyjiMarker = () => {
  const Thalanyji = {
    lat: -17.932866056533406,
    long: 122.21354484558107,
    image: 'icons/black-dot.png',
    name: 'Cable Beach',
  };
  const marker = L.marker([Thalanyji.lat, Thalanyji.long], {
    icon: L.icon({
      iconUrl: Thalanyji.image,
      iconSize: [20, 20],
      name: Thalanyji.name,
    }),
  });

  marker.bindTooltip(Thalanyji.name, { permanent: true, direction: 'top' });
  return marker;
};

const createEcoMarker = () => {
  const Eco = {
    lat: -18.3296392277336,
    long: 122.08206523799898,
    image: 'icons/pin.webp',
    name: 'Eco Beach',
  };
  const marker = L.marker([Eco.lat, Eco.long], {
    icon: L.icon({
      iconUrl: Eco.image,
      iconSize: [40, 40],
      name: Eco.name,
    }),
  });

  marker.bindTooltip(Eco.name, { permanent: true, direction: 'right' });
  return marker;
};

// Add TO group markers to the map and create persistent popups
const addTOGroupMarkers = () => {
  toGroups.forEach(group => {
    if (group.isVisible) {
      const marker = L.marker([group.lat, group.lon], {
        icon: L.icon({
          iconUrl: group.logo,
          iconSize: [32, 32],
          className: 'logo',
        }),
      }).addTo(map);
      
      // Add tooltip instead of popup
      marker.bindTooltip(group.name, { permanent: true, direction: 'bottom' });
      
      group.marker = marker; // Store marker reference
    }
  });
};

// Toggle visibility of TO group markers
const toggleTOGroupMarkers = () => {
  toGroups.forEach(group => {
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
  group.children.forEach(child => {
    if (visible && map.getZoom() >= 7) {
      if (!child.marker) {
        // Create marker if it doesn't exist
        child.marker = L.marker([child.lat, child.lon], {
          icon: L.icon({
            iconUrl: child.logo,
            iconSize: [32, 32],
            className: 'logo',
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


// Handle map zoom events
const handleZoomEvents = () => {
  map.on('zoomend', () => {
    const zoomLevel = map.getZoom();   /*
    if (zoomLevel >=8) { 
      towns.forEach(town => {
        //map.removeLayer(town);
      });
    }
    if (zoomLevel >= 6) {
      if (map.hasLayer(ISWAG_LAYER)) {
        map.removeLayer(ISWAG_LAYER);
      }
      toGroups.forEach(group => {
        if (group.isVisible) {
          const bounds = map.getBounds();
          if (bounds.contains([group.lat, group.lon])) {
            // addChildMarkers(group);
          }
        }
      });
    } else {
      if (!map.hasLayer(ISWAG_LAYER)) {
        map.addLayer(ISWAG_LAYER);
      }
      // Remove all child markers
      toGroups.forEach(group => {
        toggleChildMarkers(group, false);
      });
    }*/
  });
};

// Add child markers to the map and keep track of them
// const addChildMarkers = (group) => {
//   group.children.forEach(child => {
//     if (!child.marker) {
//       const marker = L.marker([child.lat, child.lon], {
//         icon: L.icon({
//           iconUrl: child.logo,
//           iconSize: [32, 32],
//           className: 'logo',
//         }),
//       });
      
//       // Add tooltip instead of popup
//       marker.bindTooltip(child.name, { permanent: false, direction: 'top' });
//       marker.on('click', function(e) {     window.open("http://www.google.com", '_blank');   });

//       child.marker = marker; // Store marker reference
//     }
//     if (group.isVisible && map.getZoom() >= 7) {
//       map.addLayer(child.marker);
//     }
//   });
// };

// Create checkbox for towns
const createTownCheckbox = (town, index) => {
  const checkbox = document.createElement('input');
  checkbox.type = 'checkbox';
  checkbox.id = `town-${index}`;
  checkbox.checked = town.isVisible;
  checkbox.onchange = () => {
    town.isVisible = checkbox.checked;
    toggleTownMarkers();
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
  Thev_LAYER = createThevMarker();
  map.addLayer(Thev_LAYER);
  CapeDomett_LAYER = createCapeDomettMarker();
  map.addLayer(CapeDomett_LAYER);
  Yawuru_LAYER = createYawuruMarker();
  map.addLayer(Yawuru_LAYER);
  Hedland_LAYER = createHedlandMarker();
  map.addLayer(Hedland_LAYER);
  Delambre_LAYER = createDelambreMarker();
  map.addLayer(Delambre_LAYER);
  Ngarla_LAYER = createNgarlaMarker();
  map.addLayer(Ngarla_LAYER);
  Roebuck_LAYER = createRoebuckMarker();
  map.addLayer(Roebuck_LAYER);
  Thalanyji_LAYER = createThalanyjiMarker();
  map.addLayer(Thalanyji_LAYER);
  Eco_LAYER = createEcoMarker();
  map.addLayer(Eco_LAYER);
  Thev_LAYER.on('click', function(e) {     window.open("https://nwsftcp.mediaonmars.dev/what-we-do/monitoring/thevenard-island", '_parent');   });
  CapeDomett_LAYER.on('click', function(e) {     window.open("https://nwsftcp.mediaonmars.dev/what-we-do/monitoring/cape-domett", '_parent');   });
  // Yawuru_LAYER.on('click', function(e) {     window.open("https://nwsftcp.mediaonmars.dev/what-we-do/monitoring/cape-domett", '_blank');   });
  Delambre_LAYER.on('click', function(e) {     window.open("https://nwsftcp.mediaonmars.dev/what-we-do/monitoring/delambre-island", '_parent');   });
  // Yawuru_LAYER.on('click', function(e) {     window.open("http://www.google.com", '_blank');   });
  // Ngarla_LAYER.on('click', function(e) {     window.open("http://www.google.com", '_blank');   });
  Roebuck_LAYER.on('click', function(e) {     window.open("https://nwsftcp.mediaonmars.dev/what-we-do/monitoring/roebuck-bay", '_parent');   });
  // Thalanyji_LAYER.on('click', function(e) {     window.open("http://www.google.com", '_blank');   });
  Eco_LAYER.on('click', function(e) {     window.open("https://nwsftcp.mediaonmars.dev/what-we-do/monitoring/eco-beach", '_parent');   });

  addTOGroupMarkers();
  //addTownMarkers();
  createFilterControls();
  handleZoomEvents();

  map.on('click', ev => {
    const latlng = map.mouseEventToLatLng(ev.originalEvent);
    console.log(`${latlng.lat}, ${latlng.lng}`);
  });
};

main();
