/* eslint-disable @typescript-eslint/no-empty-function */
import {
  Box,
  Button,
  Icon,
  IconButton,
  LinearProgress,
  Pagination,
  Modal,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableFooter,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import { useEffect, useMemo, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

import { ListTools } from '../../shared/components';
import LateralMenu from '../../shared/components/lateral-menu/LateralMenu';
import {
  Container,
  ContainerInput,
  ContainerText,
} from '../../shared/components/modals/EditModal.styles';
import { Input } from '../../shared/components/modals/InputEditModal';
import { Environment } from '../../shared/environments';
import { useDebounce } from '../../shared/hooks';
import LayoutPageBase from '../../shared/layouts/LayoutPageBase';
import { PeopleService } from '../../shared/services/api/people/PeopleServiceExample';
import {
  IProductList,
  ProductService,
} from '../../shared/services/api/people/ProductService';
import ProductServiceE from '../../shared/services/api/people/ProductServiceExemple';

const style = {
  position: 'absolute' as const,
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 500,
  bgcolor: 'white',
  border: '2px solid #000',
  boxShadow: 12,
  p: 20,
};

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

  const [size, setSize] = useState(10);

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
    <LateralMenu>
      <LayoutPageBase
        title="Listagem de produtos"
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
                    <IconButton
                      size="small"
                      onClick={() => handleDelete(row.id)}
                    >
                      <Icon>delete</Icon>
                    </IconButton>
                    <IconButton
                      size="small"
                      // TODO: fazer uma validação para a Qtd. Estoque ficar vermelho quando
                      // a qtd for menor que 10
                      onClick={handleOpen}
                    >
                      <Icon>edit</Icon>
                    </IconButton>
                    <Modal
                      open={open}
                      onClose={handleClose}
                      aria-labelledby="modal-modal-title"
                      aria-describedby="modal-modal-description"
                    >
                      <Box sx={style}>
                        <Typography variant="h3">
                          <ContainerText>Atualização de Produtos</ContainerText>
                        </Typography>
                        <Typography sx={{ mt: 2 }}>
                          <Container>
                            <ContainerInput>
                              <Input label="Nome do Produto" />
                              <Input label="Qtd. em Estoque" />
                            </ContainerInput>

                            <ContainerInput>
                              <Input label="Preço de Venda" />
                              <Input label="Fornecedor" />
                            </ContainerInput>
                            <ContainerInput>
                              <Input label="Preço de Compra" />
                              <Input label="Qtd. para Acionar" />
                            </ContainerInput>
                            <ContainerInput>
                              <Button variant="outlined">Limpar</Button>
                              <Button variant="contained">Confirmar</Button>
                            </ContainerInput>
                          </Container>
                        </Typography>
                      </Box>
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
                </TableCell>
              </TableRow>
            </TableFooter>
          </Table>
        </TableContainer>
      </LayoutPageBase>
    </LateralMenu>
  );
};
