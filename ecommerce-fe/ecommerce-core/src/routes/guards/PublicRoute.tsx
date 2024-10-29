import { Navigate } from "react-router-dom";
import { useGetCookie } from "../../utils/hooks/useGetCookie";
import { ROUTES } from "../config/routeConfig";

interface PublicRouteProps {
  children: React.ReactNode;
}

export const PublicRoute = ({ children }: PublicRouteProps) => {
  const { user } = useGetCookie();

  if (user) {
    return <Navigate to={ROUTES.PRODUCTS} replace />;
  }

  return <>{children}</>;
};
