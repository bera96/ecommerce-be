import { render, screen, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import { SubNavBar } from "./SubNavBar";
import { configureStore } from "@reduxjs/toolkit";
import categoryReducer from "../store/slices/categorySlice";
import React from "react";

const mockCategories = [
  { _id: "1", name: "Electronics" },
  { _id: "2", name: "Clothing" },
];

const createTestStore = (initialState = {}) => {
  return configureStore({
    reducer: {
      category: categoryReducer.reducer as any,
    },
    preloadedState: {
      category: {
        categories: mockCategories,
        selectedCategory: null,
        ...initialState,
      },
    },
  });
};

describe("SubNavBar", () => {
  it("renders categories correctly", () => {
    const store = createTestStore();

    render(
      <Provider store={store}>
        <SubNavBar />
      </Provider>
    );

    mockCategories.forEach((category) => {
      expect(screen.getByText(category.name)).toBeInTheDocument();
    });
  });

  it("dispatches setSelectedCategory action when category button is clicked", () => {
    const store = createTestStore();

    render(
      <Provider store={store}>
        <SubNavBar />
      </Provider>
    );

    const categoryButton = screen.getByText(mockCategories[0].name);
    fireEvent.click(categoryButton);

    const actions = (store.getState() as any).category.selectedCategory;
    expect(actions).toEqual(mockCategories[0]);
  });

  it("creates a React element", () => {
    const element = React.createElement("div", null, "Hello, User!");
    expect(element.type).toBe("div");
    expect(element.props.children).toBe("Hello, User!");
  });
});
