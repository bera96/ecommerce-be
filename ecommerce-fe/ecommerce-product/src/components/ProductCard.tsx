import { useTranslation } from "react-i18next";
import { ProductService, VITE_API_URL } from "../../services/product/productService";
import { Product } from "../../types/product.types";
import React from "react";

interface ProductCardProps {
  product: Product;
  quantity: number;
  onQuantityChange: (change: number) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  quantity,
  onQuantityChange,
}) => {
  const { t } = useTranslation();
  const getStockStatus = (stock: number) => {
    if (stock === 0) {
      return { color: "bg-red-100 text-red-800", text: t("PRODUCT_CARD.OUT_OF_STOCK") };
    } else if (stock < 10) {
      return {
        color: "bg-orange-100 text-orange-800",
        text: t("PRODUCT_CARD.ONLY_LEFT", { stock }),
      };
    } else {
      return { color: "bg-green-100 text-green-800", text: t("PRODUCT_CARD.IN_STOCK") };
    }
  };

  const stockStatus = getStockStatus(product.stock);

  const onBuyNow = (productId: string, quantity: number) => {
    const productService = new ProductService(`${VITE_API_URL}/api/carts`);
    productService.addToCart({ productId, quantity }).then(() => {
      const addToProductEvent = new CustomEvent("addToProduct", {
        detail: { productId, quantity },
        bubbles: true,
        composed: true,
      });
      window.dispatchEvent(addToProductEvent);
    });
  };
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300">
      <div className="relative group">
        <img src={product.image} alt={product.name} className="w-full h-64 object-cover" />
        <button className="absolute top-4 right-4 p-2 rounded-full bg-white/80 hover:bg-white transition-colors">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
            />
          </svg>
        </button>
        <div
          className={`absolute top-4 left-4 px-3 py-1 rounded-full text-sm font-medium ${stockStatus.color}`}
        >
          {stockStatus.text}
        </div>
      </div>

      <div className="p-4 space-y-4">
        <h3 className="text-lg font-semibold text-gray-800 truncate">{product.name}</h3>

        <div className="flex flex-col space-y-3">
          <div className="flex justify-between items-center">
            <div className="flex flex-col">
              <span className="text-xl font-bold text-gray-900">${product.price}</span>
              <span className="text-sm text-gray-500">
                {t("PRODUCT_CARD.STOCK")}: {product.stock}
              </span>
            </div>
          </div>

          <div className="flex items-center justify-center space-x-2">
            <button
              onClick={() => onQuantityChange(-1)}
              disabled={quantity <= 1}
              className="w-8 h-8 flex items-center justify-center rounded-full border border-gray-300
                       hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-4 h-4"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 12h-15" />
              </svg>
            </button>
            <span className="w-12 text-center font-medium">{quantity}</span>
            <button
              onClick={() => onQuantityChange(1)}
              disabled={quantity >= product.stock}
              className="w-8 h-8 flex items-center justify-center rounded-full border border-gray-300
                       hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-4 h-4"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
              </svg>
            </button>
          </div>

          <button
            className={`w-full px-6 py-2 rounded-lg transition-colors ${
              product.stock === 0
                ? "bg-gray-300 cursor-not-allowed"
                : "bg-black text-white hover:bg-gray-800"
            }`}
            onClick={() => onBuyNow(product._id, quantity)}
            disabled={product.stock === 0}
          >
            {product.stock === 0 ? t("PRODUCT_CARD.OUT_OF_STOCK") : t("PRODUCT_CARD.BUY_NOW")}
          </button>
        </div>
      </div>
    </div>
  );
};
