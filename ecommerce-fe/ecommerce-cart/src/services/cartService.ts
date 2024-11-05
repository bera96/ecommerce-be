import axios, { AxiosInstance } from "axios";
import toast from "react-hot-toast";
import i18next from "i18next";

const VITE_API_URL = process.env.VITE_API_URL;

export class CartService {
  private axiosInstance: AxiosInstance;

  constructor() {
    const token = document.cookie.split("accessToken=")[1]?.split(";")[0];
    this.axiosInstance = axios.create({
      baseURL: `${VITE_API_URL}/api/carts`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  async getCart() {
    try {
      return await this.axiosInstance.get("/me");
    } catch (error: any) {
      const responseMessage = error.response.data.message;
      toast.error(responseMessage);
      throw error;
    }
  }

  async clearCart() {
    try {
      const response = await this.axiosInstance.delete("/clear");
      toast.success(i18next.t("SERVICE.CLEAR_CART"));
      return response;
    } catch (error: any) {
      const responseMessage = error.response.data.message;
      toast.error(responseMessage);
      throw error;
    }
  }

  async updateCart({ productId, quantity }: { productId: string; quantity: number }) {
    try {
      const response = await this.axiosInstance.put("/update", {
        productId,
        quantity,
      });
      return response;
    } catch (error: any) {
      const responseMessage = error.response.data.message;
      toast.error(responseMessage);
      throw error;
    }
  }

  async checkout() {
    try {
      const response = await this.axiosInstance.post("/checkout");
      toast.success(i18next.t("SERVICE.CHECKOUT"));
      return response;
    } catch (error: any) {
      const responseMessage = error.response.data.message;
      toast.error(responseMessage);
      throw error;
    }
  }
}
