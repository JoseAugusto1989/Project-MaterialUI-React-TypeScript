import { useEffect } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';

import {
  Dashboard,
  DetailPeople,
  ListCustomer,
  ListProduct,
  ListProvider,
} from '../pages';
import Login from '../pages/login/Login';
import LateralMenu from '../shared/components/lateral-menu/LateralMenu';
import { useDrawerContext } from '../shared/contexts';

export const AppRoutes = () => {
  const { toggleDrawerOpen, setDrawerOptions } = useDrawerContext();

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
        label: 'Vendas',
        path: '/provider',
        icon: 'article',
      },
    ]);
  }, []);

  return (
    <Routes>
      <Route path="login" element={<Login />} />
      <Route path="/initial-page" element={<Dashboard />} />
      <Route path="/product" element={<ListProduct />} />
      <Route path="/customer" element={<ListCustomer />} />
      <Route path="/provider" element={<ListProvider />} />
      <Route path="/people/details/:id" element={<DetailPeople />} />
      <Route path="*" element={<Navigate to={'initial-page'} />} />
    </Routes>
  );
};
