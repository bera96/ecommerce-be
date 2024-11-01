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

declare module "auth/LoginSlice" {
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

declare module "cart/ShoppingCart" {
  interface ShoppingCartProps {
    className?: string;
  }

  const ShoppingCart: React.FC<ShoppingCartProps>;
  export default ShoppingCart;
}

declare module "cart/CartSlice" {
  const cartSlice: Reducer;
  export default cartSlice;
}

declare module "cart/Cart" {
  const Cart: React.ComponentType;
  export default Cart;
}

declare module "order/Order" {
  const Order: React.ComponentType;
  export default Order;
}

declare module "order/OrderSlice" {
  const orderSlice: Reducer;
  export default orderSlice;
}
