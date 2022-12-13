import { Environment } from '../../../environments';
import { API } from '../axios-config';
import { Pageable } from '../../../../models/index';

export type IProviderList = {
  id: number;
  name: string;
  lastName: string;
  phone: number;
  email: string;
  companyName: string;
  cnpj: string;
};

export type TTotalCountProvider = {
  data: Pageable<IProviderList>;
  totalCount: number;
};

const getAll = async (
  page = 1,
  filter = ''
): Promise<TTotalCountProvider | Error> => {
  try {
    const urlRelative = `/provider/getAllProvider?_page=${page}&_limit=${Environment.LIMIT_OF_LINES}&completeName_like=${filter}`;
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

export const ProviderService = {
  getAll,
};
