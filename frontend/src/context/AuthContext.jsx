import { createContext, useState, useEffect } from 'react';
import { verifyToken } from '../api/endpoints';

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem('authToken');
      if (token) {
        try {
          const response = await verifyToken();
          setUser(response.data.admin);
        } catch (error) {
          localStorage.removeItem('authToken');
          setUser(null);
        }
      }
      setLoading(false);
    };

    checkAuth();
  }, []);

  const loginUser = (userData, token) => {
    localStorage.setItem('authToken', token);
    setUser(userData);
  };

  const logoutUser = () => {
    localStorage.removeItem('authToken');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, loginUser, logoutUser }}>
      {children}
    </AuthContext.Provider>
  );
};
