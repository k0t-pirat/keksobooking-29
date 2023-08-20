import {renderCard} from './card.js';
import {initMap, initMainPin, initPins} from './map.js';
import {disableForm, enableForm, setAddress} from './form.js';

const handleMapLoad = (latLng) => {
  enableForm();
  setAddress(latLng);
};

disableForm();
initMap(handleMapLoad);
initMainPin(setAddress);
initPins(renderCard);
