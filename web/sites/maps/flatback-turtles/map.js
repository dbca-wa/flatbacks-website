let map;
let ISWAG_LAYER;

const initializeMap = () => {
  map = L.map('map').setView([-16.947, 122.234], 6);
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  }).addTo(map);
};

const createAshburtonRDMarker = () => {
  const AshburtonRD = {
    lat: -21.694347,
    long: 114.917555,
    image: 'icons/icon-turtle-rookery.png',
    name: 'Ashburton River Delta',
  };
  const marker = L.marker([AshburtonRD.lat, AshburtonRD.long], {
    icon: L.icon({ iconUrl: AshburtonRD.image, iconSize: [20, 20], name: AshburtonRD.name }),
  });
  marker.bindTooltip(AshburtonRD.name, { permanent: false, direction: 'top' });
  return marker;
};

const createBessieresMarker = () => {
  const Bessieres = {
    lat: -21.525749,
    long: 114.764922,
    image: 'icons/icon-turtle-rookery.png',
    name: 'Bessieres Island',
  };
  const marker = L.marker([Bessieres.lat, Bessieres.long], {
    icon: L.icon({ iconUrl: Bessieres.image, iconSize: [20, 20], name: Bessieres.name }),
  });
  marker.bindTooltip(Bessieres.name, { permanent: false, direction: 'top' });
  return marker;
};

const createLockerPtMarker = () => {
  const LockerPt = {
    lat: -21.76702999999999832,
    long: 114.79744999999999777,
    image: 'icons/icon-turtle-rookery.png',
    name: 'Locker Point, Urala',
  };
  const marker = L.marker([LockerPt.lat, LockerPt.long], {
    icon: L.icon({ iconUrl: LockerPt.image, iconSize: [20, 20], name: LockerPt.name }),
  });
  marker.bindTooltip(LockerPt.name, { permanent: false, direction: 'top' });
  return marker;
};

const createTubridgiMarker = () => {
  const Tubridgi = {
    lat: -21.63690000000000069,
    long: 115.1147150000000039,
    image: 'icons/icon-turtle-rookery.png',
    name: 'Tubridgi Point',
  };
  const marker = L.marker([Tubridgi.lat, Tubridgi.long], {
    icon: L.icon({ iconUrl: Tubridgi.image, iconSize: [20, 20], name: Tubridgi.name }),
  });
  marker.bindTooltip(Tubridgi.name, { permanent: false, direction: 'top' });
  return marker;
};

const createSerrurierMarker = () => {
  const Serrurier = {
    lat: -21.60782000000000025,
    long: 114.7342000000000013,
    image: 'icons/icon-turtle-rookery.png',
    name: 'Serrurier Island',
  };
  const marker = L.marker([Serrurier.lat, Serrurier.long], {
    icon: L.icon({ iconUrl: Serrurier.image, iconSize: [20, 20], name: Serrurier.name }),
  });
  marker.bindTooltip(Serrurier.name, { permanent: false, direction: 'top' });
  return marker;
};

const createBeadonMarker = () => {
  const Beadon = {
    lat: -21.63710400000000078,
    long: 115.15053299999999581,
    image: 'icons/icon-turtle-rookery.png',
    name: 'Beadon Creek & Coolgra Creek',
  };
  const marker = L.marker([Beadon.lat, Beadon.long], {
    icon: L.icon({ iconUrl: Beadon.image, iconSize: [20, 20], name: Beadon.name }),
  });
  marker.bindTooltip(Beadon.name, { permanent: false, direction: 'top' });
  return marker;
};

const createAnketellMarker = () => {
  const Anketell = {
    lat: -20.6281649999999992,
    long: 117.09336000000000411,
    image: 'icons/icon-turtle-rookery.png',
    name: 'Anketell Point',
  };
  const marker = L.marker([Anketell.lat, Anketell.long], {
    icon: L.icon({ iconUrl: Anketell.image, iconSize: [20, 20], name: Anketell.name }),
  });
  marker.bindTooltip(Anketell.name, { permanent: false, direction: 'top' });
  return marker;
};

const createLockerMarker = () => {
  const Locker = {
    lat: -21.71800999999999959,
    long: 114.76697799999999461,
    image: 'icons/icon-turtle-rookery.png',
    name: 'Locker Island',
  };
  const marker = L.marker([Locker.lat, Locker.long], {
    icon: L.icon({ iconUrl: Locker.image, iconSize: [20, 20], name: Locker.name }),
  });
  marker.bindTooltip(Locker.name, { permanent: false, direction: 'top' });
  return marker;
};

