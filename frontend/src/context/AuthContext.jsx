import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [student, setStudent] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const savedToken = localStorage.getItem('token');
    const savedStudent = localStorage.getItem('student');
    if (savedToken && savedStudent) {
      setToken(savedToken);
      setStudent(JSON.parse(savedStudent));
    }
    setLoading(false);
  }, []);

  const login = (data) => {
    setToken(data.token);
    setStudent(data.student);
    localStorage.setItem('token', data.token);
    localStorage.setItem('student', JSON.stringify(data.student));
  };

  const logout = () => {
    setToken(null);
    setStudent(null);
    localStorage.removeItem('token');
    localStorage.removeItem('student');
  };

  return (
    <AuthContext.Provider value={{ student, token, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
