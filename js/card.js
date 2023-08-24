
const offerTypesMapper = {
  flat: 'Квартира',
  bungalow: 'Бунгало',
  house: 'Дом',
  palace: 'Дворец',
  hotel: 'Отель',
};

const cardTemplate = document.querySelector('#card').content.querySelector('.popup');

const renderCard = (card) => {
  const {offer, author} = card;
  const {title, address, price, type, rooms, guests, checkin, checkout, features, description, photos} = offer;
  const cardNode = cardTemplate.cloneNode(true);

  cardNode.querySelector('.popup__title').textContent = title;
  cardNode.querySelector('.popup__text--address').textContent = address;
  cardNode.querySelector('.popup__text--price').textContent = `${price} ₽/ночь`;
  cardNode.querySelector('.popup__type').textContent = offerTypesMapper[type];
  cardNode.querySelector('.popup__text--capacity').textContent = `${rooms} комнаты для ${guests} гостей`;
  cardNode.querySelector('.popup__text--time').textContent = `Заезд после ${checkin}, выезд до ${checkout}`;

  const featuresContainer = cardNode.querySelector('.popup__features');
  if (features) {
    const featureNodes = featuresContainer.querySelectorAll('.popup__feature');
  
    featureNodes.forEach((featureNode) => {
      const isExistFeature = features.some((feature) => featureNode.classList.contains(`popup__feature--${feature}`));
      if (!isExistFeature) {
        featureNode.remove();
      }
    });
  } else {
    featuresContainer.innerHTML = '';
  }
  
  if (description) {
    cardNode.querySelector('.popup__description').textContent = description;
  } else {
    cardNode.querySelector('.popup__description').classList.add('visually-hidden');
  }

  const photosContainer = cardNode.querySelector('.popup__photos');
  const photoTemplate = photosContainer.querySelector('.popup__photo');
  const photosFragment = document.createDocumentFragment();
  photosContainer.innerHTML = '';

  if (photos) {
    photos.forEach((photo) => {
      const photoNode = photoTemplate.cloneNode(true);
  
      photoNode.src = photo;
      photosFragment.appendChild(photoNode);
    });
    photosContainer.appendChild(photosFragment);
  }

  cardNode.querySelector('.popup__avatar').src = author.avatar;

  return cardNode;
};

export {renderCard};
