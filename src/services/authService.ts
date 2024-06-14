import { api as apiService, ApiService } from './api'
import { config } from 'dotenv';
config(); 

const baseURL = process.env.BASE_URL || 'http://localhost:3000/api'

interface ILoginData {
  email: string;
  password: string;
}

class AuthService {
  constructor(private readonly api: ApiService, private readonly baseURL: string) { }

  public signIn = async (data: ILoginData) => {
    return await this.api.post(`${this.baseURL}/auth/login`, data);
  }
}

export const authService = new AuthService(apiService, baseURL)
