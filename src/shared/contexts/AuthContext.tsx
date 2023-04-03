import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { AuthService } from '../services/api/auth/AuthService';

interface IAuthContextData {
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<string | void>;
  logout: () => void;
}

const AuthContext = createContext({} as IAuthContextData);

interface IAuthProviderProps {
  children: React.ReactNode;
}

// eslint-disable-next-line react/prop-types
export const AuthProvider: React.FC<IAuthProviderProps> = ({ children }) => {
  const [accessToken, setAccessToken] = useState<string>();

  useEffect(() => {
    const accessToken = localStorage.getItem('APP_ACCESS_TOKEN');

    if (accessToken) {
      setAccessToken(JSON.parse(accessToken));
    
    } else {
      setAccessToken(undefined); 
    }
  }, []);

  const handleLogin = useCallback(async (email: string, password: string) => {
    const result = await AuthService.auth(email, password);
    
    if (result instanceof Error) {
      return result.message;
    
    } else {
      localStorage.setItem('APP_ACCESS_TOKEN', JSON.stringify(result.accessToken));
      setAccessToken(result.accessToken);  

    }
  }, []);

  const handleLogout = useCallback(() => {
    localStorage.removeItem('APP_ACCESS_TOKEN');
      
    setAccessToken(undefined);
  }, []);

  const isAuthenticated = useMemo(() => accessToken !== undefined, [accessToken]);
 
  return (
    <AuthContext.Provider value={{ isAuthenticated, login: handleLogin, logout: handleLogout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => useContext(AuthContext);