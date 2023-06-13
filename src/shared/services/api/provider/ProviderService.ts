import { IEmailProvider, IProvider } from '../../../../interfaces';
import httpClient from '../../http-common';
import queryHelpers from '../axios-config/helpers/queryHelpers';

const endpoint = 'provider';

const ProviderService = {

  getAll: (filters?: any) => {
    return httpClient.get(`/${endpoint}/getAllProvider?${queryHelpers(filters)}`);
  },

  get: (id: number) => {
    return httpClient.get(`/${endpoint}/${id}`);
  },

  create: (data: IProvider) => {
    return httpClient.post(`/${endpoint}/addProvider`, data);
  },

  createEmail: (data: IEmailProvider) => {
    return httpClient.post(`/${endpoint}/addEmailProvider`, data);
  },

  sendEmailProvider: (data: IEmailProvider) => {
    return httpClient.post(`/${endpoint}/sendEmailProvider`, data);
  },

  update: (data: IProvider) => {
    return httpClient.put(`/${endpoint}/updateProvider`, data);
  },

  delete: (id: number) => {
    return httpClient.delete(`/${endpoint}/${id}`);
  },
};

export default ProviderService;