const createCleavervilleMarker = () => {
  const Cleaverville = {
    lat: -20.6509430000000016,
    long: 117.02295399999999859,
    image: 'icons/icon-turtle-rookery.png',
    name: 'Cleaverville',
  };
  const marker = L.marker([Cleaverville.lat, Cleaverville.long], {
    icon: L.icon({ iconUrl: Cleaverville.image, iconSize: [20, 20], name: Cleaverville.name }),
  });
  marker.bindTooltip(Cleaverville.name, { permanent: false, direction: 'top' });
  return marker;
};

const createMontalivetMarker = () => {
  const Montalivet = {
    lat: -14.28027799999999914,
    long: 125.29833299999999952,
    image: 'icons/icon-turtle-rookery.png',
    name: 'East Montalivet Island',
  };
  const marker = L.marker([Montalivet.lat, Montalivet.long], {
    icon: L.icon({ iconUrl: Montalivet.image, iconSize: [20, 20], name: Montalivet.name }),
  });
  marker.bindTooltip(Montalivet.name, { permanent: false, direction: 'top' });
  return marker;
};

const createThevenardMarker = () => {
  const Thevenard = {
    lat: -21.45666699999999949,
    long: 114.9886110000000059,
    image: 'icons/icon-turtle-rookery.png',
    name: 'Thevenard Island',
  };
  const marker = L.marker([Thevenard.lat, Thevenard.long], {
    icon: L.icon({ iconUrl: Thevenard.image, iconSize: [20, 20], name: Thevenard.name }),
  });
  marker.bindTooltip(Thevenard.name, { permanent: false, direction: 'top' });
  return marker;
};

const createVaranusMarker = () => {
  const Varanus = {
    lat: -20.64972200000000058,
    long: 115.57583300000000293,
    image: 'icons/icon-turtle-rookery.png',
    name: 'Varanus Island',
  };
  const marker = L.marker([Varanus.lat, Varanus.long], {
    icon: L.icon({ iconUrl: Varanus.image, iconSize: [20, 20], name: Varanus.name }),
  });
  marker.bindTooltip(Varanus.name, { permanent: false, direction: 'top' });
  return marker;
};

const createAshburtonMarker = () => {
  const Ashburton = {
    lat: -21.5913889999999995,
    long: 114.93555600000000538,
    image: 'icons/icon-turtle-rookery.png',
    name: 'Ashburton Island',
  };
  const marker = L.marker([Ashburton.lat, Ashburton.long], {
    icon: L.icon({ iconUrl: Ashburton.image, iconSize: [20, 20], name: Ashburton.name }),
  });
  marker.bindTooltip(Ashburton.name, { permanent: false, direction: 'top' });
  return marker;
};

const createDirectionMarker = () => {
  const Direction = {
    lat: -21.57471999999999923,
    long: 115.23337700000000439,
    image: 'icons/icon-turtle-rookery.png',
    name: 'Direction Island',
  };
  const marker = L.marker([Direction.lat, Direction.long], {
    icon: L.icon({ iconUrl: Direction.image, iconSize: [20, 20], name: Direction.name }),
  });
  marker.bindTooltip(Direction.name, { permanent: false, direction: 'top' });
  return marker;
};

const createBellsMarker = () => {
  const Bells = {
    lat: -20.60495200000000082,
    long: 117.16387799999999686,
    image: 'icons/icon-turtle-rookery.png',
    name: 'Bells Beach',
  };
  const marker = L.marker([Bells.lat, Bells.long], {
    icon: L.icon({ iconUrl: Bells.image, iconSize: [20, 20], name: Bells.name }),
  });
  marker.bindTooltip(Bells.name, { permanent: false, direction: 'top' });
  return marker;
};

const createDixonMarker = () => {
  const Dixon = {
    lat: -20.62885999999999953,
    long: 117.05881300000000067,
    image: 'icons/icon-turtle-rookery.png',
    name: 'Dixon Island',
  };
  const marker = L.marker([Dixon.lat, Dixon.long], {
    icon: L.icon({ iconUrl: Dixon.image, iconSize: [20, 20], name: Dixon.name }),
  });
  marker.bindTooltip(Dixon.name, { permanent: false, direction: 'top' });
  return marker;
};

