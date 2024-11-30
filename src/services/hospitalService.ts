import { IHospital, IHospitalAddresses, IHospitalParams } from "../interfaces/hospital.interface";
import { IPaginationProps } from "../interfaces/pagination.interface";
import { api as apiService, ApiService } from "./api";

const baseURL = process.env.EXPO_PUBLIC_BASE_URL || "http://localhost:3000/api";

class HospitalService {
  constructor(
    private readonly api: ApiService,
    private readonly baseURL: string,
  ) { }

  public createHospital = async (data: IHospital): Promise<IHospital> => {
    return await this.api.post(`${this.baseURL}/v1/hospital`, data);
  };

  public getHospital = async (
    params: IHospitalParams,
  ): Promise<IPaginationProps<IHospital>> => {
    return await this.api.get(`${this.baseURL}/v1/hospital`, { params });
  };

  public getNerbys = async (
    lat?: number,
    lng?: number,
  ): Promise<IHospitalAddresses[]> => {
    return await this.api.get(`${this.baseURL}/v1/hospital/${lat}/${lng}`);
  };

  public getHospitalById = async (id: number): Promise<IHospital> => {
    return await this.api.get(`${this.baseURL} / v1 / hospital / ${id}`);
  };
}

export const hospitalService = new HospitalService(apiService, baseURL);
