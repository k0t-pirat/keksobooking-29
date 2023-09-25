const MAX_MARKERS_COUNT = 10;
const TILE_LAYER = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
const COPYRIGHT = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';
const ZOOM = 12;
const Marker = {
  SIZE_MAIN: 52,
  SIZE_COMMON: 40,
  URL_MAIN: './img/main-pin.svg',
  URL_COMMON: './img/pin.svg',
};

const mapNode = document.querySelector('#map-canvas');
let map = null;
let markers = [];

const tokyoCityCenter = {
  lat: 35.652832,
  lng: 139.839478,
};
const mainPinCoord = {
  lat: 35.652832,
  lng: 139.839478,
};

const mainPinIcon = L.icon({
  iconUrl: Marker.URL_MAIN,
  iconSize: [Marker.SIZE_MAIN, Marker.SIZE_MAIN],
  iconAnchor: [Marker.SIZE_MAIN / 2, Marker.SIZE_MAIN],
});
const pinIcon = L.icon({
  iconUrl: Marker.URL_COMMON,
  iconSize: [Marker.SIZE_COMMON, Marker.SIZE_COMMON],
  iconAnchor: [Marker.SIZE_COMMON / 2, Marker.SIZE_COMMON],
});

const initMap = (onMapLoad) => {
  map = L.map(mapNode)
    .on('load', () => {
      onMapLoad(mainPinCoord);
    })
    .setView(tokyoCityCenter, ZOOM);
  
  L.tileLayer(TILE_LAYER, {
    attribution: COPYRIGHT,
  }).addTo(map);
};

const initMainPin = (onMainPinMoveend) => {
  const mainPinMarker = L.marker(mainPinCoord, {
    draggable: true,
    icon: mainPinIcon,
  });
  
  mainPinMarker.on('moveend', (evt) => {
    const rawLatLng = evt.target.getLatLng();
    onMainPinMoveend({
      lat: rawLatLng.lat.toFixed(5),
      lng: rawLatLng.lng.toFixed(5),
    });
  });
  
  mainPinMarker.addTo(map);
};

const initPins = (renderCard, cards) => {
  markers.forEach((marker) => {
    marker.removeFrom(map);
  });
  
  // cards.forEach((card) => {
  cards.slice(0, MAX_MARKERS_COUNT).forEach((card) => {
    const {lat, lng} = card.location;
    const marker = L.marker({ lat, lng }, { icon: pinIcon });
    
    marker.addTo(map).bindPopup(renderCard(card));
    markers.push(marker);
  });
};

export {initMap, initMainPin, initPins};
