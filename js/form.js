import { requestData } from './api.js';
import { showError, showSuccess } from './alert.js';
import {validatePrice, getPriceRange, setCurrentRealtyType, pristine}  from './validate.js';

const DEFAULT_MIN_PRICE = 1000;

const formNode = document.querySelector('.ad-form');
const formHeaderNode = formNode.querySelector('.ad-form-header');
const formFieldsetNodes = formNode.querySelectorAll('.ad-form__element');
const formSubmitNode = formNode.querySelector('.ad-form__submit');

const addressNode = formNode.querySelector('#address');
const priceSliderNode = formNode.querySelector('.ad-form__slider');
const realtyTypeNode = formNode.querySelector('#type');
const priceNode = formNode.querySelector('#price');

const filterFormNode = document.querySelector('.map__filters');
const featuresFilterNode = filterFormNode.querySelector('.map__features');
const filterNodes = filterFormNode.querySelectorAll('.map__filter');

const disableForm = () => {
  formNode.classList.add('ad-form--disabled');
  formHeaderNode.setAttribute('disabled', '');
  formFieldsetNodes.forEach((fieldsetNode) => {
    fieldsetNode.setAttribute('disabled', '');
  });
  
  filterFormNode.classList.add('ad-form--disabled');
  featuresFilterNode.setAttribute('disabled', '');
  filterNodes.forEach((filterNode) => {
    filterNode.setAttribute('disabled', '');
  });

  if (priceSliderNode.noUiSlider) {
    priceSliderNode.noUiSlider.destroy();
  }
};

const enableForm = () => {
  formNode.classList.remove('ad-form--disabled');
  formHeaderNode.removeAttribute('disabled');
  formFieldsetNodes.forEach((fieldsetNode) => {
    fieldsetNode.removeAttribute('disabled');
  });
  
  filterFormNode.classList.remove('ad-form--disabled');
  featuresFilterNode.removeAttribute('disabled');
  filterNodes.forEach((filterNode) => {
    filterNode.removeAttribute('disabled');
  }); 

  noUiSlider.create(priceSliderNode, {
    range: getPriceRange(),
    start: 0,
    step: 1,
    connect: 'lower',
    format: {
      to: (value) => Math.round(value),
      from: (value) => Number(value),
    }
  });

  priceSliderNode.noUiSlider.on('update', () => {
    priceNode.value = priceSliderNode.noUiSlider.get();
  });
  // priceNode.addEventListener('change', (evt) => {
  //   priceSliderNode.noUiSlider.set(evt.target.value);
  // });
  validatePrice(onPriceValidate);
};

const setAddress = (coord) => {
  addressNode.value = `${coord.lat}, ${coord.lng}`;
};

const onPriceValidate = () => {
  priceSliderNode.noUiSlider.updateOptions({
    range: getPriceRange(),
  });
};

realtyTypeNode.addEventListener('change', (evt) => {
  priceNode.min = evt.target.value;
  setCurrentRealtyType(evt.target.value);
  validatePrice(onPriceValidate);
});

const blockSubmitButton = () => {
  formSubmitNode.disabled = true;
  formSubmitNode.textContent = 'Публикуется...';
};
const unblockSubmitButton = () => {
  formSubmitNode.disabled = false;
  formSubmitNode.textContent = 'Опубликовать';
};

const resetForm = () => {
  pristine.reset();
  priceSliderNode.noUiSlider.set(DEFAULT_MIN_PRICE);
  priceNode.value = '';
  setCurrentRealtyType('flat');
  validatePrice(onPriceValidate);
}

formNode.addEventListener('reset', () => {
  resetForm()
});

formNode.addEventListener('submit', (evt) => {
  evt.preventDefault();
  pristine.validate();
  const formData = new FormData(evt.target);

  requestData({
    url: '',
    method: 'POST',
    data: formData,
    onStart: blockSubmitButton,
    onSuccess: () => {
      showSuccess();
      formNode.reset();
      resetForm();
    },
    onError: () => {
      showError();
    },
    onEnd: unblockSubmitButton,
  });
});

export {disableForm, enableForm, setAddress};
