import { render, screen, waitFor } from "@testing-library/react";
import Orders from "./Order";
import { OrderService } from "../services/orderService";
import React from "react";

jest.mock("../services/orderService");

const mockOrders = [
  {
    _id: "1",
    trackingNumber: "TRK123456",
    createdAt: "2024-03-20T10:00:00.000Z",
    totalAmount: 300,
    items: [
      {
        productId: "1",
        name: "Test Product 1",
        price: 100,
        quantity: 2,
        image: "test1.jpg",
        totalAmount: 200,
      },
      {
        productId: "2",
        name: "Test Product 2",
        price: 100,
        quantity: 1,
        image: "test2.jpg",
        totalAmount: 100,
      },
    ],
  },
];

describe("Orders", () => {
  beforeEach(() => {
    (OrderService as jest.Mock).mockImplementation(() => ({
      getAllOrders: jest.fn().mockResolvedValue({ data: mockOrders }),
    }));
  });

  it("renders orders correctly", async () => {
    render(<Orders />);

    expect(screen.getByTestId("order-history-title")).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.getByTestId("order-date")).toBeInTheDocument();

      expect(screen.getByTestId("tracking-number")).toBeInTheDocument();

      expect(screen.getAllByTestId("order-product")[0]).toBeInTheDocument();
      expect(screen.getAllByTestId("order-product")[1]).toBeInTheDocument();

      expect(screen.getByTestId("order-total-amount")).toBeInTheDocument();
    });
  });

  it("renders empty orders correctly", async () => {
    (OrderService as jest.Mock).mockImplementation(() => ({
      getAllOrders: jest.fn().mockResolvedValue({ data: [] }),
    }));

    render(<Orders />);

    await waitFor(() => {
      expect(screen.getByTestId("no-orders-found")).toBeInTheDocument();
      expect(screen.getByTestId("no-orders-yet")).toBeInTheDocument();
    });
  });

  it("creates a React element", () => {
    const element = React.createElement("div", null, "Hello, User!");
    expect(element.type).toBe("div");
    expect(element.props.children).toBe("Hello, User!");
  });
});
