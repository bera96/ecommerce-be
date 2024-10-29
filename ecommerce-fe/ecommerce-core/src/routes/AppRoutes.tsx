import { ROUTES } from "./config/routeConfig";

import { Navigate } from "react-router-dom";

import { PROTECTED_ROUTES } from "./config/routeConfig";

import { Route } from "react-router-dom";

import { Routes } from "react-router-dom";
import { PUBLIC_ROUTES } from "./config/routeConfig";
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
