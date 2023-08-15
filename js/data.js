import {getRandomInteger, getRandomElement, getRandomSentence, createIdGenerator, getRandomElements, getRandomSentences, addLeadingZero} from "./util.js";

const ADS_COUNT = 10;
const MIN_LAT = 3565000;
const MAX_LAT = 3570000;
const MIN_LNG = 13970000;
const MAX_LNG = 13980000;
const LAT_LNG_DEMULTIPLIER = 100000;

const rawTitles = ['Гостиница', 'Мотель', 'Бунгало', 'Ночлежка', 'Придорожная лавка', 'Чё-то где-то в лесу', 'Палатка в поле'];
const rawTypes = ['palace', 'flat', 'house', 'bungalo', 'hotel'];
const rawRoomsCounts = [1, 2, 3, 100];
const rawGuestsCounts = [1, 2, 3, 0];
const rawCheckins = ['12:00', '13:00', '14:00'];
const rawFeatures = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
const rawDescription = `
  Неплохое описание
  Не знал, что написать, поэтому написал вот это
  бывтаыбврплывра
  The most greatest photo I think
  Two can play this game
  Ya manal, cho zdes nado pisat
`;
const rawPhotos = [
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/duonguyen-8LrGtIxxa4w.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/brandon-hoogenboom-SNxQGWxZQi0.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/claire-rendall-b6kAwr1i0Iw.jpg',
]

const generateAdId = createIdGenerator(1, 10);

const generateAds = () => {
  const generatedAds = [];
  
  for (let i = 1; i <= ADS_COUNT; i++) {
    const location = {
      lat: getRandomInteger(MIN_LAT, MAX_LAT) / LAT_LNG_DEMULTIPLIER,
      lng: getRandomInteger(MIN_LNG, MAX_LNG) / LAT_LNG_DEMULTIPLIER,
    }
    
    generatedAds.push({
      id: generateAdId(),
      author: {
        avatar: `img/avatars/user${addLeadingZero(getRandomInteger(1, 10))}.png`,
      },
      offer: {
        title: getRandomElement(rawTitles),
        address: location,
        price: getRandomInteger(100, 100000),
        type: getRandomElement(rawTypes),
        rooms: getRandomElement(rawRoomsCounts),
        guests: getRandomElement(rawGuestsCounts),
        checkin: getRandomElement(rawCheckins),
        checkout: getRandomElement(rawCheckins),
        features: getRandomElements(rawFeatures),
        description: getRandomSentence(rawDescription),
        photos: getRandomElements(rawPhotos),
      },
      location: location,
    });
  }

  return generatedAds;
};

const ads = generateAds();

export {ads};
