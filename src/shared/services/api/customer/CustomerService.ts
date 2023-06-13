import { ICustomer } from '../../../../interfaces';
import httpClient from '../../http-common';
import queryHelpers from '../axios-config/helpers/queryHelpers';

const endpoint = 'customer';

const CustomerService = {

  getAll: (filters?: any) => {
    return httpClient.get(`/${endpoint}/getAllCustomer?${queryHelpers(filters)}`);
  },

  get: (id: number) => {
    return httpClient.get(`/${endpoint}/${id}`);
  },

  create: (data: ICustomer) => {
    return httpClient.post(`/${endpoint}/addCustomer`, data);
  },

  update: (data: ICustomer) => {
    return httpClient.put(`/${endpoint}/updateCustomer`, data);
  },

  delete: (id: number) => {
    return httpClient.delete(`/${endpoint}/${id}`);
  },
};

export default CustomerService;