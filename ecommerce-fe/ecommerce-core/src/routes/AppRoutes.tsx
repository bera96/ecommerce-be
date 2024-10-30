import { ROUTES, PUBLIC_ROUTES, PROTECTED_ROUTES } from "./config/routeConfig";
import { Navigate, Route, Routes } from "react-router-dom";
import { Suspense } from "react";
import { ProtectedRoute } from "./guards/ProtectedRoute";
import { PublicRoute } from "./guards/PublicRoute";
import { MainLayout } from "../layouts/MainLayout";

export const AppRoutes = () => {
  return (
    <MainLayout>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          {PUBLIC_ROUTES.map(({ path, component: Component }) => (
            <Route
              key={path}
              path={path}
              element={
                <PublicRoute>
                  <Component />
                </PublicRoute>
              }
            />
          ))}

          {PROTECTED_ROUTES.map(({ path, component: Component }) => (
            <Route
              key={path}
              path={path}
              element={
                <ProtectedRoute>
                  <Component />
                </ProtectedRoute>
              }
            />
          ))}

          <Route path="/" element={<Navigate to={ROUTES.PRODUCTS} replace />} />
          <Route path="*" element={<Navigate to={ROUTES.LOGIN} replace />} />
        </Routes>
      </Suspense>
    </MainLayout>
  );
};
