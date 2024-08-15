import { IDonator, IDonatorParams } from "../interfaces/donator.interface";
import { IPaginationProps } from "../interfaces/pagination.interface";
import { api as apiService, ApiService } from "./api";

const baseURL = process.env.EXPO_PUBLIC_BASE_URL || "http://localhost:3000/api";

class DonatorService {
  constructor(
    private readonly api: ApiService,
    private readonly baseURL: string,
  ) {}

  public createDonator = async (data: IDonator): Promise<IDonator> => {
    return await this.api.post(`${this.baseURL}/v1/donator`, data);
  };

  public getDonator = async (
    params: IDonatorParams,
  ): Promise<IPaginationProps<IDonator>> => {
    return await this.api.get(`${this.baseURL}/v1/donator`, { params });
  };

  public getDonatorById = async (id: number): Promise<IDonator> => {
    return await this.api.get(`${this.baseURL}/v1/donator/${id}`);
  };
}

export const donatorService = new DonatorService(apiService, baseURL);
