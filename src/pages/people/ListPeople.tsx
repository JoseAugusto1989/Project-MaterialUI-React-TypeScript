import {
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
import { useSearchParams } from 'react-router-dom';

import { ListTools } from '../../shared/components';
import { Environment } from '../../shared/environments';
import { useDebounce } from '../../shared/hooks';
import LayoutPageBase from '../../shared/layouts/LayoutPageBase';
import { IPersonList, PeopleService } from '../../shared/services/api/people/PeopleService';

export const ListPeople: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { debounce } = useDebounce(3000, false);

  const [rows, setRows] = useState<IPersonList[]>([]);
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
      PeopleService.getAll(page, search).then((result) => {
        setIsLoading(false);
        console.log('TESTING', result);

        if (result instanceof Error) {
          alert(result.message);
        } else {
          console.log(result);

          setTotalCount(result.totalCount);
          setRows(result.data);
        }
      });
    });
  }, [search, page]);

  return (
    <LayoutPageBase
      title="Listagem de pessoas"
      toolbar={
        <ListTools
          showSearchInput
          newButtonText="Nova"
          searchText={search}
          changeSearchText={text =>
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
              <TableCell>Identificação</TableCell>
              <TableCell>Ações</TableCell>
              <TableCell>Nome completo</TableCell>
              <TableCell>Email</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {rows.map((row) => (
              <TableRow key={row.id}>
                <TableCell>{row.id}</TableCell>
                <TableCell>Ações</TableCell>
                <TableCell>{row.completeName}</TableCell>
                <TableCell>{row.email}</TableCell>
              </TableRow>
            ))}
          </TableBody>

          {totalCount === 0 && !isLoading && (
            <caption>{Environment.EMPTY_LIST}</caption>
          )}

          <TableFooter>
            {(totalCount > 0 && totalCount > Environment.LIMIT_OF_LINES) && (
              <TableRow>
                <TableCell colSpan={4}>
                  <Pagination 
                    page={page}
                    onChange={(_, newPage) => setSearchParams({ search, page: newPage.toString() }, { replace: true })}
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
  );
};
