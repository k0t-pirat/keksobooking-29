import {renderCard} from './card.js';
import {initMap, initMainPin, initPins} from './map.js';
import {disableForm, enableForm, setAddress} from './form.js';
import {requestData} from './api.js';
import {showAlert} from './alert.js';
import {getFilteredData} from './util.js';

const LOAD_ERROR_MESSAGE = 'Не удалось загрузить данные';

// const handleMapLoad = (latLng) => {
//   setAddress(latLng);
// };

disableForm();

requestData({
  url: '/data',
  method: 'GET',
  onSuccess: (data) => {
    console.log('data', data);
    const handleFilterChange = (filter) => {
      initPins(renderCard, getFilteredData(data, filter));
    };

    enableForm(handleFilterChange);
    initMap(setAddress);
    initMainPin(setAddress);
    initPins(renderCard, data);
  },
  onError: (message) => {
    showAlert(message || LOAD_ERROR_MESSAGE);
  }
});
