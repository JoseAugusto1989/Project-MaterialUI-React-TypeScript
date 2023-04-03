import { Box, Card, CardContent, Grid, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { DetailTools, ListTools } from '../../shared/components';
import LateralMenu from '../../shared/components/lateral-menu/LateralMenu';
import LayoutPageBase from '../../shared/layouts/LayoutPageBase';
import { EmployeeService } from '../../shared/services/api/employee/EmployeeService';
import { ProviderService } from '../../shared/services/api/people/ProviderService';
import { ProductServiceJsonServer } from '../../shared/services/api/product/ProductServiceJsonServer';
import { IReduxProps } from '../../store/reducers/objectTest';
import { ContainerButton } from './styles';

export const Dashboard = () => {
  const [isLoadingProduct, setIsLoadingProduct] = useState(true);
  const [totalCountProduct, setTotalCountProduct] = useState(0);
  const [isLoadingEmployee, setIsLoadingEmployee] = useState(true);
  const [totalCountEmployee, setTotalCountEmployee] = useState(0);
  const objTest = useSelector((state: { testRedux: IReduxProps[] }) => state.testRedux);


  useEffect(() => {
    setIsLoadingProduct(true);
    setIsLoadingEmployee(true);

    ProductServiceJsonServer.getAll(1)
      .then((result) => {
        setIsLoadingProduct(false);

        if (result instanceof Error) {
          alert(result.message);
        } else {
          setTotalCountProduct(result.totalCount);
        }
      });

    EmployeeService.getAll(1)
      .then((result) => {
        setIsLoadingEmployee(false);

        if (result instanceof Error) {
          alert(result.message);
        } else {
          // setIsLoadingEmployee(result.totalCount);
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
                            {totalCountEmployee}
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
                            {totalCountProduct}
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

              <div>
                <h1>Test Redux</h1>
                {objTest?.map((obj, index) => (
                  <div key={index}>
                    <p>{obj.name}</p>
                    <p>{obj.description}</p>
                  </div>
                ))}
              </div>

            </Grid>
          </Grid>
        </Box>
      </LayoutPageBase>
    </LateralMenu>
  );
};
