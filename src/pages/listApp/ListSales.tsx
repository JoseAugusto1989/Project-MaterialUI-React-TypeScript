/* eslint-disable no-empty */
import {
  Icon,
  IconButton,
  LinearProgress,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableFooter,
  TableHead,
  TableRow,
} from '@mui/material';
import React, { useEffect, useMemo, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

import { ISales } from '../../interfaces';
import { ListTools } from '../../shared/components';
import LateralMenu from '../../shared/components/lateral-menu/LateralMenu';
import { Environment } from '../../shared/environments';
import { useDebounce } from '../../shared/hooks';
import LayoutPageBase from '../../shared/layouts/LayoutPageBase';
import SalesService from '../../shared/services/api/sales/SalesService';

export const ListSales: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { debounce } = useDebounce(3000, false);
  const navigate = useNavigate();
  const [size, setSize] = useState(26);

  const [rows, setRows] = useState<ISales[]>([]);
  const [totalCount, setTotalCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  const page = useMemo(() => {
    return Number(searchParams.get('page') || '0');
  }, [searchParams]);

  useEffect(() => {
    init();
  }, [size, page]);

  const init = () => {
    const filters = { size, page };
    setIsLoading(true);
    SalesService.getAll(filters)
      .then((res) => {
        setRows(res.data.content);
        setIsLoading(false);
      })
      .catch((error) => {
        console.log('Erro em sales: ', error);
        setIsLoading(false);
      });
  };

  const handleDelete = (id: number) => {
    if (confirm('Realmente deseja apagar?')) {
      SalesService.delete(id)
        .then((result) => {
          if (result instanceof Error) {
        
          } else {
            setRows((oldRows) => [
              ...oldRows.filter((oldRow) => oldRow.id !== id),
            ]);
            alert('Venda apagada com sucesso!');
          }
        });
    }
  };

  return (
    <LateralMenu>
      <LayoutPageBase
        title="Listagem de vendas"
        toolbar={
          <ListTools
            // showSearchInput
            newButtonText="Nova"
            clickInNew={() => navigate('/sales/details/new')}
            changeSearchText={(text) =>
              setSearchParams({ search: text, page: '0' }, { replace: true })
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
                <TableCell>Vendedor</TableCell>
                <TableCell>Produto</TableCell>
                <TableCell>Preço unitário</TableCell>
                <TableCell>Quantidade</TableCell>
                <TableCell>Preço total</TableCell>
                <TableCell>Data venda</TableCell>
                <TableCell>Cliente</TableCell>
                <TableCell>Ações</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {rows?.map((row) => (
                <TableRow key={row.id}>
                  <TableCell>{row.employee}</TableCell>
                  <TableCell>{row.productName}</TableCell>
                  <TableCell>R$ {row.unitPrice.toFixed(2)}</TableCell>
                  <TableCell>{row.quantity}</TableCell>
                  <TableCell>R$ {row.totalPrice.toFixed(2)}</TableCell>
                  <TableCell>{new Date(row.dateSale).toLocaleDateString()}</TableCell>
                  
                  <TableCell>{row.customer}</TableCell>
                  <TableCell>
                    <IconButton
                      size="small"
                      onClick={() => handleDelete(row.id)}
                    >
                      <Icon>delete</Icon>
                    </IconButton>
                    <IconButton
                      size="small"
                      onClick={() => navigate(`/detailSales/${row.id}`)}
                      // navigate(`/detailSales/${row.id}`)
                    >
                      <Icon>edit</Icon>
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>

            {/* {totalCount === 0 && !isLoading && (
              <caption>{Environment.EMPTY_LIST}</caption>
            )} */}

            <TableFooter>
              {totalCount > 0 && totalCount > Environment.LIMIT_OF_LINES && (
                <TableRow>
                  <TableCell colSpan={4}>
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