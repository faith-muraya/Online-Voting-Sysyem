import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import dayjs from "dayjs";

export const AuthContext = createContext({
  isAuthenticated: false,
  user: null,
  setIsAuthenticated: () => null,
  logout: () => null,
});

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // get session from local storage
    const session = JSON.parse(localStorage.getItem("session"));

    // if session exists, set authenticated to true
    if (session) {
      // 1. check if refresh token is valid
      const decoded = jwtDecode(session.refresh_token);
      const expiry = dayjs(decoded.exp * 1000);
      const isValid = dayjs().isBefore(expiry);

      if (isValid) {
        setUser(session.user);
        setIsAuthenticated(true);
      } else {
        logout();
      }
    }
  },[]);

  const logout = () => {
    // remove session from localstorage
    localStorage.removeItem("session");
    // reset isAuthenticated state
    setIsAuthenticated(false);
    navigate("/");
  };

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, setIsAuthenticated, logout, user }}
    >
      {children}
    </AuthContext.Provider>
  );
};
