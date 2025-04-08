// src/context/AuthContext.jsx
import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [userName, setUserName] = useState("");
  const [userRole, setUserRole] = useState("");
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const userData = JSON.parse(localStorage.getItem("userData"));
        if (userData) {
          setLoggedIn(true);
          setUserName(userData.name);
          setUserRole(userData.role);
          setUserId(userData.id);
        }
      } catch (error) {
        console.error("Erro ao carregar dados do usuário:", error);
      }
    }
  }, []);

  const login = (token, name, role, id) => {
    localStorage.setItem("token", token);
    localStorage.setItem("userData", JSON.stringify({ name, role, id }));
    setLoggedIn(true);
    setUserName(name);
    setUserRole(role);
    setUserId(id);
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userData");
    setLoggedIn(false);
    setUserName("");
    setUserRole("");
    setUserId(null);
  };

  return (
    <AuthContext.Provider value={{ 
      loggedIn, 
      userName, 
      userRole, 
      userId,
      login, 
      logout 
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);