export const apiKey = 'e5aa8133f5d33a1a320b10f8b30b0f4333ce7b69';

const headers = {
  Authorization: 'Token ' + apiKey,
  Accept: 'application/json'
};

export const postOptions = (body: IPostParams) => ({
  method: 'POST',
  headers,
  body: JSON.stringify(body)
});

export const getOptions = () => ({
  headers
});

export const url = 'https://wger.de/';
export const apiUrl = url + 'api/v2/';
