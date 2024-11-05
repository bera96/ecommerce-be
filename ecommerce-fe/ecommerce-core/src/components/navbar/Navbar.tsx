import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { ROUTES } from "../../routes/config/routeConfig";
import Logo from "@/assets/Logo.png";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";
import deleteFromCookie from "./../../utils/functions/deleteFromCookie";
import { RootState } from "./../../store/store";
import { useAppSelector } from "./../../store/store";
import loginSlice from "auth/LoginSlice";
import { useDispatch } from "react-redux";
import Cookies from "js-cookie";
import { LazyShoppingCart } from "../LazyComponents";
import React from "react";
import { useTranslation } from "react-i18next";

export const Navbar: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { isAuthenticated } = useAppSelector((state: RootState) => state.login.user);
  const { clearUser, setUser } = loginSlice.actions;
  const { t, i18n } = useTranslation();

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };

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
                  {t("NAVBAR.PRODUCTS")}
                </NavLink>
                <NavLink to={ROUTES.ORDERS} className={getLinkClassName}>
                  {t("NAVBAR.ORDERS")}
                </NavLink>
                <LazyShoppingCart
                  className={`core-size-6 core-cursor-pointer ${
                    location.pathname === ROUTES.CART
                      ? "core-text-black"
                      : "core-text-gray-400 hover:core-text-gray-600"
                  }`}
                />
                <div className="core-flex core-items-center core-space-x-2">
                  <button
                    onClick={() => changeLanguage("tr")}
                    className={`core-px-2 core-py-1 core-rounded ${
                      i18n.language === "tr"
                        ? "core-bg-gray-200 core-text-black"
                        : "core-text-gray-400 hover:core-text-gray-600"
                    }`}
                  >
                    TR
                  </button>
                  <button
                    onClick={() => changeLanguage("en")}
                    className={`core-px-2 core-py-1 core-rounded ${
                      i18n.language === "en"
                        ? "core-bg-gray-200 core-text-black"
                        : "core-text-gray-400 hover:core-text-gray-600"
                    }`}
                  >
                    EN
                  </button>
                </div>
                <button
                  onClick={() => {
                    deleteFromCookie(["accessToken", "refreshToken", "user"]);
                    dispatch(clearUser());
                    navigate(ROUTES.LOGIN);
                  }}
                  className="core-text-gray-400 hover:core-text-gray-600 core-transition-colors core-duration-200"
                >
                  {t("NAVBAR.LOGOUT")}
                </button>
              </>
            ) : (
              <>
                <NavLink to={ROUTES.LOGIN} className={getLinkClassName}>
                  {t("NAVBAR.LOGIN")}
                </NavLink>
                <NavLink to={ROUTES.SIGNUP} className={getLinkClassName}>
                  {t("NAVBAR.SIGNUP")}
                </NavLink>
                <div className="core-flex core-items-center core-space-x-2">
                  <button
                    onClick={() => changeLanguage("tr")}
                    className={`core-px-2 core-py-1 core-rounded ${
                      i18n.language === "tr"
                        ? "core-bg-gray-200 core-text-black"
                        : "core-text-gray-400 hover:core-text-gray-600"
                    }`}
                  >
                    TR
                  </button>
                  <button
                    onClick={() => changeLanguage("en")}
                    className={`core-px-2 core-py-1 core-rounded ${
                      i18n.language === "en"
                        ? "core-bg-gray-200 core-text-black"
                        : "core-text-gray-400 hover:core-text-gray-600"
                    }`}
                  >
                    EN
                  </button>
                </div>
              </>
            )}
          </div>

          <button
            data-testid="mobile-menu-button"
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
                    <div className="core-block core-py-2">{t("NAVBAR.PRODUCTS")}</div>
                  </NavLink>
                  <NavLink
                    to={ROUTES.ORDERS}
                    className={getLinkClassName}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <div className="core-block core-py-2">{t("NAVBAR.ORDERS")}</div>
                  </NavLink>
                  <Link
                    to={ROUTES.CART}
                    className="core-flex core-items-center core-text-gray-400 hover:core-text-gray-600"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <LazyShoppingCart />
                  </Link>
                  <div className="core-flex core-items-center core-space-x-2 core-py-2">
                    <button
                      onClick={() => {
                        changeLanguage("tr");
                        setIsMenuOpen(false);
                      }}
                      className={`core-px-2 core-py-1 core-rounded ${
                        i18n.language === "tr"
                          ? "core-bg-gray-200 core-text-black"
                          : "core-text-gray-400 hover:core-text-gray-600"
                      }`}
                    >
                      TR
                    </button>
                    <button
                      onClick={() => {
                        changeLanguage("en");
                        setIsMenuOpen(false);
                      }}
                      className={`core-px-2 core-py-1 core-rounded ${
                        i18n.language === "en"
                          ? "core-bg-gray-200 core-text-black"
                          : "core-text-gray-400 hover:core-text-gray-600"
                      }`}
                    >
                      EN
                    </button>
                  </div>
                  <button
                    onClick={() => {
                      deleteFromCookie(["accessToken", "refreshToken", "user"]);
                      dispatch(clearUser());
                      navigate(ROUTES.LOGIN);
                      setIsMenuOpen(false);
                    }}
                    className="core-block core-w-full core-text-left core-py-2 core-text-gray-400 hover:core-text-gray-600"
                  >
                    {t("NAVBAR.LOGOUT")}
                  </button>
                </>
              ) : (
                <>
                  <NavLink
                    to={ROUTES.LOGIN}
                    className={getLinkClassName}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <div className="core-block core-py-2">{t("NAVBAR.LOGIN")}</div>
                  </NavLink>
                  <NavLink
                    to={ROUTES.SIGNUP}
                    className={getLinkClassName}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <div className="core-block core-py-2">{t("NAVBAR.SIGNUP")}</div>
                  </NavLink>
                  <div className="core-flex core-items-center core-space-x-2 core-py-2">
                    <button
                      onClick={() => {
                        changeLanguage("tr");
                        setIsMenuOpen(false);
                      }}
                      className={`core-px-2 core-py-1 core-rounded ${
                        i18n.language === "tr"
                          ? "core-bg-gray-200 core-text-black"
                          : "core-text-gray-400 hover:core-text-gray-600"
                      }`}
                    >
                      TR
                    </button>
                    <button
                      onClick={() => {
                        changeLanguage("en");
                        setIsMenuOpen(false);
                      }}
                      className={`core-px-2 core-py-1 core-rounded ${
                        i18n.language === "en"
                          ? "core-bg-gray-200 core-text-black"
                          : "core-text-gray-400 hover:core-text-gray-600"
                      }`}
                    >
                      EN
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};
