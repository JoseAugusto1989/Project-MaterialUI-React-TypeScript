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
import { EmployeeService, IEmployeeList } from '../../shared/services/api/employee/EmployeeService';

export const ListEmployee: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { debounce } = useDebounce(3000, false);
  const navigate = useNavigate();
    
  const [rows, setRows] = useState<IEmployeeList[]>([]);
  const [totalCount, setTotalCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
    
  const search = useMemo(() => {
    return searchParams.get('search') || '';
  }, [searchParams]);
    
  const page = useMemo(() => {
    return Number(searchParams.get('page') || '1');
  }, [searchParams]);
    
  useEffect(() => {
    setIsLoading(true);
    
    debounce(() => {
      EmployeeService.getAll(page, search).then((result) => {
        setIsLoading(false);
        console.log('TESTING', result);
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
      EmployeeService.deleteById(id).then((result) => {
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
        title="Listagem de funcionários"
        toolbar={
          <ListTools
            showSearchInput
            newButtonText="Novo"
            searchText={search}
            clickInNew={() => navigate('/people/details/new')}
            changeSearchText={(text) =>
              setSearchParams({ search: text, page: '1' }, { replace: true })
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
                <TableCell>Telefone</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>CPF</TableCell>
                <TableCell>Ações</TableCell>
              </TableRow>
            </TableHead>
    
            <TableBody>
              {rows?.map((row) => (
                <TableRow key={row.id}>
                  <TableCell>{row.name}</TableCell>
                  <TableCell>
                    <IconButton
                      size="small"
                      onClick={() => handleDelete(row.id)}
                    >
                      <Icon>delete</Icon>
                    </IconButton>
                    <IconButton
                      size="small"
                      onClick={() => navigate(`/people/details/${row.id}`)}
                    >
                      <Icon>edit</Icon>
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
    
            {totalCount === 0 && !isLoading && (
              <caption>{Environment.EMPTY_LIST}</caption>
            )}
    
            <TableFooter>
              {totalCount > 0 && totalCount > Environment.LIMIT_OF_LINES && (
                <TableRow>
                  <TableCell colSpan={4}>
                    <Pagination
                      page={page}
                      onChange={(_, newPage) =>
                        setSearchParams(
                          { search, page: newPage.toString() },
                          { replace: true }
                        )
                      }
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