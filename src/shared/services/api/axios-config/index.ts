import axios from 'axios';

import { Environment } from './../../../environments';
import { errorInterceptor } from './interceptors/errorInterceptor';
import { responseInterceptor } from './interceptors/responseInterceptor';

const API = axios.create({
  baseURL: Environment.URL_BASE,
});

API.interceptors.response.use(
  (response) => responseInterceptor(response),
  (error) => errorInterceptor(error),
);

export { API };