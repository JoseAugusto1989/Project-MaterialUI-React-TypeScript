import { Environment } from '../../../environments';
import { API } from '../axios-config';

export interface IDetailCustomer {
    id: number;
    name: string;
    lastName: string;
    email: string;
    phone: string;
    address: string;
    cpf: string;
    occupation: string;
    number: number;
    district: string;
    city: string;
    state: string;
}

export interface ICustomerList  {
    id: number;
    name: string;
    lastName: string;
    email: string;
    phone: string;
    address: string;
    cpf: string;
    occupation: string;
    number: number;
    district: string;
    city: string;
    state: string;
}

export type TCustomerTotalCount = {
    data: ICustomerList[];
    totalCount: number;
}

const getAll = async (
  page = 1, 
  filter = ''
): Promise<TCustomerTotalCount | Error> => {
  try {
    const urlRelative = `/customer?_page=${page}&_limit=${Environment.LIMIT_OF_LINES}&name_like=${filter}`;
    const { data, headers } = await API.get(urlRelative);

    if (data) {
      return {
        data,
        totalCount: Number(
          headers['x-total-count'] || Environment.LIMIT_OF_LINES
        ),
      };
    } 
    return new Error('Erro ao listar os Clientes.');

  } catch (error) {
    console.error(error);
    return new Error( 
      (error as { message: string }).message || 'Erro ao listar os registros!'
    );
  }
};

const getById = async (id: number): Promise<IDetailCustomer | Error> => {
  try {
    const { data } = await API.get(`/customer/${id}`);

    if (data) {
      return data;
    }
    return new Error('Erro ao consultar os clientes!');
    
  } catch (error) {
    console.error(error);
    return new Error( 
      (error as { message: string }).message || 'Erro ao consultar os clientes!'
    );
  }
};

const create = async (_data: Omit<IDetailCustomer, 'id'>): Promise<number | Error> => {
  try {
    const { data } = await API.post<IDetailCustomer>('/customer', _data);
    
    if (data) {
      return data.id;
    }
    return new Error('Erro ao adicionar os clientes!');
        
  } catch (error) {
    console.error(error);
    return new Error( 
      (error as { message: string }).message || 'Erro ao adicionar os clientes!'
    );
  }
};

const updateById = async (id: number, _data: IDetailCustomer): Promise<void | Error> => {
  try {
    await API.put(`/customer/${id}`, _data);
            
  } catch (error) {
    console.error(error);
    return new Error( 
      (error as { message: string }).message || 'Erro ao atualizar os clientes!'
    );
  }
};

const deleteById = async (id: number): Promise<void | Error> => {
  try {
    await API.delete(`/customer/${id}`);
                
  } catch (error) {
    console.error(error);
    return new Error( 
      (error as { message: string }).message || 'Erro ao deletar os clientes!'
    );
  }
};

export const CustomerServiceJsonServer = {
  getAll,
  getById,
  create,
  updateById,
  deleteById
};