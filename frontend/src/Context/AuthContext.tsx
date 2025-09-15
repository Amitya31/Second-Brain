import { useEffect, useState, type ReactNode } from "react"
import AuthContext from "../Hooks/AuthHook"
import type { AuthContextType } from "../types/AuthTypes";
import axios from "axios";

interface AuthProps { 
  children:ReactNode
}



export const AuthProvider = ({children}:AuthProps) =>{    

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading,setLoading] = useState<boolean>(true)
  const [token,setToken] = useState<string>('')


  useEffect(() => {
   const storedToken = localStorage.getItem("token");
   if (storedToken) {
      setToken(storedToken);
      setIsAuthenticated(true);
    } else {
      refreshAccessToken(); // try refreshing if no access token
    }
    setLoading(false);
   
  }, []);

  const login = (newToken: string) => {
    localStorage.setItem("token", newToken);
    setToken(newToken)
    setIsAuthenticated(true);
  };

  const logout = () => {
    localStorage.removeItem("token");
    setIsAuthenticated(false);
  };

  const getToken = () => token

  const refreshAccessToken = async () => {
    try {
      const res = await axios.post("http://localhost:3000/api/auth/refresh", {
        method: "POST",
        credentials: "include", // sends refresh token cookie
      });
      const data = await res.data;

      if (data.success && data.accessToken) {
        localStorage.setItem("token", data.accessToken);
        setToken(data.accessToken);
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
      }
    } catch (err) {
      console.error("Failed to refresh token:", err);
      setIsAuthenticated(false);
    }
  };


  const value: AuthContextType = {
    login,
    logout,
    getToken,
    isAuthenticated,
    loading,
  };
    return (
        <AuthContext.Provider value={value}>
          {children}
        </AuthContext.Provider>

    )
}