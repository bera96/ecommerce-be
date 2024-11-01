import { useCallback, useEffect } from "react";
import { useState } from "react";
import { useAppSelector } from "../store/store";
import { ProductCard } from "./ProductCard";
import { useDispatch } from "react-redux";
import { setProducts } from "../store/slices/productSlice";
import { ProductService } from "../../services/product/productService";
import { debounce } from "lodash";

interface FilterState {
  search: string;
  page: number;
}

interface ProductQuantities {
  [key: string]: number;
}

export const ProductList = () => {
  const dispatch = useDispatch();
  const productService = new ProductService();
  const products = useAppSelector((state) => state.product.products);
  const [quantities, setQuantities] = useState<ProductQuantities>({});
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState<FilterState>({
    search: "",
    page: 1,
  });

  useEffect(() => {
    productService.getFilteredProducts(filters).then((res: any) => {
      dispatch(setProducts(res.data));
    });
  }, [filters]);

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
      <div className="mb-6">
        <input
          type="text"
          placeholder="Search..."
          value={searchTerm}
          onChange={(e) => handleSearchChange(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
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
          className="px-4 py-2 bg-gray-800 text-white rounded-lg disabled:bg-gray-400 disabled:cursor-not-allowed"
        >
          Previous
        </button>
        <span className="text-gray-600">Page {filters.page}</span>
        <button
          onClick={() => setFilters((prev) => ({ ...prev, page: prev.page + 1 }))}
          disabled={products?.pages! <= filters.page}
          className="px-4 py-2 bg-gray-800 text-white rounded-lg disabled:bg-gray-400 disabled:cursor-not-allowed"
        >
          Next
        </button>
      </div>
    </div>
  );
};
