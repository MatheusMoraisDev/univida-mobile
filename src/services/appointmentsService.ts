import { api as apiService, ApiService } from "./api";

const baseURL = process.env.EXPO_PUBLIC_BASE_URL || "http://localhost:3000/api";

export interface IAppointment {
  scheduledDate: string;
  scheduledTime: string;
  hospitalId: number;
  donatorId: number;
}

export interface IAppointmentResponse {
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

class AppointmentService {
  constructor(
    private readonly api: ApiService,
    private readonly baseURL: string,
  ) {}

  public createAppointment = async (
    data: IAppointment,
  ): Promise<IAppointmentResponse> => {
    return await this.api.post(`${this.baseURL}/v1/appointments`, data);
  };
}

export const appointmentService = new AppointmentService(apiService, baseURL);
