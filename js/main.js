import {renderCard} from './card.js';
import {initMap, initMainPin, initPins} from './map.js';
import {disableForm, enableForm, setAddress} from './form.js';
import {requestData} from './api.js';
import {showAlert} from './alert.js';
import {debounce, getFilteredData} from './util.js';

const LOAD_ERROR_MESSAGE = 'Не удалось загрузить данные';
const RENDER_TIMEOUT = 500;

// const handleMapLoad = (latLng) => {
//   setAddress(latLng);
// };

disableForm();

requestData({
  url: '/data',
  method: 'GET',
  onSuccess: (data) => {
    console.log('data', data);
    const handleFilterChange = debounce((filter) => {
      initPins(renderCard, getFilteredData(data, filter));
    }, RENDER_TIMEOUT);

    enableForm(handleFilterChange);
    initMap(setAddress);
    initMainPin(setAddress);
    initPins(renderCard, data);
  },
  onError: (message) => {
    showAlert(message || LOAD_ERROR_MESSAGE);
  }
});
