import React, { createContext, useContext, useEffect, useState } from 'react';

export const AuthContext = createContext({});

export const AuthProvider = (children: React.ReactNode) => {
  const [user, setUser] = useState({
    name: 'Guto',
  });

  useEffect(() => {
    const userStorage = localStorage.getItem('user');
    if(userStorage) {
      setUser(JSON.parse(userStorage));
    } else {
      setUser({
        name: '',
      });
    }
  });
    
  return (
    <AuthContext.Provider
      value={{ user, setUser }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);