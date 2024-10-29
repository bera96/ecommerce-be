import { Navigate } from "react-router-dom";
import { useGetCookie } from "../../utils/hooks/useGetCookie";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const { user } = useGetCookie();

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};
