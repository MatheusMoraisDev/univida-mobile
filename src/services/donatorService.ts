import { IDonator } from "../interfaces/donator.interface";
import { api as apiService, ApiService } from "./api";

const baseURL = process.env.EXPO_PUBLIC_BASE_URL || "http://localhost:3000/api";

class DonatorService {
  constructor(
    private readonly api: ApiService,
    private readonly baseURL: string,
  ) {}

  public createDonator = async (data: IDonator) => {
    return await this.api.post(`${this.baseURL}/v1/donator`, data);
  };
}

export const donatorService = new DonatorService(apiService, baseURL);
