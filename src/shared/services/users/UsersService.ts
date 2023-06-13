import { API } from '../api/axios-config';
import { Environment } from './../../environments/index';

export interface IUsers {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  active: boolean;
  // TODO: Cargo
  role: string;
}

export type TUsers = {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  active: boolean;
  role: string;
}

export type TUsersTotalCount = {
  data: IUsers[];
  totalCount: number;
}

const getAll = async (
  page = 1,
  filter: ''
): Promise<TUsersTotalCount | Error> => {
  try {
    const urlRelative = `users?_page=${page}&_limit=${Environment.LIMIT_OF_LINES}&name_like=${filter}`;
    const { data, headers } = await API().get(urlRelative);

    if (data) {
      return {
        data,
        totalCount: Number(
          headers['x-total-count'] || Environment.LIMIT_OF_LINES
        ),
      };
    }
    return new Error('Erro ao listar os Usuarios');
    
  } catch (error) {
    console.log(error);
    return new Error(
      (error as { message: string }).message || 'Erro ao listar os Usuarios'
    );
  }
};

const getById = async (id: number): Promise<IUsers | Error> => {
  try {
    const { data } = await API().get(`/users/${id}`);

    if (data) {
      return data;
    }
    return new Error('Erro ao consultar os usuarios');

  } catch (error) {
    console.error(error);
    return new Error( 
      (error as { message: string }).message || 'Erro ao criar usuarios!'
    );
  }
};

const create = async (_data: Omit<IUsers, 'id'>): Promise<number | Error> => {
  try {
    const { data } = await API().post<IUsers>('/users', _data);

    if (data) {
      return data.id;
    }
    return new Error('Erro ao criar usuario!');

  } catch (error) {
    console.log(error);
    return new Error(
      (error as { message: string }).message || 'Erro ao criar usuários'
    );
  }
};

const updateById = async (id: number, _data: IUsers): Promise<void | Error> => {
  try {
    await API().put(`/users/${id}`, _data);
                
  } catch (error) {
    console.error(error);
    return new Error( 
      (error as { message: string }).message || 'Erro ao atualizar os usuários!'
    );
  }
};
    
const deleteById = async (id: number): Promise<void | Error> => {
  try {
    await API().delete(`/users/${id}`);
                    
  } catch (error) {
    console.error(error);
    return new Error( 
      (error as { message: string }).message || 'Erro ao deletar o usuário!'
    );
  }
};

export const UserService = {
  getAll,
  getById,
  deleteById,
  create,
  updateById,
};