const createDelambreMarker = () => {
  const Delambre = {
    lat: -20.44777799999999957,
    long: 117.07666700000000048,
    image: 'icons/icon-turtle-rookery.png',
    name: 'Delambre Island',
  };
  const marker = L.marker([Delambre.lat, Delambre.long], {
    icon: L.icon({ iconUrl: Delambre.image, iconSize: [20, 20], name: Delambre.name }),
  });
  marker.bindTooltip(Delambre.name, { permanent: false, direction: 'top' });
  return marker;
};

const createHauyMarker = () => {
  const Hauy = {
    lat: -20.4393400000000014,
    long: 116.97199700000000178,
    image: 'icons/icon-turtle-rookery.png',
    name: 'Hauy Island',
  };
  const marker = L.marker([Hauy.lat, Hauy.long], {
    icon: L.icon({ iconUrl: Hauy.image, iconSize: [20, 20], name: Hauy.name }),
  });
  marker.bindTooltip(Hauy.name, { permanent: false, direction: 'top' });
  return marker;
};

const createLamarckMarker = () => {
  const Lamarck = {
    lat: -14.78416700000000006,
    long: 125.02500000000000568,
    image: 'icons/icon-turtle-rookery.png',
    name: 'Lamarck Island',
  };
  const marker = L.marker([Lamarck.lat, Lamarck.long], {
    icon: L.icon({ iconUrl: Lamarck.image, iconSize: [20, 20], name: Lamarck.name }),
  });
  marker.bindTooltip(Lamarck.name, { permanent: false, direction: 'top' });
  return marker;
};

const createBarrowMarker = () => {
  const Barrow = {
    lat: -20.79777800000000099,
    long: 115.40638900000000433,
    image: 'icons/icon-turtle-rookery.png',
    name: 'Barrow Island',
  };
  const marker = L.marker([Barrow.lat, Barrow.long], {
    icon: L.icon({ iconUrl: Barrow.image, iconSize: [20, 20], name: Barrow.name }),
  });
  marker.bindTooltip(Barrow.name, { permanent: false, direction: 'top' });
  return marker;
};

const createDomettMarker = () => {
  const Domett = {
    lat: -14.81638899999999914,
    long: 128.37916699999999537,
    image: 'icons/icon-turtle-rookery.png',
    name: 'Cape Domett',
  };
  const marker = L.marker([Domett.lat, Domett.long], {
    icon: L.icon({ iconUrl: Domett.image, iconSize: [20, 20], name: Domett.name }),
  });
  marker.bindTooltip(Domett.name, { permanent: false, direction: 'top' });
  return marker;
};

const createMaretMarker = () => {
  const Maret = {
    lat: -14.40972200000000036,
    long: 124.97527800000000298,
    image: 'icons/icon-turtle-rookery.png',
    name: 'Maret Islands',
  };
  const marker = L.marker([Maret.lat, Maret.long], {
    icon: L.icon({ iconUrl: Maret.image, iconSize: [20, 20], name: Maret.name }),
  });
  marker.bindTooltip(Maret.name, { permanent: false, direction: 'top' });
  return marker;
};

const createSMuironMarker = () => {
  const SMuiron = {
    lat: -21.68250000000000099,
    long: 114.32527799999999729,
    image: 'icons/icon-turtle-rookery.png',
    name: 'South Muiron Island',
  };
  const marker = L.marker([SMuiron.lat, SMuiron.long], {
    icon: L.icon({ iconUrl: SMuiron.image, iconSize: [20, 20], name: SMuiron.name }),
  });
  marker.bindTooltip(SMuiron.name, { permanent: false, direction: 'top' });
  return marker;
};

const createNMuironMarker = () => {
  const NMuiron = {
    lat: -21.63722200000000129,
    long: 114.37527799999999445,
    image: 'icons/icon-turtle-rookery.png',
    name: 'North Muiron Island',
  };
  const marker = L.marker([NMuiron.lat, NMuiron.long], {
    icon: L.icon({ iconUrl: NMuiron.image, iconSize: [20, 20], name: NMuiron.name }),
  });
  marker.bindTooltip(NMuiron.name, { permanent: false, direction: 'top' });
  return marker;
};

const createTableMarker = () => {
  const Table = {
    lat: -21.61665700000000001,
    long: 114.71666700000000105,
    image: 'icons/icon-turtle-rookery.png',
    name: 'Table Island',
  };
  const marker = L.marker([Table.lat, Table.long], {
    icon: L.icon({ iconUrl: Table.image, iconSize: [20, 20], name: Table.name }),
  });
  marker.bindTooltip(Table.name, { permanent: false, direction: 'top' });
  return marker;
};

