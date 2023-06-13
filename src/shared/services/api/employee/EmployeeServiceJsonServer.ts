import { IEmployee } from '../../../../interfaces';
import { Environment } from '../../../environments';
import { API } from '../axios-config';

export interface IEmployeeTotalCount {
    data: IEmployee[];
    totalCount: number;
}

const getAll = async (
  page = 0, 
  filter = '',
  id = '',
): Promise<IEmployeeTotalCount | Error> => {
  try {
    const urlRelative = `/employee?_page=${page}&_limit=${Environment.LIMIT_OF_LINES}&nome_like=${filter}&id_like=${id}`;
    const { data, headers } = await API().get(urlRelative);

    console.log(data);

    if (data) {
      return {
        data,
        totalCount: Number(headers['x-total-count'] || Environment.LIMIT_OF_LINES),
      };
    } 
    return new Error('Erro ao listar os Funcionarios.');

  } catch (error) {
    console.error(error);
    return new Error( 
      (error as { message: string }).message || 'Erro ao listar os Funcionarios!'
    );
  }
};

const getById = async (id: number): Promise<IEmployee | Error> => {
  try {
    const { data } = await API().get(`/employee/${id}`);

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

const create = async (_data: Omit<IEmployee, 'id'>): Promise<number | Error> => {
  try {
    // conta do ganho ja usado no backend java
    // _data.gain = _data.salePrice - _data.purchasePrice;

    const { data } = await API().post<IEmployee>('/employee', _data);

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

const updateById = async (id: number, _data: IEmployee): Promise<void | Error> => {
  try {
    await API().put(`/employee/${id}`, _data);
            
  } catch (error) {
    console.error(error);
    return new Error( 
      (error as { message: string }).message || 'Erro ao atualizar os funcionários!'
    );
  }
};

const deleteById = async (id: number): Promise<void | Error> => {
  try {
    await API().delete(`/employee/${id}`);
                
  } catch (error) {
    console.error(error);
    return new Error( 
      (error as { message: string }).message || 'Erro ao deletar os funcionários!'
    );
  }
};

export const EmployeeServiceJsonServer = {
  getAll,
  getById,
  create,
  updateById,
  deleteById
};