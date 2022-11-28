import {
  LinearProgress,
  Icon,
  IconButton,
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
import { Environment } from '../../shared/environments';
import { useDebounce } from '../../shared/hooks';
import LayoutPageBase from '../../shared/layouts/LayoutPageBase';
import { PeopleService } from '../../shared/services/api/people/PeopleServiceExample';
import {
  IProductList,
  ProductService,
  TTotalCountProduct,
} from '../../shared/services/api/people/ProductService';
import ProductServiceE from '../../shared/services/api/people/ProductServiceExemple';

type TProductList = {
  id: number;
  name: string;
  salePrice: number;
  purchasePrice: number;
  gain: number;
  quantityInStock: number;
  addedAmount: number;
  provider: string;
};

export const ListPeople: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { debounce } = useDebounce(3000, false);
  const navigate = useNavigate();

  const [rows, setRows] = useState<TProductList[]>([]);
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
      ProductService.getAll(page, search).then((result) => {
        setIsLoading(false);
        console.log('TESTING', result);
        console.log(rows);

        if (result instanceof Error) {
          alert(result.message);
        } else {
          setTotalCount(result.totalCount);
          setRows(result.data.content);
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
    <LayoutPageBase
      title="Listagem de pessoas"
      toolbar={
        <ListTools
          showSearchInput
          newButtonText="Nova"
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
              <TableCell>Nome Produto</TableCell>
              <TableCell>Qtd. Estoque</TableCell>
              <TableCell>Preço de venda</TableCell>
              <TableCell>Fornecedor</TableCell>
              <TableCell>Lucro por peça</TableCell>
              <TableCell>Ações</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {rows?.map((row) => (
              <TableRow key={row.id}>
                <TableCell>{row.name}</TableCell>
                <TableCell>{row.quantityInStock}</TableCell>
                <TableCell>R$ {row.salePrice}</TableCell>
                <TableCell>{row.provider}</TableCell>
                <TableCell>R$ {row.gain}</TableCell>
                <TableCell>
                  <IconButton size="small" onClick={() => handleDelete(row.id)}>
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
  );
};