const createFlatMarker = () => {
  const Flat = {
    lat: -21.60326799999999992,
    long: 114.62151699999999721,
    image: 'icons/icon-turtle-rookery.png',
    name: 'Flat Island',
  };
  const marker = L.marker([Flat.lat, Flat.long], {
    icon: L.icon({ iconUrl: Flat.image, iconSize: [20, 20], name: Flat.name }),
  });
  marker.bindTooltip(Flat.name, { permanent: false, direction: 'top' });
  return marker;
};

const createTortoiseMarker = () => {
  const Tortoise = {
    lat: -21.58036200000000093,
    long: 114.86157000000000039,
    image: 'icons/icon-turtle-rookery.png',
    name: 'Tortoise Island',
  };
  const marker = L.marker([Tortoise.lat, Tortoise.long], {
    icon: L.icon({ iconUrl: Tortoise.image, iconSize: [20, 20], name: Tortoise.name }),
  });
  marker.bindTooltip(Tortoise.name, { permanent: false, direction: 'top' });
  return marker;
};

const createNETwinMarker = () => {
  const NETwin = {
    lat: -21.51666700000000176,
    long: 115.21666700000000105,
    image: 'icons/icon-turtle-rookery.png',
    name: 'North-East Twin Island',
  };
  const marker = L.marker([NETwin.lat, NETwin.long], {
    icon: L.icon({ iconUrl: NETwin.image, iconSize: [20, 20], name: NETwin.name }),
  });
  marker.bindTooltip(NETwin.name, { permanent: false, direction: 'top' });
  return marker;
};

const createSWTwinMarker = () => {
  const SWTwin = {
    lat: -21.51665799999999962,
    long: 115.20000000000000284,
    image: 'icons/icon-turtle-rookery.png',
    name: 'South-West Twin Island',
  };
  const marker = L.marker([SWTwin.lat, SWTwin.long], {
    icon: L.icon({ iconUrl: SWTwin.image, iconSize: [20, 20], name: SWTwin.name }),
  });
  marker.bindTooltip(SWTwin.name, { permanent: false, direction: 'top' });
  return marker;
};

const createAirlieMarker = () => {
  const Airlie = {
    lat: -21.32286071700000107,
    long: 115.16690063400000099,
    image: 'icons/icon-turtle-rookery.png',
    name: 'Airlie Island',
  };
  const marker = L.marker([Airlie.lat, Airlie.long], {
    icon: L.icon({ iconUrl: Airlie.image, iconSize: [20, 20], name: Airlie.name }),
  });
  marker.bindTooltip(Airlie.name, { permanent: false, direction: 'top' });
  return marker;
};

const createRoundIMarker = () => {
  const RoundI = {
    lat: -20.97748199999999841,
    long: 115.86237599999999759,
    image: 'icons/icon-turtle-rookery.png',
    name: 'Round Island',
  };
  const marker = L.marker([RoundI.lat, RoundI.long], {
    icon: L.icon({ iconUrl: RoundI.image, iconSize: [20, 20], name: RoundI.name }),
  });
  marker.bindTooltip(RoundI.name, { permanent: false, direction: 'top' });
  return marker;
};

const createBridledMarker = () => {
  const Bridled = {
    lat: -20.63972199999999901,
    long: 115.55611100000000135,
    image: 'icons/icon-turtle-rookery.png',
    name: 'Bridled Island',
  };
  const marker = L.marker([Bridled.lat, Bridled.long], {
    icon: L.icon({ iconUrl: Bridled.image, iconSize: [20, 20], name: Bridled.name }),
  });
  marker.bindTooltip(Bridled.name, { permanent: false, direction: 'top' });
  return marker;
};

const createLambertMarker = () => {
  const Lambert = {
    lat: -20.59250000000000114,
    long: 117.18361099999999908,
    image: 'icons/icon-turtle-rookery.png',
    name: 'Cape Lambert',
  };
  const marker = L.marker([Lambert.lat, Lambert.long], {
    icon: L.icon({ iconUrl: Lambert.image, iconSize: [20, 20], name: Lambert.name }),
  });
  marker.bindTooltip(Lambert.name, { permanent: false, direction: 'top' });
  return marker;
};

