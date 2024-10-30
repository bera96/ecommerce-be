declare module "products/Products" {
  const Products: React.ComponentType;
  export default Products;
}

declare module "auth/Login" {
  const Login: React.ComponentType;
  export default Login;
}

declare module "auth/Signup" {
  const Signup: React.ComponentType;
  export default Signup;
}

declare module "auth/loginSlice" {
  const loginSlice: Reducer;
  export default loginSlice;
}

declare module "products/CategorySlice" {
  const categorySlice: Reducer;
  export default categorySlice;
}

declare module "products/ProductSlice" {
  const productSlice: Reducer;
  export default productSlice;
}
