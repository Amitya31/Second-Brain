import { Navigate } from "react-router-dom";
import { useAuth } from "../Hooks/useAuth";
import {  type ReactNode } from "react";


interface Props {
  children: ReactNode;
}

export const ProtectedRoute = ({ children }: Props) => {
  const { isAuthenticated,loading } = useAuth();
  if(loading){
    return <div>...Loading</div>
  }

  return isAuthenticated  ? (
    children
  ) : (
    <Navigate to="/auth" />
  );
};