import {
  Icon,
  IconButton,
  LinearProgress,
  Pagination,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableFooter,
  TableHead,
  TableRow,
} from '@mui/material';
import { useEffect, useMemo, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

import { ListTools } from '../../shared/components';
import LateralMenu from '../../shared/components/lateral-menu/LateralMenu';
import { Environment } from '../../shared/environments';
import { useDebounce } from '../../shared/hooks';
import LayoutPageBase from '../../shared/layouts/LayoutPageBase';
import { CustomerServiceJsonServer, ICustomerList } from '../../shared/services/api/customer/CustomerServiceJsonServer';
import { PeopleService } from '../../shared/services/api/people/PeopleServiceExample';
import usePagination from './helpers/Pagination';

export const ListCustomer: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { debounce } = useDebounce(3000, false);
  const navigate = useNavigate();

  const [page, setPage] = useState(1);
  const [rows, setRows] = useState<ICustomerList[]>([]);
  const _DATA = usePagination(rows, Environment.LIMIT_OF_LINES);
  const [totalCount, setTotalCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  const handleChange = (e: any, p: number) => {
    setPage(p);
    _DATA.jump(p);
  };

  const search = useMemo(() => {
    return searchParams.get('search') || '';
  }, [searchParams]);

  // const page = useMemo(() => {
  //   return Number(searchParams.get('page') || '1');
  // }, [searchParams]);

  useEffect(() => {
    setIsLoading(true);

    debounce(() => {
      CustomerServiceJsonServer.getAll(page, search).then((result) => {
        setIsLoading(false);
        console.log(result);
        console.log(rows);

        if (result instanceof Error) {
          alert(result.message);
        } else {
          setTotalCount(result.totalCount);
          setRows(result.data);
        }
      });
    });
  }, [search, page]);

  const handleDelete = (id: number) => {
    if (confirm('Realmente deseja apagar?')) {
      PeopleService.deleteById(id).then((result) => {
        if (result instanceof Error) {
          alert(result.message);
        } else {
          setRows((oldRows) => [
            ...oldRows.filter((oldRow) => oldRow.id !== id),
          ]);
          alert('Registro apagado com sucesso!');
        }
      });
    }
  };

  return (
    <LateralMenu>
      <LayoutPageBase
        title="Listagem de Clientes"
        toolbar={
          <ListTools
            showSearchInput
            newButtonText="Novo"
            searchText={search}
            clickInNew={() => navigate('/customer/details/new')}
            changeSearchText={(text) =>
              setSearchParams({ search: text }, { replace: true })
            }
          />
        }
      >
        <TableContainer
          component={Paper}
          variant="outlined"
          sx={{ m: 3, width: 'auto' }}
        >
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Nome</TableCell>
                <TableCell>Sobrenome</TableCell>
                <TableCell>CPF / CNPJ</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Telefone</TableCell>
                <TableCell>Ações</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {rows?.map((row) => (
                <TableRow key={row.id}>
                  <TableCell>{row.name}</TableCell>
                  <TableCell>{row.lastName}</TableCell>
                  <TableCell>{row.cpf}</TableCell>
                  <TableCell>{row.email}</TableCell>
                  <TableCell>{row.phone}</TableCell>
                  <TableCell>
                    <IconButton
                      size="small"
                      onClick={() => handleDelete(row.id)}
                    >
                      <Icon>delete</Icon>
                    </IconButton>
                    <IconButton
                      size="small"
                      onClick={() => navigate(`/customer/details/${row.id}`)}
                    >
                      <Icon>edit</Icon>
                    </IconButton>

                    <IconButton 
                      size='small'
                      // onClick={}
                    >
                      <Icon>message</Icon>
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>

            {totalCount === 0 && !isLoading && (
              <caption>{Environment.EMPTY_LIST}</caption>
            )}

            <TableFooter>

              {isLoading && (
                <TableRow>
                  <TableCell colSpan={6}>
                    <LinearProgress variant="indeterminate" />
                  </TableCell>
                </TableRow>
              )}

              {totalCount > 0 && totalCount > Environment.LIMIT_OF_LINES && (
                <TableRow>
                  <TableCell colSpan={6}>
                    <Pagination
                      page={page}
                      size='large'
                      variant='text'
                      shape='rounded'
                      onChange={handleChange}
                      count={Math.ceil(totalCount / Environment.LIMIT_OF_LINES)}
                    />
                    <LinearProgress variant="indeterminate" />
                  </TableCell>
                </TableRow>
              )}
            </TableFooter>
          </Table>
        </TableContainer>
      </LayoutPageBase>
    </LateralMenu>
  );
};
