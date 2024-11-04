import axios, { AxiosInstance } from "axios";
import toast from "react-hot-toast";

const VITE_API_URL = process.env.VITE_API_URL;

export class CategoryService {
  private axiosInstance: AxiosInstance;

  constructor() {
    const token = document.cookie.split("accessToken=")[1]?.split(";")[0];
    this.axiosInstance = axios.create({
      baseURL: `${VITE_API_URL}/api/categories`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  async getCategories() {
    try {
      return await this.axiosInstance.get("/");
    } catch (error: any) {
      const responseMessage = error.response.data.message;
      toast.error(responseMessage);
    }
  }
}
