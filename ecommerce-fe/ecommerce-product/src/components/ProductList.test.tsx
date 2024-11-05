import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { Provider } from "react-redux";
import { ProductList } from "./ProductList";
import { configureStore } from "@reduxjs/toolkit";
import productSlice from "../store/slices/productSlice";
import categorySlice from "../store/slices/categorySlice";
import { ProductService } from "../../services/product/productService";
import React from "react";

jest.mock("../../services/product/productService");

const mockProducts = {
  items: [
    {
      _id: "1",
      name: "Test Product 1",
      description: "Test Product 1 Description",
      category: "Test Category 1",
      price: 100,
      stock: 10,
      image: "test1.jpg",
    },
    {
      _id: "2",
      name: "Test Product 2",
      description: "Test Product 2 Description",
      category: "Test Category 2",
      price: 200,
      stock: 5,
      image: "test2.jpg",
    },
  ],
  pages: 2,
  total: 2,
  page: 1,
  limit: 10,
};

const createTestStore = () => {
  return configureStore({
    reducer: {
      product: productSlice.reducer,
      category: categorySlice.reducer,
    },
    preloadedState: {
      product: {
        products: mockProducts,
        selectedProduct: null,
      },
      category: {
        categories: [],
        selectedCategory: null,
        loading: false,
        error: null,
      },
    },
  });
};

describe("ProductList", () => {
  let store: ReturnType<typeof createTestStore>;

  beforeEach(() => {
    store = createTestStore();
    (ProductService as jest.Mock).mockImplementation(() => ({
      getFilteredProducts: jest.fn().mockResolvedValue({
        data: mockProducts,
      }),
    }));
  });

  const renderWithProvider = (component: React.ReactNode) => {
    return render(<Provider store={store}>{component}</Provider>);
  };

  it("products are rendered correctly", async () => {
    renderWithProvider(<ProductList />);

    await waitFor(() => {
      mockProducts.items.forEach((product) => {
        expect(screen.getByText(product.name)).toBeInTheDocument();
      });
    });
  });

  it("search input works", async () => {
    renderWithProvider(<ProductList />);

    const searchInput = screen.getByTestId("search-input");
    fireEvent.change(searchInput, { target: { value: "test search" } });

    expect(searchInput).toHaveValue("test search");
  });

  it("sorting option works", async () => {
    renderWithProvider(<ProductList />);

    const sortSelect = screen.getByRole("combobox");
    fireEvent.change(sortSelect, { target: { value: "asc" } });

    expect(sortSelect).toHaveValue("asc");
  });

  it("pagination buttons work correctly", async () => {
    renderWithProvider(<ProductList />);

    const nextButton = screen.getByTestId("next-button");
    const previousButton = screen.getByTestId("previous-button");

    expect(previousButton).toBeDisabled();
    expect(nextButton).not.toBeDisabled();

    fireEvent.click(nextButton);
  });

  it("price filters work", async () => {
    renderWithProvider(<ProductList />);

    const minPriceInput = screen.getByTestId("min-price-input");
    const maxPriceInput = screen.getByTestId("max-price-input");

    fireEvent.change(minPriceInput, { target: { value: "50" } });
    fireEvent.change(maxPriceInput, { target: { value: "500" } });

    expect(minPriceInput).toHaveValue(50);
    expect(maxPriceInput).toHaveValue(500);
  });

  it("creates a React element", () => {
    const element = React.createElement("div", null, "Hello, User!");
    expect(element.type).toBe("div");
    expect(element.props.children).toBe("Hello, User!");
  });
});
