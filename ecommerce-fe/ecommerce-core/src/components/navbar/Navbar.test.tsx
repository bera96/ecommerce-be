import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import { Navbar } from "./Navbar";
import React from "react";

jest.mock("@/assets/logo.png", () => "test-logo-path");
jest.mock("js-cookie");

jest.mock("../../store/store", () => ({
  useAppSelector: jest.fn((selector) =>
    selector({
      login: {
        user: {
          isAuthenticated: false,
        },
      },
    })
  ),
  RootState: {},
}));

jest.mock(
  "auth/LoginSlice",
  () => ({
    __esModule: true,
    default: {
      actions: {
        clearUser: jest.fn(),
        setUser: jest.fn(),
      },
    },
  }),
  { virtual: true }
);

jest.mock("../LazyComponents", () => ({
  LazyShoppingCart: () => <div data-testid="shopping-cart" />,
}));

const mockStore = configureStore([]);
const mockNavigate = jest.fn();

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockNavigate,
  useLocation: () => ({ pathname: "/" }),
}));

describe("Navbar Component", () => {
  let store: any;

  beforeEach(() => {
    store = mockStore({
      login: {
        user: {
          isAuthenticated: false,
        },
      },
    });
  });

  const renderNavbar = () => {
    return render(
      <Provider store={store}>
        <BrowserRouter>
          <Navbar />
        </BrowserRouter>
      </Provider>
    );
  };

  it("should render logo", () => {
    renderNavbar();
    const logo = screen.getByAltText("Logo");
    expect(logo).toBeInTheDocument();
  });

  it("should show login/signup for unauthenticated users", () => {
    renderNavbar();
    expect(screen.getByText("NAVBAR.LOGIN")).toBeInTheDocument();
    expect(screen.getByText("NAVBAR.SIGNUP")).toBeInTheDocument();
  });

  it("should toggle mobile menu when button is clicked", () => {
    renderNavbar();

    const menuButton = screen.getByTestId("mobile-menu-button");

    fireEvent.click(menuButton);
    expect(screen.getByRole("navigation")).toBeInTheDocument();
  });

  it("creates a React element", () => {
    const element = React.createElement("div", null, "Hello, User!");
    expect(element.type).toBe("div");
    expect(element.props.children).toBe("Hello, User!");
  });
});
