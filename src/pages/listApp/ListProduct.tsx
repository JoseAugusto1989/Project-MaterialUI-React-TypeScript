/* eslint-disable no-empty */
/* eslint-disable @typescript-eslint/no-empty-function */
import {
  Icon,
  IconButton,
  Modal,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import { useEffect, useMemo, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

import { IProduct } from '../../interfaces';
import { ListTools } from '../../shared/components';
import LateralMenu from '../../shared/components/lateral-menu/LateralMenu';
import { ProductModal } from '../../shared/components/modals/modal/ProductModal';
import { Environment } from '../../shared/environments';
import { useDebounce } from '../../shared/hooks';
import LayoutPageBase from '../../shared/layouts/LayoutPageBase';
import ProductService from '../../shared/services/api/product/ProductService';
import usePagination from './helpers/Pagination';

export const ListProduct: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { debounce } = useDebounce(3000, false);
  const navigate = useNavigate();
  const [totalCount, setTotalCount] = useState(0);

  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState(0);
  const [rows, setRows] = useState<IProduct[]>([]);
  const [size, setSize] = useState(26);

  const [open, setOpen] = useState(false);
  const handleClose = () => setOpen(false);
  
  const count = Math.ceil(totalCount / size);
  const _DATA = usePagination(rows, Environment.LIMIT_OF_LINES);

  const handleChange = (e: any, p: number) => {
    setPage(p);
    _DATA.jump(p);
    init();
  };

  const search = useMemo(() => {
    return searchParams.get('search') || '';
  }, [searchParams]);

  useEffect(() => {
    init();
  }, [page, size]);

  const init = () => {
    const filters = { size, page };
    setIsLoading(true);
    ProductService.getAll(filters)
      .then((res) => {
        console.log('PRODUTOS...', res.data);
        setRows(res.data.content);
        setIsLoading(false);
      })
      .catch((error) => {
        console.log('Erro em produtos: ', error);
        setIsLoading(false);
      });
  };

  const handleDelete = (id: number) => {
    if (confirm('Realmente deseja apagar?')) {
      ProductService.delete(id)
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
        title="Listagem de produtos"
        toolbar={
          <ListTools
            // showSearchInput
            newButtonText="Novo"
            searchText={search}
            clickInNew={() => navigate('/product/details/new')}
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
                  {row.quantityInStock < 10 && (
                    <TableCell
                      style={{
                        backgroundColor: '#faeaea',
                        color: 'red',
                        fontSize: '18px',
                        borderColor: '#d4caca',
                      }}
                    >
                      {row.quantityInStock}
                    </TableCell>
                  )}
                  {row.quantityInStock >= 10 && (
                    <TableCell>{row.quantityInStock}</TableCell>
                  )}
                  <TableCell>R$ {row.salePrice.toFixed(2)}</TableCell>
                  <TableCell>{row.provider}</TableCell>
                  <TableCell>R$ {row.gain?.toFixed(2)}</TableCell>
                  <TableCell>
                    <IconButton
                      size="small"
                      onClick={() => handleDelete(row.id)}
                    >
                      <Icon>delete</Icon>
                    </IconButton>

                    <IconButton
                      size="small"
                      onClick={() => navigate(`/product/details/${row.id}`)}
                    >
                      <Icon>edit</Icon>
                    </IconButton>

                    { row.quantityInStock < 10 && (
                      <IconButton 
                        size="small"
                        onClick={() => navigate('/sendEmailProvider')}
                      >
                        <Icon>message</Icon>
                      </IconButton>)}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>

            {/* {totalCount === 0 && !isLoading && (
              <caption>{Environment.EMPTY_LIST}</caption>
            )} */}

            {/* <TableFooter>
              {isLoading && (
                <TableRow>
                  <TableCell colSpan={6}>
                    <LinearProgress variant="indeterminate" />
                  </TableCell>
                </TableRow>
              )}

              <TableRow>
                <TableCell colSpan={6}>
                  <Pagination
                    count={count}
                    size="large"
                    page={page}
                    variant="text"
                    shape="rounded"
                    onChange={handleChange}
                  />
                </TableCell>
              </TableRow>
            </TableFooter> */}
          </Table>
        </TableContainer>
      </LayoutPageBase>
    </LateralMenu>
  );
};
