/* eslint-disable no-empty */
import { Icon, IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { useEffect, useMemo, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

import { IEmployee } from '../../interfaces';
import { ListTools } from '../../shared/components';
import LateralMenu from '../../shared/components/lateral-menu/LateralMenu';
import { useDebounce } from '../../shared/hooks';
import LayoutPageBase from '../../shared/layouts/LayoutPageBase';
import EmployeeService from '../../shared/services/api/employee/EmployeeService';

export const ListEmployee: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { debounce } = useDebounce(3000, false);
  const navigate = useNavigate();
    
  const [rows, setRows] = useState<IEmployee[]>([]);
  const [totalCount, setTotalCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [size, setSize] = useState(26);
    
  const search = useMemo(() => {
    return searchParams.get('search') || '';
  }, [searchParams]);
    
  const page = useMemo(() => {
    return Number(searchParams.get('page') || '0');
  }, [searchParams]);
    
  useEffect(() => {
    init();
  }, [page, size]);

  const init = () => {
    const filters = { size, page };
    setIsLoading(true);
    EmployeeService.getAll(filters)
      .then((res) => {
        setRows(res.data.content);
        setIsLoading(false);
      })
      .catch((error) => {
        setIsLoading(false);
      });
  };

  const handleDelete = (id: number) => {
    if (confirm('Realmente deseja apagar?')) {
      EmployeeService.delete(id)
        .then((result) => {
          if (result instanceof Error) {

          } else {
            setRows((oldRows) => [
              ...oldRows.filter((oldRow) => oldRow.id !== id)
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
            // showSearchInput
            newButtonText="Novo"
            searchText={search}
            clickInNew={() => navigate('/employee/details/new')}
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
                <TableCell>Email</TableCell>
                <TableCell>Telefone</TableCell>
                <TableCell>Função</TableCell>
                <TableCell>Salario</TableCell>
                <TableCell>Data de inicio</TableCell>
                <TableCell>Ações</TableCell>
              </TableRow>
            </TableHead>
    
            <TableBody>
              {rows?.map((row) => (
                <TableRow key={row.id}>
                  <TableCell>{row.name}</TableCell>
                  <TableCell>{row.email}</TableCell>
                  <TableCell>{row.phone}</TableCell>
                  <TableCell>{row.job}</TableCell>
                  <TableCell>R$ {row.salary.toFixed(2)}</TableCell>
                  <TableCell>{new Date(row.initialDate).toLocaleDateString()}</TableCell>
                  <TableCell>
                    <IconButton
                      size="small"
                      onClick={() => handleDelete(row.id)}
                    >
                      <Icon>delete</Icon>
                    </IconButton>

                    <IconButton
                      size="small"
                      onClick={() => navigate(`/employee/details/${row.id}`)}
                    >
                      <Icon>edit</Icon>
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </LayoutPageBase>
    </LateralMenu>
  );
};