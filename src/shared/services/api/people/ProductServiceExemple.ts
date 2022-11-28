import httpClient from './http-common';
import queryHelpers from '../axios-config/helpers/queryHelpers';

const endpoint = 'product';

const ProductServiceE = {
  getAll: (filters: any) => {
    return httpClient.get(`/${endpoint}/getAllProduct?${queryHelpers(filters)}`);
  },

  get: (id: number) => {
    return httpClient.get(`/${endpoint}/${id}`);
  },

  create: (data: any) => {
    return httpClient.post(`/${endpoint}/addPeople`, data);
  },

  update: (data: any) => {
    return httpClient.put(`/${endpoint}/$`, data);
  },

  remove: (id: number) => {
    return httpClient.delete(`/${endpoint}/${id}`);
  },
};

export default ProductServiceE;