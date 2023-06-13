import { ISales } from '../../../../interfaces';
import httpClient from '../../http-common';
import queryHelpers from '../axios-config/helpers/queryHelpers';

const endpoint = 'sale';

const SalesService = {

  getAll: (filters?: any) => {
    return httpClient.get(`/${endpoint}/getAllSale?${queryHelpers(filters)}`);
  },

  get: (id: number) => {
    return httpClient.get(`/${endpoint}/${id}`);
  },

  create: (data: ISales) => {
    return httpClient.post(`/${endpoint}/addSale`, data);
  },

  update: (data: ISales) => {
    return httpClient.put(`/${endpoint}/updateSale`, data);
  },

  delete: (id: number) => {
    return httpClient.delete(`/${endpoint}/${id}`);
  },
};

export default SalesService;