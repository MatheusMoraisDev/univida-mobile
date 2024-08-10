import { IUser } from "../interfaces/user.interface";
import { api as apiService, ApiService } from "./api";

const baseURL = process.env.EXPO_PUBLIC_BASE_URL || "http://localhost:3000/api";

class UserService {
  constructor(
    private readonly api: ApiService,
    private readonly baseURL: string,
  ) {}

  public createUser = async (data: IUser) => {
    return await this.api.post(`${this.baseURL}/v1/user`, data);
  };
}

export const userService = new UserService(apiService, baseURL);
