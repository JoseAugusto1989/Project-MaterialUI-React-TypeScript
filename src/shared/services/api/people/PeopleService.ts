import { Environment } from './../../../environments/index';
import { API } from '../axios-config';

export interface IPersonList {
    id: number;
    completeName: string;
    email: string;
    cidadeId: number;
}

export interface IPersonDetail {
    id: number;
    completeName: string;
    email: string;
    cidadeId: number;
}

type TTotalCountPerson = {
    data: IPersonList[];
    totalCount: number;
}

const getAll = async (page = 1, filter = ''): Promise<TTotalCountPerson | Error> => {
  try {
    const urlRelative = `/people?_page=${page}&_limit=${Environment.LIMIT_OF_LINES}&completeName_like=${filter}`;
    const { data, headers } = await API.get(urlRelative);
    console.log('data', data, headers);
    if (data) {
      return {
        data,
        totalCount: Number(headers['x-total-count'] || Environment.LIMIT_OF_LINES),
      };
    } 
    return new Error('Erro ao listar os registros!');

  } catch (error) {
    console.log(error, 'erro');
    return new Error((error as { message: string }).message || 'Erro ao listar os registros!');
 
  }
};

const getById = async (id: number): Promise<IPersonDetail | Error> => {
  try {
    const { data } = await API.get(`/people/${id}`);

    if (data) {
      return data;
    }
    return new Error('Erro ao consultar o registro!');

  } catch (error) {
    console.error(error);
    return new Error((error as { message: string }).message || 'Erro ao consultar o registro!');
  }
};

const create = async (dados: Omit<IPersonDetail, 'id'>): Promise<number | Error> => {
  try {
    const { data } = await API.post<IPersonDetail>('/people', dados);
    
    if (data) {
      return data.id;
    }
    return new Error('Erro ao criar o registro!');
    
  } catch (error) {
    console.error(error);
    return new Error((error as { message: string }).message || 'Erro ao criar o registro!');
  }
};

const updateById = async (id: number, dados: IPersonDetail): Promise<void | Error> => {
  try {
    await API.put(`/people/${id}`, dados);
   
  } catch (error) {
    console.error(error);
    return new Error((error as { message: string }).message || 'Erro ao atualizar o registro!');
  }
};

const deleteById = async (id: number): Promise<void | Error> => {
  try {
    await API.delete(`/people/${id}`);
       
  } catch (error) {
    console.error(error);
    return new Error((error as { message: string }).message || 'Erro ao apagar o registro!');
  }
};

export const PeopleService = {
  getAll,
  getById,
  create,
  updateById,
  deleteById
};