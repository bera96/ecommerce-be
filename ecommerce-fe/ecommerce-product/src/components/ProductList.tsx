import { useCallback, useEffect } from "react";
import { useState } from "react";
import { useAppSelector } from "../store/store";
import { ProductCard } from "./ProductCard";
import { useDispatch } from "react-redux";
import { setProducts } from "../store/slices/productSlice";
import { ProductService } from "../../services/product/productService";
import { debounce } from "lodash";
import React from "react";
import { useTranslation } from "react-i18next";
import "../i18n/config";

interface FilterState {
  search: string;
  page: number;
  sortBy: string;
  sortOrder: "asc" | "desc";
  minPrice?: number;
  maxPrice?: number;
}

interface ProductQuantities {
  [key: string]: number;
}

export const ProductList: React.FC = () => {
  const dispatch = useDispatch();
  const productService = new ProductService();
  const { t } = useTranslation();
  const products = useAppSelector((state) => state.product.products);
  const selectedCategory = useAppSelector((state) => state.category.selectedCategory);
  const [quantities, setQuantities] = useState<ProductQuantities>({});
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState<FilterState>({
    search: "",
    page: 1,
    sortBy: "price",
    sortOrder: "asc",
  });
  useEffect(() => {
    productService
      .getFilteredProducts({
        category: selectedCategory?._id || undefined,
        search: filters.search || undefined,
        minPrice: filters.minPrice || undefined,
        maxPrice: filters.maxPrice || undefined,
        sortBy: filters.sortBy || undefined,
        sortOrder: filters.sortOrder,
        page: filters.page,
        limit: 12,
      })
      .then((res: any) => {
        dispatch(setProducts(res.data));
      });
  }, [filters, selectedCategory]);

  const handleSortChange = (value: string) => {
    if (value === "asc") {
      setFilters((prev) => ({ ...prev, sortBy: "price", sortOrder: "asc" }));
    } else if (value === "desc") {
      setFilters((prev) => ({ ...prev, sortBy: "price", sortOrder: "desc" }));
    } else {
      setFilters((prev) => ({ ...prev, sortBy: "", sortOrder: "asc" }));
    }
  };

  const debouncedSearch = useCallback(
    debounce((value: string) => {
      setFilters((prev) => ({ ...prev, search: value, page: 1 }));
    }, 500),
    []
  );
  const handleSearchChange = (value: string) => {
    setSearchTerm(value);
    debouncedSearch(value);
  };

  const onQuantityChange = (productId: string, change: number) => {
    setQuantities((prev) => ({
      ...prev,
      [productId]: (prev[productId] || 1) + change,
    }));
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6 flex flex-col md:flex-row gap-4">
        <div className="flex-1">
          <input
            type="text"
            placeholder={t("PRODUCT_LIST.SEARCH")}
            value={searchTerm}
            onChange={(e) => handleSearchChange(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
          />
        </div>

        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative">
            <select
              value={`${filters.sortBy}_${filters.sortOrder}`}
              onChange={(e) => handleSortChange(e.target.value)}
              className="appearance-none w-full sm:w-48 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm bg-white pr-10"
            >
              <option value="asc">{t("PRODUCT_LIST.PRICE_LOW_TO_HIGH")}</option>
              <option value="desc">{t("PRODUCT_LIST.PRICE_HIGH_TO_LOW")}</option>
            </select>
            <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
              <svg
                className="w-4 h-4 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </div>
          </div>

          <div className="flex gap-2 sm:gap-4">
            <div className="flex-1 sm:flex-none">
              <input
                type="number"
                placeholder={t("PRODUCT_LIST.MIN_PRICE")}
                value={filters.minPrice || ""}
                onChange={(e) =>
                  setFilters((prev) => ({
                    ...prev,
                    minPrice: e.target.value ? Number(e.target.value) : undefined,
                    page: 1,
                  }))
                }
                className="w-full sm:w-24 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
              />
            </div>
            <div className="flex items-center">
              <span className="text-gray-500">-</span>
            </div>
            <div className="flex-1 sm:flex-none">
              <input
                type="number"
                placeholder={t("PRODUCT_LIST.MAX_PRICE")}
                value={filters.maxPrice || ""}
                onChange={(e) =>
                  setFilters((prev) => ({
                    ...prev,
                    maxPrice: e.target.value ? Number(e.target.value) : undefined,
                    page: 1,
                  }))
                }
                className="w-full sm:w-24 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
        {products?.items.map((product) => (
          <ProductCard
            key={product._id}
            product={product}
            quantity={quantities[product._id] || 1}
            onQuantityChange={(change) => onQuantityChange(product._id, change)}
          />
        ))}
      </div>

      <div className="flex justify-center items-center gap-4 mt-8">
        <button
          onClick={() => setFilters((prev) => ({ ...prev, page: prev.page - 1 }))}
          disabled={filters.page === 1}
          className="px-6 py-2 bg-gray-800 text-white rounded-lg disabled:bg-gray-400 disabled:cursor-not-allowed hover:bg-gray-700 transition-colors duration-200"
        >
          {t("PRODUCT_LIST.PREVIOUS")}
        </button>
        <span className="text-gray-600 font-medium">
          {t("PRODUCT_LIST.PAGE", { page: filters.page })}
        </span>
        <button
          onClick={() => setFilters((prev) => ({ ...prev, page: prev.page + 1 }))}
          disabled={products?.pages! <= filters.page}
          className="px-6 py-2 bg-gray-800 text-white rounded-lg disabled:bg-gray-400 disabled:cursor-not-allowed hover:bg-gray-700 transition-colors duration-200"
        >
          {t("PRODUCT_LIST.NEXT")}
        </button>
      </div>
    </div>
  );
};
