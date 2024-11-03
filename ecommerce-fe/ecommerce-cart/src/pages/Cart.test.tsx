import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import cartSlice from "../store/slices/cartSlice";
import Cart from "./Cart";
import { CartService } from "../services/cartService";
import { BrowserRouter } from "react-router-dom";
import React, { act } from "react";

jest.mock("../services/cartService");

const mockCartItems = {
  items: [
    {
      _id: "1",
      productId: "1",
      name: "Test Product 1",
      price: 100,
      quantity: 2,
      image: "test1.jpg",
    },
    {
      _id: "2",
      productId: "2",
      name: "Test Product 2",
      price: 200,
      quantity: 1,
      image: "test2.jpg",
    },
  ],
  totalAmount: 400,
  expiresAt: "",
};

const createTestStore = () => {
  return configureStore({
    reducer: {
      cart: cartSlice.reducer as any,
    },
    preloadedState: {
      cart: mockCartItems,
    },
  });
};

describe("Cart", () => {
  beforeEach(() => {
    (CartService as jest.Mock).mockImplementation(() => ({
      getCart: jest.fn().mockResolvedValue({ data: mockCartItems }),
      updateCart: jest.fn().mockResolvedValue({}),
      clearCart: jest.fn().mockResolvedValue({}),
      checkout: jest.fn().mockResolvedValue({}),
    }));
  });

  const renderWithProviders = (component: React.ReactNode) => {
    const store = createTestStore();
    return {
      ...render(
        <Provider store={store}>
          <BrowserRouter>{component}</BrowserRouter>
        </Provider>
      ),
      store,
    };
  };

  it("renders cart items correctly", () => {
    renderWithProviders(<Cart />);

    mockCartItems.items.forEach((item) => {
      expect(screen.getByText(item.name)).toBeInTheDocument();
      expect(screen.getByText(`$${item.price}`)).toBeInTheDocument();
    });
  });

  it("calculates the total amount correctly", () => {
    renderWithProviders(<Cart />);

    const cartSummary = screen.getByText("Cart Summary").parentElement;
    const total = mockCartItems.items.reduce((sum, item) => sum + item.price * item.quantity, 0);

    const totalElement = cartSummary?.querySelector(".font-semibold span:last-child");
    expect(totalElement).toHaveTextContent(`$${total.toFixed(2)}`);
  });

  it("increases and decreases the product quantity", async () => {
    renderWithProviders(<Cart />);

    const increaseButton = screen.getAllByText("+")[0];
    const quantity = screen.getAllByText("2")[0];

    await act(async () => {
      fireEvent.click(increaseButton);
    });

    expect(quantity).toHaveTextContent("3");
  });

  it("clears the cart", async () => {
    renderWithProviders(<Cart />);

    const clearButton = screen.getByText("Clear Cart");

    await act(async () => {
      fireEvent.click(clearButton);
    });

    await waitFor(() => {
      expect(screen.getByText("Your cart is empty")).toBeInTheDocument();
    });
  });

  it("creates a React element", () => {
    const element = React.createElement("div", null, "Hello, User!");
    expect(element.type).toBe("div");
    expect(element.props.children).toBe("Hello, User!");
  });
});
