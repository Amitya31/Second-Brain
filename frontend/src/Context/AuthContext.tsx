import { useEffect, useState, type ReactNode } from "react"
import AuthContext from "../Hooks/AuthHook"
import type { AuthContextType } from "../types/AuthTypes";

interface AuthProps { 
    children:ReactNode
}



export const AuthProvider = ({children}:AuthProps) =>{    

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading,setLoading] = useState<boolean>(true)


  useEffect(() => {
   const token = localStorage.getItem("token");
   if (token) setIsAuthenticated(true);
   setLoading(false)
   
  }, []);

  const login = (token: string) => {
    localStorage.setItem("token", token);
    setIsAuthenticated(true);
  };

  const logout = () => {
    localStorage.removeItem("token");
    setIsAuthenticated(false);
  };

  const getToken = () => {
    return localStorage.getItem("token");
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