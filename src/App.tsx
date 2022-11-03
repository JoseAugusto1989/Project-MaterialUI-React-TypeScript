/* eslint-disable react/react-in-jsx-scope */
import './App.css';

import { BrowserRouter } from 'react-router-dom';

import { AppRoutes } from './routes';
import { AppThemeProvider } from './shared/contexts/ThemeContext';
import LateralMenu from './shared/components/lateral-menu/LateralMenu';
import { DrawerProvider } from './shared/contexts';

function App() {
  return (
    <AppThemeProvider>
      <DrawerProvider>
        <BrowserRouter>

          <LateralMenu>
            <AppRoutes />
          </LateralMenu>
          
        </BrowserRouter>
      </DrawerProvider>
    </AppThemeProvider>
  );
}

export default App;
