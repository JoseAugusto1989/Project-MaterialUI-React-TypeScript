import { Box, Button, Typography } from '@mui/material';
import { Container, ContainerButton, ContainerInput, ContainerText } from '../EditModal.styles';
import { Input } from '../InputEditModal';

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

export const ProductModal = () => {
  return(
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
          <ContainerButton>
            <Button variant="outlined" size='large' style={{ marginLeft: '20px' }}>Limpar</Button>
            <Button variant="contained" size='large' style={{ marginLeft: '20px' }}>Confirmar</Button>
          </ContainerButton>
        </Container>
      </Typography>
    </Box>
  );
};