const getRandomInteger = (a, b) => {
  const min = Math.min(Math.abs(a), Math.abs(b));
  const max = Math.max(Math.abs(a), Math.abs(b));

  return Math.floor(Math.random() * (max - min + 1) + min);
};

const addLeadingZero = (num) => num < 10 ? `0${num}` : String(num);

const getRandomElement = (list) => list[getRandomInteger(0, list.length - 1)];
const getRandomSentence = (str) => {
  const arr = str.split('\n').map((sentence) => sentence.trim());
  return getRandomElement(arr);
};

const getRandomElements = (sourceArray, maxAmount) => {
  const newArray = [];
  const indexes = Array.from({length: sourceArray.length}, (_, index) => index);
  const maxElementsCount = getRandomInteger(0, typeof maxAmount === 'number' ? maxAmount : sourceArray.length - 1);
  
  for (let i = 0; i < maxElementsCount; i++) {
    let randomIndex = getRandomInteger(0, indexes.length - 1);
    const randomIndexPosition = indexes.findIndex((ind) => ind === randomIndex);
    newArray.push(sourceArray[randomIndex]);
    indexes.splice(randomIndexPosition, 1);
  }

  return newArray;
};
const getRandomSentences = (str, maxAmount) => {
  const arr = str.split('\n').map((sentence) => sentence.trim());
  const sentences = getRandomElements(arr, maxAmount);

  return sentences.join('\n');
};

const createIdGenerator = (rangeA, rangeB) => {
  const previousValues = [];

  return () => {
    let currentValue = 0;
    if (previousValues.length >= (rangeB - rangeA + 1)) {
      console.error('Перебраны все числа из диапазона от ' + rangeA + ' до ' + rangeB);
      return null;
    }
    
    do {
      currentValue = getRandomInteger(rangeA, rangeB);
    } while (previousValues.includes(currentValue));

    previousValues.push(currentValue);
    return currentValue;
  };
};

export {getRandomInteger, getRandomElement, getRandomSentence, createIdGenerator, getRandomElements, getRandomSentences, addLeadingZero};
