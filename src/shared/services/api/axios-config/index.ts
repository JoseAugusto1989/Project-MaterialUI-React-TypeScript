import axios from 'axios';

import { Environment } from './../../../environments';
import { errorInterceptor } from './interceptors/errorInterceptor';
import { responseInterceptor } from './interceptors/responseInterceptor';

export const API = () => {
  const api = axios.create({
    baseURL: Environment.URL_BASE,
    headers: {
      authorization: `Bearer ${JSON.parse(localStorage.getItem('APP_ACCESS_TOKEN') || '""')}`
    }
  });

  api.interceptors.response.use(
    (response) => responseInterceptor(response),
    (error) => errorInterceptor(error),
  );
  return api;
};