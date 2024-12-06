import { IContact } from "../interfaces/contact.interface";
import { IDonator } from "../interfaces/donator.interface";
import {
  IHospital,
  IHospitalAddresses,
} from "../interfaces/hospital.interface";
import { api as apiService, ApiService } from "./api";

const baseURL = process.env.EXPO_PUBLIC_BASE_URL || "http://localhost:3000/api";

export interface IAppointment {
  scheduledDate: string;
  scheduledTime: string;
  hospitalId: number;
  donatorId: number;
}

export interface IAppointmentPostResponse {
  scheduledDate: string;
  scheduledTime: string;
  donator: {
    id: number;
  };
  hospital: {
    id: number;
  };
  status: {
    id: number;
  };
  id: number;
  createdAt: string;
  updatedAt: string;
}

interface IAppointmentStatus {
  id: number;
  name: string;
}

export interface Appointment {
  id: number;
  scheduledDate: string;
  scheduledTime: string;
  createdAt: string;
  updatedAt: string;
  donator: IDonator;
  hospital: IHospital;
  status: IAppointmentStatus;
}

export interface IAppointmentParams {
  scheduledDate?: string;
  donatorId?: number;
  hospitalId?: number;
}

export interface IAppointmentPaginatedResponse {
  items: Appointment[];
  meta: {
    totalItems: number;
    itemCount: number;
    itemsPerPage: number;
    totalPages: number;
    currentPage: number;
  };
}
class AppointmentService {
  constructor(
    private readonly api: ApiService,
    private readonly baseURL: string,
  ) {}

  public createAppointment = async (
    data: IAppointment,
  ): Promise<IAppointmentPostResponse> => {
    return await this.api.post(`${this.baseURL}/v1/appointments`, data);
  };

  public getAppointments = async (
    params: IAppointmentParams,
  ): Promise<IAppointmentPaginatedResponse> => {
    return await this.api.get(`${this.baseURL}/v1/appointments`, {
      params,
    });
  };
}

export const appointmentService = new AppointmentService(apiService, baseURL);
