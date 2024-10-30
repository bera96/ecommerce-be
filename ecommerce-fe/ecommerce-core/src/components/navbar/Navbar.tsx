import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { ROUTES } from "../../routes/config/routeConfig";
import Logo from "@/assets/logo.png";
import { Bars3Icon, ShoppingCartIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";
import deleteFromCookie from "@/utils/functions/deleteFromCookie";
import { RootState } from "@/store/store";
import { useAppSelector } from "@/store/store";
import loginSlice from "auth/loginSlice";
import { useDispatch } from "react-redux";
import Cookies from "js-cookie";

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
    return `transition-colors duration-200 ${
      isActive ? "text-black font-medium" : "text-gray-400 hover:text-gray-600"
    }`;
  };

  return (
    <nav className="bg-white shadow-lg h-16">
      <div className="container mx-auto px-4 h-full">
        <div className="flex items-center justify-between h-full">
          <Link to="/">
            <img src={Logo} alt="Logo" className="h-10 w-auto" />
          </Link>

          <div className="hidden md:flex items-center space-x-4">
            {isAuthenticated ? (
              <>
                <NavLink to={ROUTES.PRODUCTS} className={getLinkClassName}>
                  Products
                </NavLink>
                <NavLink to={ROUTES.ORDERS} className={getLinkClassName}>
                  Orders
                </NavLink>
                <ShoppingCartIcon
                  className={`size-6 cursor-pointer ${
                    location.pathname === ROUTES.CART
                      ? "text-black"
                      : "text-gray-400 hover:text-gray-600"
                  }`}
                />
                <button
                  onClick={() => {
                    deleteFromCookie(["accessToken", "refreshToken", "user"]);
                    dispatch(clearUser());
                    navigate(ROUTES.LOGIN);
                  }}
                  className="text-gray-400 hover:text-gray-600 transition-colors duration-200"
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
            className="md:hidden text-gray-500 hover:text-gray-700"
          >
            {isMenuOpen ? <XMarkIcon className="h-6 w-6" /> : <Bars3Icon className="h-6 w-6" />}
          </button>
        </div>

        {isMenuOpen && (
          <div className="md:hidden absolute top-20 left-0 right-0 bg-white shadow-lg">
            <div className="px-4 py-3 space-y-3">
              {isAuthenticated ? (
                <>
                  <NavLink
                    to={ROUTES.PRODUCTS}
                    className={getLinkClassName}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <div className="block py-2">Products</div>
                  </NavLink>
                  <NavLink
                    to={ROUTES.ORDERS}
                    className={getLinkClassName}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <div className="block py-2">Orders</div>
                  </NavLink>
                  <Link
                    to={ROUTES.CART}
                    className="flex items-center text-gray-400 hover:text-gray-600"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <ShoppingCartIcon className="h-6 w-6 mr-2" />
                    <span>Cart</span>
                  </Link>
                  <button
                    onClick={() => {
                      deleteFromCookie(["accessToken", "refreshToken", "user"]);
                      dispatch(clearUser());
                      navigate(ROUTES.LOGIN);
                      setIsMenuOpen(false);
                    }}
                    className="block w-full text-left py-2 text-gray-400 hover:text-gray-600"
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
                    <div className="block py-2">Login</div>
                  </NavLink>
                  <NavLink
                    to={ROUTES.SIGNUP}
                    className={getLinkClassName}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <div className="block py-2">Signup</div>
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
