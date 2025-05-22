// axiosHelper.ts
import axios from 'axios';
import Cookies from 'js-cookie';
import store from 'src/store';

// Create Axios instance without static values
const axiosInterceptorInstance = axios.create({
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});

axiosInterceptorInstance.interceptors.request.use(
  (config) => {
    // Access Redux store for CommerceBaseURL and ApiKey
    const state = store.getState();
    const { COMMERCE_BASE_URL, API_KEY } = state.nopStoreConfig;

    // Update axios baseURL and API_KEY dynamically from Redux store
    config.baseURL = COMMERCE_BASE_URL;
    config.headers['X-API-KEY'] = API_KEY;

    const accessToken = Cookies.get('.Nop.Authentication');
    const NopCustomerId = Cookies.get('NopCustomerId');
    if (!config.headers['authorization']) {
      if (config.headers && accessToken) {
        config.headers['authorization'] = `Bearer ${accessToken}`;
        config.headers['.Nop.Customer'] = NopCustomerId;
      }
    }

    const https = require('https');
    const agent = new https.Agent({
      rejectUnauthorized: false,
    });
    config.httpsAgent = agent;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
axiosInterceptorInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInterceptorInstance;
