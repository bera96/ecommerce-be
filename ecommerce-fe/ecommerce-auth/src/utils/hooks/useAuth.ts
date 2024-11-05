import { LoginCredentials, SignupCredentials } from "../../types/auth.types";
import { AuthService } from "../../services/authService";
import Cookies from "js-cookie";
import toast from "react-hot-toast";

export const useAuth = () => {
  const authService = new AuthService();

  const handleLogin = async (credentials: LoginCredentials) => {
    try {
      const response = await authService.login(credentials);
      const { accessToken, refreshToken, ...user } = response.data;

      Cookies.set("user", JSON.stringify(user), { expires: 7 });
      Cookies.set("accessToken", accessToken, { expires: 7 });
      Cookies.set("refreshToken", refreshToken, { expires: 7 });
      return response.data;
    } catch (error: any) {
      const errorMessage = error.response.data.message;
      toast.error(errorMessage);
      throw error;
    }
  };

  const handleSignup = async (credentials: SignupCredentials) => {
    try {
      const response = await authService.signup(credentials);
      const { accessToken, refreshToken, ...user } = response.data;

      Cookies.set("user", JSON.stringify(user), { expires: 7 });
      Cookies.set("accessToken", accessToken, { expires: 7 });
      Cookies.set("refreshToken", refreshToken, { expires: 7 });
      return response.data;
    } catch (error: any) {
      const errorMessage = error.response.data.message;
      toast.error(errorMessage);
      throw error;
    }
  };

  const logout = () => {
    Cookies.remove("user");
    Cookies.remove("accessToken");
    Cookies.remove("refreshToken");
  };

  const refreshToken = async () => {
    const response = await authService.refreshToken();
    return response.data;
  };

  const getUser = () => {
    const userCookie = Cookies.get("user");
    return userCookie ? JSON.parse(userCookie) : null;
  };

  return {
    handleLogin,
    handleSignup,
    logout,
    getUser,
    refreshToken,
  };
};
