// types/AuthTypes.ts (optional file for clean code)
export interface AuthContextType {
  isAuthenticated:boolean 
  login: (token: string) => void;
  logout: () => void;
  getToken:()=>string|null;
  loading:boolean
}
