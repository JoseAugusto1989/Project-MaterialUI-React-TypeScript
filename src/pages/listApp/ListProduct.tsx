/* eslint-disable @typescript-eslint/no-empty-function */
import {
  Icon,
  IconButton,
  LinearProgress,
  Modal,
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
import { ProductModal } from '../../shared/components/modals/modal/ProductModal';
import { Environment } from '../../shared/environments';
import { useDebounce } from '../../shared/hooks';
import LayoutPageBase from '../../shared/layouts/LayoutPageBase';
import { IProductList, ProductServiceJsonServer } from '../../shared/services/api/product/ProductServiceJsonServer';
import usePagination from './helpers/Pagination';

export const ListProduct: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { debounce } = useDebounce(3000, false);
  const navigate = useNavigate();
  const [rows, setRows] = useState<IProductList[]>([]);
  const [totalCount, setTotalCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [page, setPage] = useState(1);
  
  const count = Math.ceil(totalCount / Environment.LIMIT_OF_LINES);
  const _DATA = usePagination(rows, Environment.LIMIT_OF_LINES);

  const handleChange = (e: any, p: number) => {
    setPage(p);
    _DATA.jump(p);
  };

  const search = useMemo(() => {
    return searchParams.get('search') || '';
  }, [searchParams]);

  useEffect(() => {
    setIsLoading(true);

    debounce(() => {
      ProductServiceJsonServer.getAll(page, search).then((result) => {
        setIsLoading(false);
        console.log(rows);

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

  const handleDelete = (id: number) => {
    if (confirm('Realmente deseja apagar?')) {
      ProductServiceJsonServer.deleteById(id).then((result) => {
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
        title="Listagem de produtos"
        toolbar={
          <ListTools
            showSearchInput
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
                  <TableCell>R$ {row.salePrice}</TableCell>
                  <TableCell>{row.provider}</TableCell>
                  <TableCell>R$ {row.gain}</TableCell>
                  <TableCell>
                    <IconButton
                      size="small"
                      onClick={() => handleDelete(row.id)}
                    >
                      <Icon>delete</Icon>
                    </IconButton>

                    <IconButton
                      size="small"
                      // handleOpen
                      onClick={() => navigate(`/product/details/${row.id}`)}
                    >
                      <Icon>edit</Icon>
                    </IconButton>

                    { row.quantityInStock < 10 && (<IconButton size="small">
                      <Icon>message</Icon>
                    </IconButton>)}
                    <Modal
                      open={open}
                      onClose={handleClose}
                      aria-labelledby="modal-modal-title"
                      aria-describedby="modal-modal-description"
                    >
                      <ProductModal />
                    </Modal>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>

            {totalCount === 0 && !isLoading && (
              <caption>{Environment.EMPTY_LIST}</caption>
            )}

            <TableFooter>
              {/* inicio paginação */}

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
            </TableFooter>
          </Table>
        </TableContainer>
      </LayoutPageBase>
    </LateralMenu>
  );
};
