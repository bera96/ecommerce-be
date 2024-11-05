import { useAppSelector } from "../store/store";
import { CartItem, clearCart, setCart } from "../store/slices/cartSlice";
import { CartService } from "../services/cartService";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import React from "react";
import "../i18n/config";
import { useTranslation } from "react-i18next";
import { toast } from "react-hot-toast";

export const Cart: React.FC = () => {
  const { t } = useTranslation();
  const cart = useAppSelector((state) => state.cart);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const dispatch = useDispatch();
  const cartService = new CartService();

  useEffect(() => {
    setCartItems(cart.items);
  }, [cart.items]);

  const handleUpdateCart = (item: CartItem, change: number) => {
    const currentQuantity = cartItems.find((i) => i._id === item._id)?.quantity!;
    cartService
      .updateCart({ productId: item.productId, quantity: currentQuantity + change })
      .then(() => {
        cartService.getCart().then((res: any) => {
          dispatch(setCart(res.data));
        });
      });
  };

  const handleClearCart = () => {
    cartService.clearCart().then(() => {
      dispatch(clearCart());
    });
  };

  const handleProductRemove = (itemId: string) => {
    cartService.updateCart({ productId: itemId, quantity: 0 }).then(() => {
      cartService.getCart().then((res: any) => {
        dispatch(setCart(res.data));
        toast.success(t("SERVICE.REMOVE"));
      });
    });
  };

  const handleCheckout = () => {
    cartService.checkout().then(() => {
      dispatch(setCart({ items: [], totalAmount: 0, expiresAt: "" }));
    });
  };

  const totalAmount = cart.items?.reduce(
    (total: number, item: CartItem) => total + item.price * item.quantity,
    0
  );

  if (!cart.items?.length) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center text-gray-500">Your cart is empty</div>
      </div>
    );
  }
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-8">Shopping Cart</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-4">
          {cart.items?.map((item: CartItem) => (
            <div key={item._id} className="bg-white rounded-lg shadow-md p-4">
              <div className="flex items-center gap-4">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-24 h-24 object-cover rounded-md"
                />
                <div className="flex-1">
                  <h3 className="font-semibold text-lg">{item.name}</h3>
                  <p className="text-gray-600">${item.price}</p>
                  <div className="flex items-center gap-2 mt-2">
                    <button
                      className="px-2 py-1 border rounded"
                      onClick={() => handleUpdateCart(item, -1)}
                    >
                      -
                    </button>
                    <span>{cartItems.find((i) => i._id === item._id)?.quantity}</span>
                    <button
                      className="px-2 py-1 border rounded"
                      onClick={() => handleUpdateCart(item, +1)}
                    >
                      +
                    </button>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-semibold mb-4">${(item.price * item.quantity).toFixed(2)}</p>
                  <div className="flex flex-col">
                    <button
                      className="border-2 border-red-500 text-red-500 py-1 rounded-lg hover:bg-red-50 transition-colors"
                      onClick={() => handleProductRemove(item.productId)}
                    >
                      {t("CART.REMOVE")}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 h-fit">
          <h2 className="text-xl font-semibold mb-4" data-testid="cart-summary-title">
            {t("CART.CART_SUMMARY")}
          </h2>
          <div className="space-y-2 mb-4">
            <div className="flex justify-between">
              <span>{t("CART.SUBTOTAL")}</span>
              <span>${totalAmount.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span>{t("CART.SHIPPING")}</span>
              <span>{t("CART.FREE")}</span>
            </div>
            <div className="border-t pt-2 mt-2">
              <div className="flex justify-between font-semibold">
                <span>{t("CART.TOTAL")}</span>
                <span>${totalAmount.toFixed(2)}</span>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <button
              className="w-full border border-green-500 text-green-500 py-2 rounded-lg
                         hover:bg-green-50 transition-colors"
              onClick={handleCheckout}
            >
              {t("CART.CHECKOUT")}
            </button>
            <button
              data-testid="clear-cart-button"
              className="w-full border border-red-500 text-red-500 py-2 rounded-lg
                         hover:bg-red-50 transition-colors"
              onClick={handleClearCart}
            >
              {t("CART.CLEAR_CART")}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
