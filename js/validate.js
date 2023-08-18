const ROOMS_ERROR_MESSAGE = 'Недопустимое количество комнат для текущего количества гостей';

const formNode = document.querySelector('.ad-form');
const roomNumberNode = formNode.querySelector('#room_number');
const capacityNode = formNode.querySelector('#capacity');
const timeinNode = formNode.querySelector('#timein');
const timeoutNode = formNode.querySelector('#timeout');

const roomNumberOption = {
  1: [1],
  2: [1, 2],
  3: [1, 2, 3],
  100: [0],
};

const validateRooms = () => roomNumberOption[Number(roomNumberNode.value)].includes(Number(capacityNode.value));

const pristine = new Pristine(formNode, {
  classTo: 'ad-form__element',
  errorClass: 'ad-form__element--invalid',
  errorTextParent: 'ad-form__element',
  errorTextClass: 'text-help',
});

pristine.addValidator(roomNumberNode, validateRooms, ROOMS_ERROR_MESSAGE);
pristine.addValidator(capacityNode, validateRooms, ROOMS_ERROR_MESSAGE);

const onFormSubmit = (evt) => {
  evt.preventDefault();
  pristine.validate();
};
const onRoomsFieldChange = () => {
  pristine.validate();
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

