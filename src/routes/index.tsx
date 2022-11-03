import { Button } from '@mui/material';
import { useEffect } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { Dashboard, ListPeople } from '../pages';
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
        label: 'Pessoas',
        path: '/people',
        icon: 'people',
      },
    ]);
  }, []);

  return (
    <Routes>
      <Route
        path="/initial-page"
        element={<Dashboard />}
      />
      <Route
        path="/people"
        element={<ListPeople />}
      />
      <Route
        path="/people/detail/:id"
        element={<ListPeople />}
      />
      <Route path="*" element={<Navigate to={'initial-page'} />} />
    </Routes>
  );
};
