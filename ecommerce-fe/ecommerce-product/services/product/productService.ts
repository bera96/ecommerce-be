import axios, { AxiosInstance } from "axios";
import toast from "react-hot-toast";

export class ProductService {
  private axiosInstance: AxiosInstance;

  constructor(baseUrl?: string) {
    const token = document.cookie.split("accessToken=")[1]?.split(";")[0];
    this.axiosInstance = axios.create({
      baseURL: baseUrl || "http://localhost:3000/api/products",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  async getProductById(id: string) {
    try {
      return await this.axiosInstance.get(`/${id}`);
    } catch (error: any) {
      const responseMessage = error.response.data.message;
      toast.error(responseMessage);
    }
  }

  async getFilteredProducts(filters: any) {
    try {
      return await this.axiosInstance.get("/filter", { params: filters });
    } catch (error: any) {
      const responseMessage = error.response.data.message;
      toast.error(responseMessage);
    }
  }

  async addToCart({ productId, quantity }: { productId: string; quantity: number }) {
    try {
      const response = await this.axiosInstance.post(`/add`, { productId, quantity });
      toast.success("Product added to cart");
      return response;
    } catch (error: any) {
      const responseMessage = error.response.data.message;
      toast.error(responseMessage);
    }
  }
}
