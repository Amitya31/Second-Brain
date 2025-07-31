// types/AuthTypes.ts (optional file for clean code)
export interface AuthContextType {
  isAuthenticated:boolean // You can replace `any` with a specific User type
  login: (token: string) => void;
  logout: () => void;
  getToken:()=>string|null;
  loading:boolean
}
