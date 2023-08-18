import './validate.js';

const formNode = document.querySelector('.ad-form');
const formHeaderNode = formNode.querySelector('.ad-form-header');
const formFieldsetNodes = formNode.querySelectorAll('.ad-form__element');

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
};


export {disableForm, enableForm};
