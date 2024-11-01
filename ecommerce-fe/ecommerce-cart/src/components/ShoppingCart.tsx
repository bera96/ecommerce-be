import { ShoppingCartIcon } from "@heroicons/react/24/outline";
import { useEffect } from "react";
import { CartService } from "../services/cartService";
import { useAppSelector } from "../store/store";
import { setCart } from "../store/slices/cartSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const ShoppingCart = ({ className }: { className: string }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cart = useAppSelector((state) => state.cart);
  const fetchCart = async () => {
    const cartService = new CartService();
    cartService.getCart().then((response) => {
      if (response) {
        dispatch(setCart(response.data));
      }
    });
  };
  useEffect(() => {
    fetchCart();

    const handleAddToProduct = () => {
      fetchCart();
    };
    window.addEventListener("addToProduct", handleAddToProduct);
    return () => {
      window.removeEventListener("addToProduct", handleAddToProduct);
    };
  }, []);
  return (
    <div className="relative cursor-pointer" onClick={() => navigate("/cart")}>
      <ShoppingCartIcon className={className} />
      {cart.items?.length > 0 && (
        <div
          className="absolute -top-2 -right-2 bg-black text-white text-xs
                  w-5 h-5 rounded-full flex items-center justify-center font-medium"
        >
          {cart.items.length}
        </div>
      )}
    </div>
  );
};

export default ShoppingCart;
