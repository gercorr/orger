

const url = 'https://t2tvcbhzz3.execute-api.eu-west-1.amazonaws.com/Prod/orders';

const handleErrors = async (response) => {
  if(!response.ok) {
    const errorPayload = await response.json();
    throw errorPayload;
  }
  return response;
}
export default {

    get: (query) => {
      const queryUrl = query ? url+query : url;
      return fetch(
        queryUrl,
        {
          mode: 'cors'
        }
      ).then(handleErrors);
    },
    put: (body) => {
      return fetch(
        url,
        {
          method:'PUT',
          body: JSON.stringify(body),
          mode: 'cors'
        }
      ).then(handleErrors);
    },
    delete: (query) => {
      const queryUrl = query ? url+query : url;
      return fetch(
        queryUrl,
        {
          method:'DELETE',
          mode: 'cors'
        }
      ).then(handleErrors);
    }

}

