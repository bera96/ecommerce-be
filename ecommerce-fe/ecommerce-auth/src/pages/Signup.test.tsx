import "@testing-library/jest-dom";
import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import Signup from "./Signup";
import { useAuth } from "../utils/hooks/useAuth";

jest.mock("../assets/logo.png");

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

    expect(screen.getByLabelText(/first name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/last name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/email address/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /sign up/i })).toBeInTheDocument();
    expect(screen.getByText(/already have an account\?/i)).toBeInTheDocument();
  });

  it("shows validation errors for empty fields", async () => {
    renderSignup();

    const submitButton = screen.getByRole("button", { name: /sign up/i });
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

    const emailInput = screen.getByLabelText(/email address/i);
    fireEvent.change(emailInput, { target: { value: "invalid-email" } });

    const submitButton = screen.getByRole("button", { name: /sign up/i });
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

    fireEvent.change(screen.getByLabelText(/first name/i), {
      target: { value: mockUser.firstName },
    });
    fireEvent.change(screen.getByLabelText(/last name/i), { target: { value: mockUser.lastName } });
    fireEvent.change(screen.getByLabelText(/email address/i), {
      target: { value: mockUser.email },
    });
    fireEvent.change(screen.getByLabelText(/password/i), { target: { value: mockUser.password } });

    const submitButton = screen.getByRole("button", { name: /sign up/i });
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

    const loginLink = screen.getByText("Login");
    fireEvent.click(loginLink);

    expect(window.location.pathname).toBe("/login");
  });

  it("creates a React element", () => {
    const element = React.createElement("div", null, "Hello, User!");
    expect(element.type).toBe("div");
    expect(element.props.children).toBe("Hello, User!");
  });
});
