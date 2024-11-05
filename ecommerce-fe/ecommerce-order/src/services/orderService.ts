import axios, { AxiosInstance } from "axios";
import toast from "react-hot-toast";

const VITE_API_URL = process.env.VITE_API_URL;

export class OrderService {
  private axiosInstance: AxiosInstance;
  constructor() {
    const token = document.cookie.split("accessToken=")[1]?.split(";")[0];
    this.axiosInstance = axios.create({
      baseURL: `${VITE_API_URL}/api/orders`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  async getAllOrders() {
    try {
      const response = await this.axiosInstance.get("/me");
      return response;
    } catch (error: any) {
      const responseMessage = error.response.data.message;
      toast.error(responseMessage);
      throw error;
    }
  }
}