const createBezoutMarker = () => {
  const Bezout = {
    lat: -20.55234000000000094,
    long: 117.1757300000000015,
    image: 'icons/icon-turtle-rookery.png',
    name: 'Bezout Island',
  };
  const marker = L.marker([Bezout.lat, Bezout.long], {
    icon: L.icon({ iconUrl: Bezout.image, iconSize: [20, 20], name: Bezout.name }),
  });
  marker.bindTooltip(Bezout.name, { permanent: false, direction: 'top' });
  return marker;
};

const createAngelMarker = () => {
  const Angel = {
    lat: -20.49731999999999843,
    long: 116.80100000000000193,
    image: 'icons/icon-turtle-rookery.png',
    name: 'Angel Island',
  };
  const marker = L.marker([Angel.lat, Angel.long], {
    icon: L.icon({ iconUrl: Angel.image, iconSize: [20, 20], name: Angel.name }),
  });
  marker.bindTooltip(Angel.name, { permanent: false, direction: 'top' });
  return marker;
};

const createDolphinMarker = () => {
  const Dolphin = {
    lat: -20.48498000000000019,
    long: 116.85188999999999737,
    image: 'icons/icon-turtle-rookery.png',
    name: 'Dolphin Island',
  };
  const marker = L.marker([Dolphin.lat, Dolphin.long], {
    icon: L.icon({ iconUrl: Dolphin.image, iconSize: [20, 20], name: Dolphin.name }),
  });
  marker.bindTooltip(Dolphin.name, { permanent: false, direction: 'top' });
  return marker;
};
const createRosemaryMarker = () => {
  const Rosemary = {
    lat: -20.48166700000000162,
    long: 116.59361099999999567,
    image: 'icons/icon-turtle-rookery.png',
    name: 'Rosemary Island',
  };
  const marker = L.marker([Rosemary.lat, Rosemary.long], {
    icon: L.icon({ iconUrl: Rosemary.image, iconSize: [20, 20], name: Rosemary.name }),
  });
  marker.bindTooltip(Rosemary.name, { permanent: false, direction: 'top' });
  return marker;
};
const createGidleyMarker = () => {
  const Gidley = {
    lat: -20.46709999999999852,
    long: 116.81144999999999357,
    image: 'icons/icon-turtle-rookery.png',
    name: 'Gidley Island',
  };
  const marker = L.marker([Gidley.lat, Gidley.long], {
    icon: L.icon({ iconUrl: Gidley.image, iconSize: [20, 20], name: Gidley.name }),
  });
  marker.bindTooltip(Gidley.name, { permanent: false, direction: 'top' });
  return marker;
};
const createLegendreMarker = () => {
  const Legendre = {
    lat: -20.39308000000000121,
    long: 116.8632300000000015,
    image: 'icons/icon-turtle-rookery.png',
    name: 'Legendre Island',
  };
  const marker = L.marker([Legendre.lat, Legendre.long], {
    icon: L.icon({ iconUrl: Legendre.image, iconSize: [20, 20], name: Legendre.name }),
  });
  marker.bindTooltip(Legendre.name, { permanent: false, direction: 'top' });
  return marker;
};
const createMundabullanganaMarker = () => {
  const Mundabullangana = {
    lat: -20.33611099999999894,
    long: 118.18194400000000144,
    image: 'icons/icon-turtle-rookery.png',
    name: 'Mundabullangana, Cape Thouin',
  };
  const marker = L.marker([Mundabullangana.lat, Mundabullangana.long], {
    icon: L.icon({ iconUrl: Mundabullangana.image, iconSize: [20, 20], name: Mundabullangana.name }),
  });
  marker.bindTooltip(Mundabullangana.name, { permanent: false, direction: 'top' });
  return marker;
};
const createCemetryMarker = () => {
  const Cemetry = {
    lat: -20.30761000000000038,
    long: 118.60684999999999434,
    image: 'icons/icon-turtle-rookery.png',
    name: 'Cemetry Beach, Port Hedland',
  };
  const marker = L.marker([Cemetry.lat, Cemetry.long], {
    icon: L.icon({ iconUrl: Cemetry.image, iconSize: [20, 20], name: Cemetry.name }),
  });
  marker.bindTooltip(Cemetry.name, { permanent: false, direction: 'top' });
  return marker;
};
const createEightyMarker = () => {
  const Eighty = {
    lat: -19.55944399999999916,
    long: 121.41222199999999987,
    image: 'icons/icon-turtle-rookery.png',
    name: 'Eighty Mile Beach',
  };
  const marker = L.marker([Eighty.lat, Eighty.long], {
    icon: L.icon({ iconUrl: Eighty.image, iconSize: [20, 20], name: Eighty.name }),
  });
  marker.bindTooltip(Eighty.name, { permanent: false, direction: 'top' });
  return marker;
};
const createEcoMarker = () => {
  const Eco = {
    lat: -18.32527800000000084,
    long: 122.06527800000000639,
    image: 'icons/icon-turtle-rookery.png',
    name: 'Eco Beach',
  };
  const marker = L.marker([Eco.lat, Eco.long], {
    icon: L.icon({ iconUrl: Eco.image, iconSize: [20, 20], name: Eco.name }),
  });
  marker.bindTooltip(Eco.name, { permanent: false, direction: 'top' });
  return marker;
};
const createCableMarker = () => {
  const Cable = {
    lat: -17.93194400000000144,
    long: 122.20805599999999913,
    image: 'icons/icon-turtle-rookery.png',
    name: 'Cable Beach, Roebuck Bay',
  };
  const marker = L.marker([Cable.lat, Cable.long], {
    icon: L.icon({ iconUrl: Cable.image, iconSize: [20, 20], name: Cable.name }),
  });
  marker.bindTooltip(Cable.name, { permanent: false, direction: 'top' });
  return marker;
};
const createLacepedeMarker = () => {
  const Lacepede = {
    lat: -16.86861100000000135,
    long: 122.15999999999999659,
    image: 'icons/icon-turtle-rookery.png',
    name: 'Lacepede Islands',
  };
  const marker = L.marker([Lacepede.lat, Lacepede.long], {
    icon: L.icon({ iconUrl: Lacepede.image, iconSize: [20, 20], name: Lacepede.name }),
  });
  marker.bindTooltip(Lacepede.name, { permanent: false, direction: 'top' });
  return marker;
};
const createHelpmanMarker = () => {
  const Helpman = {
    lat: -16.71972200000000086,
    long: 123.61388900000000035,
    image: 'icons/icon-turtle-rookery.png',
    name: 'North Helpman Island (Janawan)',
  };
  const marker = L.marker([Helpman.lat, Helpman.long], {
    icon: L.icon({ iconUrl: Helpman.image, iconSize: [20, 20], name: Helpman.name }),
  });
  marker.bindTooltip(Helpman.name, { permanent: false, direction: 'top' });
  return marker;
};
const createMontgomeryMarker = () => {
  const Montgomery = {
    lat: -15.91472199999999937,
    long: 124.1411109999999951,
    image: 'icons/icon-turtle-rookery.png',
    name: 'Montgomery Reef',
  };
  const marker = L.marker([Montgomery.lat, Montgomery.long], {
    icon: L.icon({ iconUrl: Montgomery.image, iconSize: [20, 20], name: Montgomery.name }),
  });
  marker.bindTooltip(Montgomery.name, { permanent: false, direction: 'top' });
  return marker;
};
const createTurbinMarker = () => {
  const Turbin = {
    lat: -14.47802700000000087,
    long: 125.00206699999999671,
    image: 'icons/icon-turtle-rookery.png',
    name: 'Turbin Island',
  };
  const marker = L.marker([Turbin.lat, Turbin.long], {
    icon: L.icon({ iconUrl: Turbin.image, iconSize: [20, 20], name: Turbin.name }),
  });
  marker.bindTooltip(Turbin.name, { permanent: false, direction: 'top' });
  return marker;
};
const createAlbertMarker = () => {
  const Albert = {
    lat: -14.51547300000000007,
    long: 124.92827300000000434,
    image: 'icons/icon-turtle-rookery.png',
    name: 'Albert Island',
  };
  const marker = L.marker([Albert.lat, Albert.long], {
    icon: L.icon({ iconUrl: Albert.image, iconSize: [20, 20], name: Albert.name }),
  });
  marker.bindTooltip(Albert.name, { permanent: false, direction: 'top' });
  return marker;
};
const createMontebelloMarker = () => {
  const Montebello = {
    lat: -20.433665,
    long: 115.541171,
    image: 'icons/icon-turtle-rookery.png',
    name: 'Montebello Islands',
  };
  const marker = L.marker([Montebello.lat, Montebello.long], {
    icon: L.icon({ iconUrl: Montebello.image, iconSize: [20, 20], name: Montebello.name }),
  });
  marker.bindTooltip(Montebello.name, { permanent: false, direction: 'top' });
  return marker;
};
const createBurrup1Marker = () => {
  const Burrup1 = {
    lat: -20.600178,
    long: 116.523533,
    image: 'icons/icon-turtle-rookery.png',
    name: 'Enderby Island',
  };
  const marker = L.marker([Burrup1.lat, Burrup1.long], {
    icon: L.icon({ iconUrl: Burrup1.image, iconSize: [20, 20], name: Burrup1.name }),
  });
  marker.bindTooltip(Burrup1.name, { permanent: false, direction: 'top' });
  return marker;
};
const createBurrup2Marker = () => {
  const Burrup2 = {
    lat: -20.571247,
    long: 116.62896,
    image: 'icons/icon-turtle-rookery.png',
    name: 'West Lewis Island',
  };
  const marker = L.marker([Burrup2.lat, Burrup2.long], {
    icon: L.icon({ iconUrl: Burrup2.image, iconSize: [20, 20], name: Burrup2.name }),
  });
  marker.bindTooltip(Burrup2.name, { permanent: false, direction: 'top' });
  return marker;
};
const createBurrup3Marker = () => {
  const Burrup3 = {
    lat: -20.516758,
    long: 116.671103,
    image: 'icons/icon-turtle-rookery.png',
    name: 'Malus Island',
  };
  const marker = L.marker([Burrup3.lat, Burrup3.long], {
    icon: L.icon({ iconUrl: Burrup3.image, iconSize: [20, 20], name: Burrup3.name }),
  });
  marker.bindTooltip(Burrup3.name, { permanent: false, direction: 'top' });
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
          className: 'logo',
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
    const zoomLevel = map.getZoom();

    if (zoomLevel >= 8) {
      ISWAG_LAYER.bindTooltip('ISWAG', { permanent: true, direction: 'top' });
      Yawuru_LAYER.bindTooltip('Yawuru', { permanent: true, direction: 'top' });
      Kara_LAYER.bindTooltip('Kara', { permanent: true, direction: 'top' });
      Ngarla_LAYER.bindTooltip('testse', { permanent: true, direction: 'top' });
      Ngarluma_LAYER.bindTooltip('Ngarluma', { permanent: true, direction: 'top' });
      Thalanyji_LAYER.bindTooltip('Thalanyji', { permanent: true, direction: 'top' });
    } else {
      ISWAG_LAYER.bindTooltip('ISWAG', { permanent: false, direction: 'top' });
      Yawuru_LAYER.bindTooltip('Yawuru', { permanent: false, direction: 'top' });
      Kara_LAYER.bindTooltip('Kara', { permanent: false, direction: 'top' });
      Ngarla_LAYER.bindTooltip('Ngarla', { permanent: false, direction: 'top' });
      Ngarluma_LAYER.bindTooltip('Ngarluma', { permanent: false, direction: 'top' });
      Thalanyji_LAYER.bindTooltip('Thalanyji', { permanent: false, direction: 'top' });
    }
  });
};

