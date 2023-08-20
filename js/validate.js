const ROOMS_ERROR_MESSAGE = 'Недопустимое количество комнат для текущего количества гостей';
const DEFAULT_REALTY_TYPE = 'flat';
const MAX_PRICE = 100000;

const formNode = document.querySelector('.ad-form');
const roomNumberNode = formNode.querySelector('#room_number');
const capacityNode = formNode.querySelector('#capacity');
const timeinNode = formNode.querySelector('#timein');
const timeoutNode = formNode.querySelector('#timeout');
const priceNode = formNode.querySelector('#price');

const roomNumberOption = {
  1: [1],
  2: [1, 2],
  3: [1, 2, 3],
  100: [0],
};
const realtyMinPrice = {
  bungalow: 0,
  flat: 1000,
  hotel: 3000,
  house: 5000,
  palace: 10000,
};

let currentRealtyType = DEFAULT_REALTY_TYPE;

const getMinPriceMessage = () => `Цена не может быть меньше ${realtyMinPrice[currentRealtyType]}`;

const validateRooms = () => roomNumberOption[Number(roomNumberNode.value)].includes(Number(capacityNode.value));
const validateMinPrice = (value) => realtyMinPrice[currentRealtyType] <= value;

const pristine = new Pristine(formNode, {
  classTo: 'ad-form__element',
  errorClass: 'ad-form__element--invalid',
  errorTextParent: 'ad-form__element',
  errorTextClass: 'text-help',
});

pristine.addValidator(roomNumberNode, validateRooms, ROOMS_ERROR_MESSAGE);
pristine.addValidator(capacityNode, validateRooms, ROOMS_ERROR_MESSAGE);
pristine.addValidator(priceNode, validateMinPrice, getMinPriceMessage);

const onFormSubmit = (evt) => {
  evt.preventDefault();
  pristine.validate();
};
const onRoomsFieldChange = (evt) => {
  pristine.validate(evt.target);
};

const validatePrice = (onPriceValidate) => {
  onPriceValidate();
  priceNode.placeholder = realtyMinPrice[currentRealtyType];
  if (priceNode.value) {
    pristine.validate(priceNode);
  }
};

formNode.addEventListener('submit', onFormSubmit);
roomNumberNode.addEventListener('change', onRoomsFieldChange);
capacityNode.addEventListener('change', onRoomsFieldChange);

timeinNode.addEventListener('change', (evt) => {
  timeoutNode.value = evt.target.value;
});
timeoutNode.addEventListener('change', (evt) => {
  timeinNode.value = evt.target.value;
});

const getPriceRange = () => ({
  min: realtyMinPrice[currentRealtyType],
  max: MAX_PRICE,
});
const setCurrentRealtyType = (type) => {
  currentRealtyType = type;
}

export {validatePrice, getPriceRange, setCurrentRealtyType};
