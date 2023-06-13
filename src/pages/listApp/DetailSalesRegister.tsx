import { Box, Grid, Paper, TableCell, TableFooter, Typography } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';

import { ISales } from '../../interfaces';
import { ListTools } from '../../shared/components';
import LateralMenu from '../../shared/components/lateral-menu/LateralMenu';
import LayoutPageBase from '../../shared/layouts/LayoutPageBase';
import { useEffect, useState } from 'react';
import SalesService from '../../shared/services/api/sales/SalesService';

export const DetailSalesRegister = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [rows, setRows] = useState<ISales[]>([]);
  const [size, setSize] = useState(26);
  const [page, setPage] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const filteredRows = rows.filter((row) => row.id === parseInt(id ?? ''));

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

  return (
    <LateralMenu>
      <LayoutPageBase
        title={`Detalhes da Venda: ${id}`}
        toolbar={<ListTools />
        }
      >
        <Box margin={1} display="flex" flexDirection="row" component={Paper} variant="outlined">        
          <Grid container direction="column" padding={4} spacing={2}>        
            <Grid item>
              <Typography variant='h4'>Venda:</Typography>
            </Grid>

            <Grid container padding={4}>
              <Grid container item direction="row" spacing={2}>
                <Grid item xs={12} sm={12} md={6} lg={4} xl={12} sx={{ fontSize: '20px', marginTop: '10px' }}>             
                Vendedor:
                  {''} {filteredRows.map((row) => (
                    <p key={row.id} style={{ color: 'green' }}>{row.employee}</p>
                  ))}
                </Grid>
              </Grid>

              <Grid container item direction="row" spacing={2}>
                <Grid item xs={12} sm={12} md={6} lg={4} xl={12} sx={{ fontSize: '20px', marginTop: '10px' }}>
                Preço unitario:
                  {''} {filteredRows.map((row) => (
                    <p key={row.id} style={{color: 'green'}}> R$ { row.unitPrice.toFixed(2) }</p>
                  ))}       
                </Grid>
              </Grid>    

              <Grid container item direction="row" spacing={2}>
                <Grid item xs={12} sm={12} md={6} lg={4} xl={12} sx={{ fontSize: '20px', marginTop: '10px' }}>
                Quantidade: 
                  {''} {filteredRows.map((row) => (
                    <p key={row.id} style={{color: 'green'}}>{ row.quantity }</p>
                  ))}
                  
                </Grid>
              </Grid>   

              <Grid container item direction="row" spacing={2}>
                <Grid item xs={12} sm={12} md={6} lg={4} xl={12} sx={{ fontSize: '20px', marginTop: '10px' }}>
                Preço total: 
                  {''} {filteredRows.map((row) => (
                    <p key={row.id} style={{color: 'green'}}>{ row.totalPrice.toFixed(2) }</p>
                  ))} 
                </Grid>
              </Grid>
            </Grid>
          </Grid>

          <Grid container direction="column" padding={4} spacing={2}>

            <Grid item>
              <Typography variant='h4'>Informações:</Typography>
            </Grid>

            <Grid container padding={4}>
              <Grid container item direction="row" spacing={2}>
                <Grid item xs={12} sm={12} md={6} lg={4} xl={12} sx={{ fontSize: '20px', marginTop: '10px' }}>
                Nome produto: 
                  {''} {filteredRows.map((row) => (
                    <p key={row.id} style={{color: 'green'}}>{ row.productName }</p>
                  ))} 
                </Grid>
              </Grid>

              <Grid container item direction="row" spacing={2}>
                <Grid item xs={12} sm={12} md={6} lg={4} xl={12} sx={{ fontSize: '20px', marginTop: '10px' }}>
                Data: 
                  {''} {filteredRows.map((row) => (
                    <p key={row.id} style={{color: 'green'}}>{ new Date(row.dateSale).toLocaleDateString() }</p>
                  ))} 
                </Grid>
              </Grid>
            
              <Grid container item direction="row" spacing={2}>
                <Grid item xs={12} sm={12} md={6} lg={4} xl={12} sx={{ fontSize: '20px', marginTop: '10px' }}>
                Cliente: 
                  {''} {filteredRows.map((row) => (
                    <p key={row.id} style={{color: 'green'}}>{ row.customer }</p>
                  ))} 
                </Grid>
              </Grid>
            
              <Grid container item direction="row" spacing={2}>
                <Grid item xs={12} sm={12} md={6} lg={4} xl={12} sx={{ fontSize: '20px', marginTop: '10px' }}>
                Descrição: 
                  {''} {filteredRows.map((row) => (
                    <p key={row.id} style={{color: 'green'}}>{ row.description }</p>
                  ))}
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Box>
        <TableFooter>
        </TableFooter>
      </LayoutPageBase>
    </LateralMenu>
  );
};