// Initialize the map and add all elements
const main = () => {
  initializeMap();
  AshburtonRD_LAYER = createAshburtonRDMarker();
  map.addLayer(AshburtonRD_LAYER);
  Bessieres_LAYER = createBessieresMarker();
  map.addLayer(Bessieres_LAYER);
  LockerPt_LAYER = createLockerPtMarker();
  map.addLayer(LockerPt_LAYER);
  Tubridgi_LAYER = createTubridgiMarker();
  map.addLayer(Tubridgi_LAYER);
  Serrurier_LAYER = createSerrurierMarker();
  map.addLayer(Serrurier_LAYER);
  Beadon_LAYER = createBeadonMarker();
  map.addLayer(Beadon_LAYER);
  Anketell_LAYER = createAnketellMarker();
  map.addLayer(Anketell_LAYER);
  Locker_LAYER = createLockerMarker();
  map.addLayer(Locker_LAYER);
  Cleaverville_LAYER = createCleavervilleMarker();
  map.addLayer(Cleaverville_LAYER);
  Montalivet_LAYER = createMontalivetMarker();
  map.addLayer(Montalivet_LAYER);
  Thevenard_LAYER = createThevenardMarker();
  map.addLayer(Thevenard_LAYER);
  Varanus_LAYER = createVaranusMarker();
  map.addLayer(Varanus_LAYER);
  Ashburton_LAYER = createAshburtonMarker();
  map.addLayer(Ashburton_LAYER);
  Direction_LAYER = createDirectionMarker();
  map.addLayer(Direction_LAYER);
  Bells_LAYER = createBellsMarker();
  map.addLayer(Bells_LAYER);
  Dixon_LAYER = createDixonMarker();
  map.addLayer(Dixon_LAYER);
  Delambre_LAYER = createDelambreMarker();
  map.addLayer(Delambre_LAYER);
  Hauy_LAYER = createHauyMarker();
  map.addLayer(Hauy_LAYER);
  Lamarck_LAYER = createLamarckMarker();
  map.addLayer(Lamarck_LAYER);
  Barrow_LAYER = createBarrowMarker();
  map.addLayer(Barrow_LAYER);
  Domett_LAYER = createDomettMarker();
  map.addLayer(Domett_LAYER);
  Maret_LAYER = createMaretMarker();
  map.addLayer(Maret_LAYER);
  SMuiron_LAYER = createSMuironMarker();
  map.addLayer(SMuiron_LAYER);
  NMuiron_LAYER = createNMuironMarker();
  map.addLayer(NMuiron_LAYER);
  Table_LAYER = createTableMarker();
  map.addLayer(Table_LAYER);
  Flat_LAYER = createFlatMarker();
  map.addLayer(Flat_LAYER);
  Tortoise_LAYER = createTortoiseMarker();
  map.addLayer(Tortoise_LAYER);
  NETwin_LAYER = createNETwinMarker();
  map.addLayer(NETwin_LAYER);
  SWTwin_LAYER = createSWTwinMarker();
  map.addLayer(SWTwin_LAYER);
  Airlie_LAYER = createAirlieMarker();
  map.addLayer(Airlie_LAYER);
  RoundI_LAYER = createRoundIMarker();
  map.addLayer(RoundI_LAYER);
  Bridled_LAYER = createBridledMarker();
  map.addLayer(Bridled_LAYER);
  Lambert_LAYER = createLambertMarker();
  map.addLayer(Lambert_LAYER);
  Bezout_LAYER = createBezoutMarker();
  map.addLayer(Bezout_LAYER);
  Angel_LAYER = createAngelMarker();
  map.addLayer(Angel_LAYER);
  Dolphin_LAYER = createDolphinMarker();
  map.addLayer(Dolphin_LAYER);
  Rosemary_LAYER = createRosemaryMarker();
  map.addLayer(Rosemary_LAYER);
  Gidley_LAYER = createGidleyMarker();
  map.addLayer(Gidley_LAYER);
  Legendre_LAYER = createLegendreMarker();
  map.addLayer(Legendre_LAYER);
  Mundabullangana_LAYER = createMundabullanganaMarker();
  map.addLayer(Mundabullangana_LAYER);
  Cemetry_LAYER = createCemetryMarker();
  map.addLayer(Cemetry_LAYER);
  Eighty_LAYER = createEightyMarker();
  map.addLayer(Eighty_LAYER);
  Eco_LAYER = createEcoMarker();
  map.addLayer(Eco_LAYER);
  Cable_LAYER = createCableMarker();
  map.addLayer(Cable_LAYER);
  Lacepede_LAYER = createLacepedeMarker();
  map.addLayer(Lacepede_LAYER);
  Helpman_LAYER = createHelpmanMarker();
  map.addLayer(Helpman_LAYER);
  Montgomery_LAYER = createMontgomeryMarker();
  map.addLayer(Montgomery_LAYER);
  Turbin_LAYER = createTurbinMarker();
  map.addLayer(Turbin_LAYER);
  Albert_LAYER = createAlbertMarker();
  map.addLayer(Albert_LAYER);
  Montebello_LAYER = createMontebelloMarker();
  map.addLayer(Montebello_LAYER);
  Burrup1_LAYER = createBurrup1Marker();
  map.addLayer(Burrup1_LAYER);
  Burrup2_LAYER = createBurrup2Marker();
  map.addLayer(Burrup2_LAYER);
  Burrup3_LAYER = createBurrup3Marker();
  map.addLayer(Burrup3_LAYER);

  AshburtonRD_LAYER.on('click', function (e) {
    window.open('#', '_self');
  });
  Bessieres_LAYER.on('click', function (e) {
    window.open('#', '_self');
  });
  LockerPt_LAYER.on('click', function (e) {
    window.open('#', '_self');
  });

  addTOGroupMarkers();
  createFilterControls();
  handleZoomEvents();
};

main();
