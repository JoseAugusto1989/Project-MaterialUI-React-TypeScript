import { Environment } from '../../../environments';
import { API } from '../axios-config';
import { Pageable } from '../../../../models/index';

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

const getAll = async (
  page = 1,
  filter = ''
): Promise<TTotalCountProduct | Error> => {
  try {
    const urlRelative = `/product/getAllProduct?_page=${page}&_limit=${Environment.LIMIT_OF_LINES}&completeName_like=${filter}`;
    const { data, headers } = await API.get(urlRelative);

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
    const { data } = await API.get(`/product/${id}`);

    if (data) {
      return data;
    }

    return new Error('Erro as consultar o registro');
  } catch (error) {
    console.error(error);
    return new Error((error as { message: string }).message || 'Erro ao criar o registro');
  }
};

export const ProductService = {
  getAll,
  getById
};
