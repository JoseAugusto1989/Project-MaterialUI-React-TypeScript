import { IProduct } from '../../../../interfaces';
import httpClient from '../../http-common';
import queryHelpers from '../axios-config/helpers/queryHelpers';

const endpoint = 'product';

const ProductService = {

  getAll: (filters?: any) => {
    return httpClient.get(`/${endpoint}/getAllProduct?${queryHelpers(filters)}`);
  },

  get: (id: number) => {
    return httpClient.get(`/${endpoint}/${id}`);
  },

  create: (data: IProduct) => {
    return httpClient.post(`/${endpoint}/addProduct`, data);
  },
  // TODO: verificar os updates do projeto se esta passando só o id
  update: (data: IProduct) => {
    return httpClient.put(`/${endpoint}/updateProduct`, data);
  },

  delete: (id: number) => {
    return httpClient.delete(`/${endpoint}/${id}`);
  },
};

export default ProductService;