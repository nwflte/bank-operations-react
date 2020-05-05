import axios from 'axios';
import KeycloakService from 'keycloak';

const instance = axios.create();

export const configureAxiosHandler = () => {
  requestInterceptor();
};

export const requestInterceptor = () => {
  instance.interceptors.request.use(
    config => {
      config.baseURL = 'http://localhost:8081/';
      config.headers['Accept'] = 'application/json;charset=UTF-8';
      config.headers['Content-Type'] = 'application/json;charset=UTF-8';
      config.headers['Authorization'] = `Bearer ${KeycloakService.getToken()}`;

      return config;
    },
    error => {
      console.debug('axios request interceptor error', error);
      return Promise.reject(error);
    }
  );
};

export default instance;
