import React, { Suspense } from "react";

const withSuspense = (Component: React.LazyExoticComponent<any>) => (props: any) => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Component {...props} />
    </Suspense>
  );
};

export const LazyProducts = withSuspense(React.lazy(() => import("products/Products")));
export const LazyLogin = withSuspense(React.lazy(() => import("auth/Login")));
export const LazySignup = withSuspense(React.lazy(() => import("auth/Signup")));
export const LazyShoppingCart = withSuspense(React.lazy(() => import("cart/ShoppingCart")));
export const LazyCart = withSuspense(React.lazy(() => import("cart/Cart")));
export const LazyOrder = withSuspense(React.lazy(() => import("order/Order")));
