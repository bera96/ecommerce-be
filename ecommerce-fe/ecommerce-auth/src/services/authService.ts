import axios, { AxiosInstance } from "axios";
import type { LoginCredentials, SignupCredentials } from "../types/auth.types.ts";

export class AuthService {
  private axiosInstance: AxiosInstance;

  constructor() {
    this.axiosInstance = axios.create({
      baseURL: "http://localhost:3000/api/auth",
    });
  }

  async login(credentials: LoginCredentials) {
    return await this.axiosInstance.post("/login", credentials);
  }

  async signup(credentials: SignupCredentials) {
    return await this.axiosInstance.post("/signup", credentials);
  }

  async refreshToken() {
    const refreshToken = document.cookie.split("refreshToken=")[1]?.split(";")[0];
    return await this.axiosInstance.post("/refresh", null, {
      headers: {
        Authorization: `Bearer ${refreshToken}`
      }
    });
  }
}