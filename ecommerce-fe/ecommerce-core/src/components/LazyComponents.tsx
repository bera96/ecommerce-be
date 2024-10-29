import React from "react";

export const LazyProducts = React.lazy(() => import("products/Products"));
export const LazyLogin = React.lazy(() => import("auth/Login"));
export const LazySignup = React.lazy(() => import("auth/Signup"));
