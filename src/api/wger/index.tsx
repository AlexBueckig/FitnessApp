import privateApi from './private/';
import publicApi from './public/';

export const getCSRFToken = () => {
  return fetch('https://wger.de/de/dashboard');
};

const wger = {
  public: publicApi,
  private: privateApi
};

export default wger;
