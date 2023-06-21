/* eslint-disable no-empty */
import { Box, Card, CardContent, Grid, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import { DetailTools } from '../../shared/components';
import LateralMenu from '../../shared/components/lateral-menu/LateralMenu';
import LayoutPageBase from '../../shared/layouts/LayoutPageBase';
import ProductService from '../../shared/services/api/product/ProductService';
import { IReduxProps } from '../../store/reducers/objectTest';
import { ContainerButton } from './styles';
import { IEmployee, IProduct } from '../../interfaces';
import EmployeeService from '../../shared/services/api/employee/EmployeeService';

export const Dashboard = () => {
  const [isLoadingProduct, setIsLoadingProduct] = useState(true);
  const [rows, setRows] = useState<IProduct[]>([]);
  const [isLoadingEmployee, setIsLoadingEmployee] = useState(true);
  const [employee, setEmployee] = useState<IEmployee[]>([]);
  const objTest = useSelector((state: { testRedux: IReduxProps[] }) => state.testRedux);


  useEffect(() => {
    setIsLoadingProduct(true);
    setIsLoadingEmployee(true);

    ProductService.getAll(1)
      .then((result) => {
        setIsLoadingProduct(false);

        if (result instanceof Error) {
          
        } else {
          setRows(result.data.content);
        }
      });

    EmployeeService.getAll(1)
      .then((result) => {
        setIsLoadingEmployee(false);

        if (result instanceof Error) {
        
        } else {
          setEmployee(result.data.content);
        }
      });
  }, []);

  console.log('test', objTest);

  return (
    <LateralMenu>
      <LayoutPageBase
        title="Pagina inicial"
        toolbar={
          <DetailTools
            showButtonSaveAndClose={false}
            showButtonNew={false}
            showButtonSaveAndCloseLoading={false}
            showButtonBack={false}
            showButtonDelete={false}
            showButtonSave={false}
          />
        }
      >
        <Box width='100%' display='flex'>
          <Grid container margin={2}>
            <Grid item container spacing={6}>
              <Grid item xs={12} sm={12} md={6} lg={4} xl={3}>
                <Link to="" style={{ textDecoration: 'none' }}>
                  <ContainerButton>
                    <Card>
                      <CardContent>
                        <Typography variant='h5' align='center'>
                      Total de Funcionários
                        </Typography>
                        <Box padding={6} display='flex' justifyContent='center' alignItems='center'>
                          { !isLoadingEmployee &&( <Typography variant='h1'>
                            { employee.length }
                          </Typography>)}
                          { isLoadingEmployee && (
                            <Typography variant='h6'>
                        Carregando...
                            </Typography>
                          )}
                        </Box>
                      </CardContent>
                    </Card>
                  </ContainerButton>
                </Link>
              </Grid>

              <Grid item xs={12} sm={12} md={6} lg={4} xl={3}>
                <Link to="" style={{ textDecoration: 'none' }}>
                  <ContainerButton>
                    <Card>
                      <CardContent>
                        <Typography variant='h5' align='center'>
                      Total de Produtos
                        </Typography>
                        <Box padding={6} display='flex' justifyContent='center' alignItems='center'>
                          { !isLoadingProduct &&( <Typography variant='h1'>
                            {rows.length}
                          </Typography>)}
                          { isLoadingProduct && (
                            <Typography variant='h6'>
                        Carregando...
                            </Typography>
                          )}
                        </Box>
                      </CardContent>
                    </Card>
                  </ContainerButton>
                </Link>
              </Grid>
            </Grid>
          </Grid>
        </Box>
      </LayoutPageBase>
    </LateralMenu>
  );
};
