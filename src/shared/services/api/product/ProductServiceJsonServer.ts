import { Environment } from '../../../environments';
import { API } from '../axios-config';

export interface IDetailProduct {
    id: number;
    name: string;
    salePrice: number;
    purchasePrice: number;
    gain: number;
    quantityInStock: number;
    addedAmount: number;
    // TODO: transformar em Objeto 'Provider'
    provider: string;
}

export interface IProductList {
    id: number;
    name: string;
    salePrice: number;
    purchasePrice: number;
    gain: number;
    quantityInStock: number;
    addedAmount: number;
    // TODO: transformar em Objeto 'Provider'
    provider: string;
}

export type TProductTotalCount = {
    data: IProductList[];
    totalCount: number;
}

const getAll = async (
  page = 1, 
  filter = ''
): Promise<TProductTotalCount | Error> => {
  try {
    const urlRelative = `/product?_page=${page}&_limit=${Environment.LIMIT_OF_LINES}&name_like=${filter}`;
    const { data, headers } = await API.get(urlRelative);

    console.log(data);

    if (data) {
      return {
        data,
        totalCount: Number(
          headers['x-total-count'] || Environment.LIMIT_OF_LINES
        ),
      };
    } 
    return new Error('Erro ao listar os Produtos.');

  } catch (error) {
    console.error(error);
    return new Error( 
      (error as { message: string }).message || 'Erro ao listar os registros!'
    );
  }
};

const getById = async (id: number): Promise<IDetailProduct | Error> => {
  try {
    const { data } = await API.get(`/product/${id}`);

    if (data) {
      return data;
    }
    return new Error('Erro ao consultar os produtos!');
    
  } catch (error) {
    console.error(error);
    return new Error( 
      (error as { message: string }).message || 'Erro ao consultar os produtos!'
    );
  }
};

const create = async (_data: Omit<IDetailProduct, 'id'>): Promise<number | Error> => {
  try {
    const { data } = await API.post<IDetailProduct>('/product', _data);
    
    if (data) {
      return data.id;
    }
    return new Error('Erro ao criar os produtos!');
        
  } catch (error) {
    console.error(error);
    return new Error( 
      (error as { message: string }).message || 'Erro ao criar os produtos!'
    );
  }
};

const updateById = async (id: number, _data: IDetailProduct): Promise<void | Error> => {
  try {
    await API.put(`/product/${id}`, _data);
            
  } catch (error) {
    console.error(error);
    return new Error( 
      (error as { message: string }).message || 'Erro ao atualizar os produtos!'
    );
  }
};

const deleteById = async (id: number): Promise<void | Error> => {
  try {
    await API.delete(`/product/${id}`);
                
  } catch (error) {
    console.error(error);
    return new Error( 
      (error as { message: string }).message || 'Erro ao deletar os produtos!'
    );
  }
};

export const ProductServiceJsonServer = {
  getAll,
  getById,
  create,
  updateById,
  deleteById
};