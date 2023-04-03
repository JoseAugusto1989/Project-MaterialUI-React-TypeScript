import { useEffect } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';

import { Dashboard, DetailCustomer, ListCustomer, ListProduct, ListProvider, Register } from '../pages';
import { DetailProduct } from '../pages/listApp/DetailProduct';
import { ListEmployee } from '../pages/listApp/LIstEmployee';
import { NewRegister } from '../pages/login/NewRegister';
import { useDrawerContext } from '../shared/contexts';

export const AppRoutes = () => {
  const { setDrawerOptions } = useDrawerContext();

  useEffect(() => {
    setDrawerOptions([
      {
        label: 'Página inicial',
        path: '/initial-page',
        icon: 'home',
      },
      {
        label: 'Produtos',
        path: '/product',
        icon: 'inventory',
      },
      {
        label: 'Clientes',
        path: '/customer',
        icon: 'call',
      },
      {
        label: 'Fornecedores',
        path: '/provider',
        icon: 'article',
      },
      {
        label: 'Funcionarios',
        // TODO: desenvolver cadastro de funcionario
        path: '/employee',
        icon: 'people',
      },
      {
        label: 'Vendas',
        path: '/provider',
        icon: 'article',
      },
      {
        label: 'Relatórios Vendas',
        path: '/report',
        icon: '',
      }
    ]);
  }, []);

  return (
    <Routes>
      <Route path="/register" element={<Register />} />
      <Route path="/initial-page" element={<Dashboard />} />
      <Route path="/newLogin" element={<NewRegister />} />
      <Route path="/product" element={<ListProduct />} />
      <Route path="/customer" element={<ListCustomer />} />
      <Route path="/provider" element={<ListProvider />} />
      <Route path="/employee" element={<ListEmployee />} />
      <Route path="/product/details/:id" element={<DetailProduct />} />
      <Route path="/customer/details/:id" element={<DetailCustomer />} />
      {/* <Route path="/provider/details/:id" element={<DetailProvider />} /> */}
      <Route path="*" element={<Navigate to={'/register'} />} />
    </Routes>
  );
};
