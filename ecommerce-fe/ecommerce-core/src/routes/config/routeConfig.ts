import { LazyLogin, LazyProducts, LazySignup } from "../../components/LazyComponents";

export const ROUTES = {
  LOGIN: "/login",
  SIGNUP: "/signup",
  PRODUCTS: "/products",
  ORDERS: "/orders",
  CART: "/cart",
} as const;

export const PUBLIC_ROUTES = [
  {
    path: ROUTES.LOGIN,
    component: LazyLogin,
  },
  {
    path: ROUTES.SIGNUP,
    component: LazySignup,
  },
];

export const PROTECTED_ROUTES = [
  {
    path: ROUTES.PRODUCTS,
    component: LazyProducts,
  },
//   {
//     path: ROUTES.ORDERS,
//     component: LazyOrders,
//   },
//   {
//     path: ROUTES.CART,
//     component: LazyCart,
//   },
];
