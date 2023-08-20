import { cards } from "./data.js";

const TILE_LAYER = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
const COPYRIGHT = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';
const ZOOM = 12;

const mapNode = document.querySelector('#map-canvas');
let map = null;

const mapPinIconConfig = {
  url: './img/main-pin.svg',
  width: 52,
  height: 52,
  anchorX: 26,
  anchorY: 52,
};
const pinIconConfig = {
  url: './img/pin.svg',
  width: 52,
  height: 52,
  anchorX: 26,
  anchorY: 52,
};

const tokyoCityCenter = {
  lat: 35.652832,
  lng: 139.839478,
};
const mainPinCoord = {
  lat: 35.652832,
  lng: 139.839478,
};

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
  const {url, width, height, anchorX, anchorY} = mapPinIconConfig;
  const mainPinIcon = L.icon({
    iconUrl: url,
    iconSize: [width, height],
    iconAnchor: [anchorX, anchorY],
  });
  
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

const {url, width, height, anchorX, anchorY} = pinIconConfig;
const pinIcon = L.icon({
  iconUrl: url,
  iconSize: [width, height],
  iconAnchor: [anchorX, anchorY],
});

const initPins = (renderCard) => {
  cards.forEach(({location, id}) => {
    const {lat, lng} = location;
    const marker = L.marker({
      lat,
      lng,
    }, {
      icon: pinIcon,
    });

    
    marker.addTo(map).bindPopup(renderCard(id));
  });
};

export {initMap, initMainPin, initPins};
