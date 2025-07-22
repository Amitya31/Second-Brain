import { createContext } from "react";
import { type AuthContextType } from "../types/AuthTypes";

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export default AuthContext;