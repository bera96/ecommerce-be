import Cookies from "js-cookie";

export const useGetCookie = () => {
  const user = Cookies.get("user");
  const accessToken = Cookies.get("accessToken");
  const refreshToken = Cookies.get("refreshToken");

  return { user, accessToken, refreshToken };
};
