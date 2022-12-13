import { Pageable } from '../../../../models';
import { Environment } from '../../../environments';
import { API } from '../axios-config';

export type TCustomerList = {
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
};

export type TTotalCountCustomer = {
  data: Pageable<TCustomerList>;
  totalCount: number;
};

const getAll = async (
  page = 1,
  filter = ''
): Promise<TTotalCountCustomer | Error> => {
  try {
    const urlRelative = `/customer/getAllCustomer?_page=${page}&_limit=${Environment.LIMIT_OF_LINES}&completeName_like=${filter}`;
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

export const CustomerService = {
  getAll,
};
