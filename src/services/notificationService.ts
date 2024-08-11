import { api as apiService, ApiService } from "./api";

const baseURL = process.env.EXPO_PUBLIC_BASE_URL || "http://localhost:3000/api";

interface IValidateEmail {
  user_id: number;
  validationCode: string;
}

interface ISendEmail {
  email: string;
}

class NotificationService {
  constructor(
    private readonly api: ApiService,
    private readonly baseURL: string,
  ) {}

  public validateEmail = async (data: IValidateEmail) => {
    return await this.api.post(
      `${this.baseURL}/v1/notification/validate-email`,
      data,
    );
  };

  public sendEmail = async (email: ISendEmail) => {
    return await this.api.post(
      `${this.baseURL}/v1/notification/send-email`,
      email,
    );
  };
}

export const notificationService = new NotificationService(apiService, baseURL);
