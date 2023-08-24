const BASE_URL = 'https://29.javascript.pages.academy/keksobooking';
const SERVER_ERROR_MESSAGE = 'Сервер по указанному адресу недоступен';

const requestData = ({method, url, config, data, onSuccess, onError, onStart, onEnd}) => {
  if (typeof onStart === 'function') {
    onStart();
  }
  
  fetch(`${BASE_URL}${url}`, { method, body: data })
    .then((response) => {
      if (!response.ok) {
        throw new Error('Не удалось отправить запрос');
      }
      return response.json();
    })
    .then((data) => {
      if (typeof onSuccess === 'function') {
        try {
          onSuccess(data);
        } catch (err) {
          console.error('success error', err);
        }
      }
    })
    .catch((reason) => {
      if (typeof onError === 'function') {
        const message = reason.name === 'TypeError' ? SERVER_ERROR_MESSAGE : '';
        onError(message);
      }
    })
    .finally(() => {
      if (typeof onEnd === 'function') {
        onEnd();
      }
    });
};

export {requestData};
