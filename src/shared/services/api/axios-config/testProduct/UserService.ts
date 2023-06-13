import { IUsers } from '../../../../../interfaces';
import { Api } from './api';


const sendUser = (data: IUsers) => Api.post('/users/addUser', data);

const getAllUser = () => Api.get<IUsers[]>('/users/getAllUsers');

const updateUser = (id: number, data: IUsers) => Api.put(`/users/${id}`, data); 

const getById = (id: number) => Api.get(`/users/${id}`); 

const getLogin = (email: string, password: string) => Api.post(
  '/users/login', 
  { params: { email, password }},
);

export const UsersServices = {
  sendUser,
  getAllUser,
  updateUser,
  getLogin,
  getById
};

