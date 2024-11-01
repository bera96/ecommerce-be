import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { ROUTES } from "../../routes/config/routeConfig";
import Logo from "@/assets/logo.png";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";
import deleteFromCookie from "@/utils/functions/deleteFromCookie";
import { RootState } from "@/store/store";
import { useAppSelector } from "@/store/store";
import loginSlice from "auth/LoginSlice";
import { useDispatch } from "react-redux";
import Cookies from "js-cookie";
import { LazyShoppingCart } from "../LazyComponents";

export const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { isAuthenticated } = useAppSelector((state: RootState) => state.login.user);
  const { clearUser, setUser } = loginSlice.actions;

  useEffect(() => {
    const userFromCookie = Cookies.get("user");
    if (userFromCookie) {
      const userData = JSON.parse(userFromCookie);
      dispatch(setUser(userData));
    }
  }, []);

  const getLinkClassName = ({ isActive }: { isActive: boolean }) => {
    return `core-transition-colors core-duration-200 ${
      isActive ? "core-text-black core-font-medium" : "core-text-gray-400 hover:core-text-gray-600"
    }`;
  };

  return (
    <nav className="core-bg-white core-shadow-lg core-h-16">
      <div className="core-container core-mx-auto core-px-4 core-h-full">
        <div className="core-flex core-items-center core-justify-between core-h-full">
          <Link to="/">
            <img src={Logo} alt="Logo" className="core-h-10 core-w-auto" />
          </Link>

          <div className="core-hidden md:core-flex core-items-center core-space-x-4">
            {isAuthenticated ? (
              <>
                <NavLink to={ROUTES.PRODUCTS} className={getLinkClassName}>
                  Products
                </NavLink>
                <NavLink to={ROUTES.ORDERS} className={getLinkClassName}>
                  Orders
                </NavLink>
                <LazyShoppingCart
                  className={`core-size-6 core-cursor-pointer ${
                    location.pathname === ROUTES.CART
                      ? "core-text-black"
                      : "core-text-gray-400 hover:core-text-gray-600"
                  }`}
                />
                <button
                  onClick={() => {
                    deleteFromCookie(["accessToken", "refreshToken", "user"]);
                    dispatch(clearUser());
                    navigate(ROUTES.LOGIN);
                  }}
                  className="core-text-gray-400 hover:core-text-gray-600 core-transition-colors core-duration-200"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <NavLink to={ROUTES.LOGIN} className={getLinkClassName}>
                  Login
                </NavLink>
                <NavLink to={ROUTES.SIGNUP} className={getLinkClassName}>
                  Signup
                </NavLink>
              </>
            )}
          </div>

          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:core-hidden core-text-gray-500 hover:core-text-gray-700"
          >
            {isMenuOpen ? (
              <XMarkIcon className="core-h-6 core-w-6" />
            ) : (
              <Bars3Icon className="core-h-6 core-w-6" />
            )}
          </button>
        </div>

        {isMenuOpen && (
          <div className="md:core-hidden core-absolute core-top-20 core-left-0 core-right-0 core-bg-white core-shadow-lg">
            <div className="core-px-4 core-py-3 core-space-y-3">
              {isAuthenticated ? (
                <>
                  <NavLink
                    to={ROUTES.PRODUCTS}
                    className={getLinkClassName}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <div className="core-block core-py-2">Products</div>
                  </NavLink>
                  <NavLink
                    to={ROUTES.ORDERS}
                    className={getLinkClassName}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <div className="core-block core-py-2">Orders</div>
                  </NavLink>
                  <Link
                    to={ROUTES.CART}
                    className="core-flex core-items-center core-text-gray-400 hover:core-text-gray-600"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <LazyShoppingCart />
                  </Link>
                  <button
                    onClick={() => {
                      deleteFromCookie(["accessToken", "refreshToken", "user"]);
                      dispatch(clearUser());
                      navigate(ROUTES.LOGIN);
                      setIsMenuOpen(false);
                    }}
                    className="core-block core-w-full core-text-left core-py-2 core-text-gray-400 hover:core-text-gray-600"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <NavLink
                    to={ROUTES.LOGIN}
                    className={getLinkClassName}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <div className="core-block core-py-2">Login</div>
                  </NavLink>
                  <NavLink
                    to={ROUTES.SIGNUP}
                    className={getLinkClassName}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <div className="core-block core-py-2">Signup</div>
                  </NavLink>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};
