import React, { createContext, useState } from 'react';
import axios from 'axios';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const register = async (name, email, password, role) => {
    const response = await axios.post('http://localhost:5000/api/auth/register', { name, email, password, role });
    setUser(response.data);
  };

  const login = async (email, password) => {
    const response = await axios.post('http://localhost:5000/api/auth/login', { email, password });
    setUser(response.data);
  };

  return (
    <AuthContext.Provider value={{ register, login, user }}>
      {children}
    </AuthContext.Provider>
  );
};
