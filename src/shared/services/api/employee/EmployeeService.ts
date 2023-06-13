import { IEmployee } from '../../../../interfaces';
import httpClient from '../../http-common';
import queryHelpers from '../axios-config/helpers/queryHelpers';

const endpoint = 'employee';

const EmployeeService = {

  getAll: (filters?: any) => {
    return httpClient.get(`/${endpoint}/getAllEmployee?${queryHelpers(filters)}`);
  },

  getAllList: (list: IEmployee[]) => {
    return httpClient.get(`/${endpoint}/getEmployeeList`, { params: { list } });
  },

  get: (id: number) => {
    return httpClient.get(`/${endpoint}/${id}`);
  },

  create: (data: IEmployee) => {
    return httpClient.post(`/${endpoint}/addEmployee`, data);
  },

  update: (data: IEmployee) => {
    return httpClient.put(`/${endpoint}/updateEmployee`, data);
  },

  delete: (id: number) => {
    return httpClient.delete(`/${endpoint}/${id}`);
  },
};

export default EmployeeService;