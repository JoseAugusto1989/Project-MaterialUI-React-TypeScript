import { Environment } from '../../../environments';
import { API } from '../axios-config';
import { Pageable } from '../../../../models/index';
import axios from 'axios';

export type IProductList = {
  id: number;
  name: string;
  salePrice: number;
  purchasePrice: number;
  gain: number;
  quantityInStock: number;
  addedAmount: number;
  provider: string;
};

export type TTotalCountProduct = {
  data: Pageable<IProductList>;
  totalCount: number;
};

const getAllProducts = async (page: number, size: number) => {
  try {
    const response = await axios.get(`/product/getAllProduct?page=${page}&size=${size}`);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

const getAll = async (
  page = 1,
  filter = ''
): Promise<TTotalCountProduct | Error> => {
  try {
    const urlRelative = `/product/getAllProduct?_page=${page}&_limit=${Environment.LIMIT_OF_LINES}&name=${filter}`;
    const { data, headers } = await API().get(urlRelative);

    if (data) {
      return {
        data,
        totalCount: Number(
          headers['x-total-count'] || Environment.LIMIT_OF_LINES
        ),
      };
    }
    return new Error('Erro ao listar os registros!');
  } catch (error) {
    return new Error(
      (error as { message: string }).message || 'Erro ao listar os registros!'
    );
  }
};

const getById = async (id: number): Promise<TTotalCountProduct | Error> => {
  try {
    const { data } = await API().get(`/product/${id}`);

    if (data) {
      return data;
    }

    return new Error('Erro as consultar o registro');
  } catch (error) {
    console.error(error);
    return new Error((error as { message: string }).message || 'Erro ao criar o registro');
  }
};

const create = async (dados: Omit<IProductList, 'id'>): Promise<number | Error> => {
  try {
    const { data } = await API().post<IProductList>('/product/addProduct', dados);
    
    if (data) {
      return data.id;
    }
    return new Error('Erro ao criar o registro!');
    
  } catch (error) {
    console.error(error);
    return new Error((error as { message: string }).message || 'Erro ao criar o registro!');
  }
};

const updateById = async (id: number, dados: IProductList): Promise<void | Error> => {
  try {
    await API().put(`/product/${id}`, dados);
   
  } catch (error) {
    console.error(error);
    return new Error((error as { message: string }).message || 'Erro ao atualizar o registro!');
  }
};


const deleteById = async (id: number): Promise<void | Error> => {
  try {
    await API().delete(`/product/${id}`);

  } catch (error) {
    console.error(error);
    return new Error((error as { message: string }).message || 'Erro ao apagar o produto');
  }
};

export const ProductService = {
  getAll,
  getAllProducts,
  getById,
  deleteById,
  create,
  updateById
};
