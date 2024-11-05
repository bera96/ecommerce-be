import { render, screen, fireEvent } from "@testing-library/react";
import { ProductCard } from "./ProductCard";
import { ProductService } from "../../services/product/productService";
import React from "react";

jest.mock("../../services/product/productService");

const mockProduct = {
  _id: "1",
  name: "Test Product",
  description: "Test Description",
  category: "Test Category",
  price: 99.99,
  stock: 15,
  image: "test-image.jpg",
};

describe("ProductCard", () => {
  const mockOnQuantityChange = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("product information is rendered correctly", () => {
    render(
      <ProductCard product={mockProduct} quantity={1} onQuantityChange={mockOnQuantityChange} />
    );

    expect(screen.getByText(mockProduct.name)).toBeInTheDocument();
    expect(screen.getByText(`$${mockProduct.price}`)).toBeInTheDocument();
    expect(screen.getByText(`Stock: ${mockProduct.stock}`)).toBeInTheDocument();
    expect(screen.getByAltText(mockProduct.name)).toHaveAttribute("src", mockProduct.image);
  });

  it("shows stock status correctly", () => {
    const outOfStockProduct = { ...mockProduct, stock: 0 };
    render(
      <ProductCard
        product={outOfStockProduct}
        quantity={1}
        onQuantityChange={mockOnQuantityChange}
      />
    );

    const stockBadge = screen.getAllByText("PRODUCT_CARD.OUT_OF_STOCK", {
      selector: ".absolute.top-4.left-4",
    });
    expect(stockBadge[0]).toBeInTheDocument();
    expect(stockBadge[0]).toHaveClass("bg-red-100", "text-red-800");

    const buyButton = screen.getAllByRole("button", {
      name: "PRODUCT_CARD.OUT_OF_STOCK",
    });
    expect(buyButton[0]).toBeDisabled();
  });

  it("Buy Now button is disabled when stock is zero", () => {
    const outOfStockProduct = { ...mockProduct, stock: 0 };
    render(
      <ProductCard
        product={outOfStockProduct}
        quantity={1}
        onQuantityChange={mockOnQuantityChange}
      />
    );

    const buyButton = screen.getByRole("button", { name: "PRODUCT_CARD.OUT_OF_STOCK" });
    expect(buyButton).toBeDisabled();
  });

  it("Buy Now button adds product to cart", async () => {
    const mockAddToCart = jest.fn().mockResolvedValue({});
    (ProductService as jest.Mock).mockImplementation(() => ({
      addToCart: mockAddToCart,
    }));

    render(
      <ProductCard product={mockProduct} quantity={1} onQuantityChange={mockOnQuantityChange} />
    );

    const buyButton = screen.getByRole("button", { name: "PRODUCT_CARD.BUY_NOW" });
    fireEvent.click(buyButton);

    expect(mockAddToCart).toHaveBeenCalledWith({
      productId: mockProduct._id,
      quantity: 1,
    });
  });

  it("creates a React element", () => {
    const element = React.createElement("div", null, "Hello, User!");
    expect(element.type).toBe("div");
    expect(element.props.children).toBe("Hello, User!");
  });
});
