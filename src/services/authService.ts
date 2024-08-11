import { api as apiService, ApiService } from "./api";

interface ILoginData {
  email: string;
  password: string;
}

const baseURL = process.env.EXPO_PUBLIC_BASE_URL || "http://localhost:3000/api";
class AuthService {
  constructor(
    private readonly api: ApiService,
    private readonly baseURL: string,
  ) {}

  public signIn = async (data: ILoginData) => {
    return await this.api.post(`${this.baseURL}/auth/login`, data);
  };
}

export const authService = new AuthService(apiService, baseURL);
