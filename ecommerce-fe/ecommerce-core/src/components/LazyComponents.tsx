import React, { Suspense } from "react";
import { Spinner } from "./spinner/Spinner";

const withSuspense =
  (
    Component: React.LazyExoticComponent<any>,
    spinnerSize: "small" | "medium" | "large" = "medium"
  ) =>
  (props: any) => {
    return (
      <Suspense fallback={<Spinner size={spinnerSize} color="primary" />}>
        <Component {...props} />
      </Suspense>
    );
  };

export const LazyProducts = withSuspense(
  React.lazy(() => import("products/Products")),
  "medium"
);
export const LazyLogin = withSuspense(
  React.lazy(() => import("auth/Login")),
  "medium"
);
export const LazySignup = withSuspense(
  React.lazy(() => import("auth/Signup")),
  "medium"
);
export const LazyShoppingCart = withSuspense(
  React.lazy(() => import("cart/ShoppingCart")),
  "small"
);
export const LazyCart = withSuspense(
  React.lazy(() => import("cart/Cart")),
  "medium"
);
export const LazyOrder = withSuspense(
  React.lazy(() => import("order/Order")),
  "medium"
);
