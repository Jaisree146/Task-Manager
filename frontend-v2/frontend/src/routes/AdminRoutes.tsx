import { Navigate } from "react-router-dom";
import { useAuth } from "../contexts/authContext";
import type { ReactNode } from "react";

type AdminRouteProps = {
  children: ReactNode;
};

function AdminRoute({ children }: AdminRouteProps) {
  const { token, roleId } = useAuth();

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  if (roleId !== 1) {
    return <Navigate to="/dashboard" replace />;
  }

  return <>{children}</>;
}

export default AdminRoute;