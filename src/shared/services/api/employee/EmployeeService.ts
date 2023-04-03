import { Environment } from '../../../environments';
import { API } from '../axios-config';

export interface IEmployeeList {
  id: number,
  name: string,
  // TODO: Adicionar novas variaveis para o objeto Employee
}

export interface IDetailEmployee {
  id: number,
  name: string,
}

export type TEmployeeTotalCount = {
  data: IEmployeeList[];
  totalCount: number;
}

const getAll = async (
  page = 1,
  filter = ''
): Promise<TEmployeeTotalCount | Error> => {
  try {
    const urlRelative = `/employee?_page=${page}&_limit=${Environment.LIMIT_OF_LINES}&name_like=${filter}`;
    const { data, headers } = await API.get(urlRelative);

    if (data) {
      return {
        data,
        totalCount: Number(
          headers['x-total-count'] || Environment.LIMIT_OF_LINES
        ),
      };
    }
    return new Error('Erro ao listar os Funcionários!');

  } catch (error) {
    console.log(error);
    return new Error(
      (error as { message: string }).message || 'Erro ao listar os Funcionários!'
    );
  }
};

const getById = async (id: number): Promise<IDetailEmployee | Error> => {
  try {
    const { data } = await API.get(`/employee/${id}`);
  
    if (data) {
      return data;
    }
    return new Error('Erro ao consultar os funcionários!');
      
  } catch (error) {
    console.error(error);
    return new Error( 
      (error as { message: string }).message || 'Erro ao consultar os funcionários!'
    );
  }
};
  
const create = async (_data: Omit<IDetailEmployee, 'id'>): Promise<number | Error> => {
  try {
    const { data } = await API.post<IDetailEmployee>('/employee', _data);
      
    if (data) {
      return data.id;
    }
    return new Error('Erro ao criar os funcionários!');
          
  } catch (error) {
    console.error(error);
    return new Error( 
      (error as { message: string }).message || 'Erro ao criar os funcionários!'
    );
  }
};
  
const updateById = async (id: number, _data: IDetailEmployee): Promise<void | Error> => {
  try {
    await API.put(`/employee/${id}`, _data);
              
  } catch (error) {
    console.error(error);
    return new Error( 
      (error as { message: string }).message || 'Erro ao atualizar os funcionários!'
    );
  }
};
  
const deleteById = async (id: number): Promise<void | Error> => {
  try {
    await API.delete(`/employee/${id}`);
                  
  } catch (error) {
    console.error(error);
    return new Error( 
      (error as { message: string }).message || 'Erro ao deletar os funcionários!'
    );
  }
};

export const EmployeeService = {
  getAll,
  getById,
  deleteById,
  updateById,
  create
};