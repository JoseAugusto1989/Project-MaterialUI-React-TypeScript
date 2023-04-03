/* eslint-disable react/react-in-jsx-scope */
import './App.css';
import './shared/forms/TranslateYup';

import { BrowserRouter } from 'react-router-dom';

import { AppRoutes } from './routes';
import { AuthProvider, DrawerProvider } from './shared/contexts';
import { AppThemeProvider } from './shared/contexts/ThemeContext';

function App() {
  return (
    <AuthProvider>
      <AppThemeProvider>
        
        <DrawerProvider>
          <BrowserRouter>
            <AppRoutes />
          </BrowserRouter>
        </DrawerProvider>
        
      </AppThemeProvider>
    </AuthProvider>
  );
}

export default App;
