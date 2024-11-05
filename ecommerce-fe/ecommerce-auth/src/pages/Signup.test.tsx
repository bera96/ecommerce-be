import "@testing-library/jest-dom";
import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import Signup from "./Signup";
import { useAuth } from "../utils/hooks/useAuth";

jest.mock("../assets/Logo.png");

jest.mock("../utils/hooks/useAuth");

const mockStore = configureStore([]);
const mockNavigate = jest.fn();

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockNavigate,
}));

describe("Signup Component", () => {
  let store: any;
  const mockHandleSignup = jest.fn();

  beforeEach(() => {
    store = mockStore({
      login: {
        user: {
          isAuthenticated: false,
        },
      },
    });

    (useAuth as jest.Mock).mockReturnValue({
      handleSignup: mockHandleSignup,
    });
  });

  const renderSignup = () => {
    return render(
      <Provider store={store}>
        <BrowserRouter>
          <Signup />
        </BrowserRouter>
      </Provider>
    );
  };

  it("renders signup form correctly", () => {
    renderSignup();

    expect(screen.getByTestId("first-name-input")).toBeInTheDocument();
    expect(screen.getByTestId("last-name-input")).toBeInTheDocument();
    expect(screen.getByTestId("email-input")).toBeInTheDocument();
    expect(screen.getByTestId("password-input")).toBeInTheDocument();
    expect(screen.getByTestId("submit-button")).toBeInTheDocument();
    expect(screen.getByTestId("login-link-text")).toBeInTheDocument();
  });

  it("shows validation errors for empty fields", async () => {
    renderSignup();

    const submitButton = screen.getByTestId("submit-button");
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText(/first name is required/i)).toBeInTheDocument();
      expect(screen.getByText(/last name is required/i)).toBeInTheDocument();
      expect(screen.getByText(/email is required/i)).toBeInTheDocument();
      expect(screen.getByText(/password is required/i)).toBeInTheDocument();
    });
  });

  it("shows error for invalid email format", async () => {
    renderSignup();

    const emailInput = screen.getByTestId("email-input");
    fireEvent.change(emailInput, { target: { value: "invalid-email" } });

    const submitButton = screen.getByTestId("submit-button");
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText(/invalid email/i)).toBeInTheDocument();
    });
  });

  it("submits form with valid data", async () => {
    const mockUser = {
      firstName: "John",
      lastName: "Doe",
      email: "john@example.com",
      password: "password123",
    };

    mockHandleSignup.mockResolvedValueOnce({ id: 1, ...mockUser });

    renderSignup();

    fireEvent.change(screen.getByTestId("first-name-input"), {
      target: { value: mockUser.firstName },
    });
    fireEvent.change(screen.getByTestId("last-name-input"), {
      target: { value: mockUser.lastName },
    });
    fireEvent.change(screen.getByTestId("email-input"), {
      target: { value: mockUser.email },
    });
    fireEvent.change(screen.getByTestId("password-input"), {
      target: { value: mockUser.password },
    });

    const submitButton = screen.getByTestId("submit-button");
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(mockHandleSignup).toHaveBeenCalledWith(mockUser);
    });
  });

  it("navigates to products page after successful signup", async () => {
    store = mockStore({
      login: {
        user: {
          isAuthenticated: true,
        },
      },
    });

    renderSignup();

    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith("/products");
    });
  });

  it("navigates to login page when clicking login link", () => {
    renderSignup();

    const loginLink = screen.getByTestId("login-link");
    fireEvent.click(loginLink);

    expect(window.location.pathname).toBe("/login");
  });

  it("creates a React element", () => {
    const element = React.createElement("div", null, "Hello, User!");
    expect(element.type).toBe("div");
    expect(element.props.children).toBe("Hello, User!");
  });
});
