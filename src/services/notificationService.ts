import { api as apiService, ApiService } from './api'
import { config } from 'dotenv';
config(); 

const baseURL = process.env.BASE_URL || 'http://localhost:3000/api'

interface IValidateEmail {
  email: string;
  validationCode: string;
}

class NotificationService {
  constructor(private readonly api: ApiService, private readonly baseURL: string) { }

  public validateEmail = async (data: IValidateEmail) => {
    return await this.api.post(`${this.baseURL}/v1/notification/validate-email`, data);
  }

  public sendEmail = async (email: string) => {
    return await this.api.post(`${this.baseURL}/v1/notification/send-email`, email);
  }
}

export const notificationService = new NotificationService(apiService, baseURL)