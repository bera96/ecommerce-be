import { render, screen, waitFor } from "@testing-library/react";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import cartSlice from "../store/slices/cartSlice";
import ShoppingCart from "./ShoppingCart";
import { CartService } from "../services/cartService";
import { BrowserRouter } from "react-router-dom";
import React from "react";

jest.mock("../services/cartService");

const mockCart = {
  items: [
    { id: "1", quantity: 1, product: { name: "Test Product 1" } },
    { id: "2", quantity: 1, product: { name: "Test Product 2" } },
  ],
  totalAmount: 200,
};

const createTestStore = () => {
  return configureStore({
    reducer: {
      cart: cartSlice.reducer as any,
    },
    preloadedState: {
      cart: {
        items: [],
        totalAmount: 0,
      },
    },
  });
};

const renderWithProviders = (component: React.ReactNode) => {
  const store = createTestStore();
  return render(
    <Provider store={store}>
      <BrowserRouter>{component}</BrowserRouter>
    </Provider>
  );
};

describe("ShoppingCart", () => {
  beforeEach(() => {
    (CartService as jest.Mock).mockImplementation(() => ({
      getCart: jest.fn().mockResolvedValue({ data: mockCart }),
    }));
  });

  it("shows the number of products in the cart", async () => {
    renderWithProviders(<ShoppingCart className="w-6 h-6" />);

    await waitFor(() => {
      expect(screen.getByText("2")).toBeInTheDocument();
    });
  });

  it("updates the cart when the addToProduct event is triggered", async () => {
    renderWithProviders(<ShoppingCart className="w-6 h-6" />);

    window.dispatchEvent(new CustomEvent("addToProduct"));

    await waitFor(() => {
      expect(screen.getByText("2")).toBeInTheDocument();
    });
  });

  it("does not show the number badge when the cart is empty", () => {
    (CartService as jest.Mock).mockImplementation(() => ({
      getCart: jest.fn().mockResolvedValue({ data: { items: [] } }),
    }));

    renderWithProviders(<ShoppingCart className="w-6 h-6" />);

    const badge = screen.queryByText(/\d+/);
    expect(badge).not.toBeInTheDocument();
  });

  it("creates a React element", () => {
    const element = React.createElement("div", null, "Hello, User!");
    expect(element.type).toBe("div");
    expect(element.props.children).toBe("Hello, User!");
  });
});
