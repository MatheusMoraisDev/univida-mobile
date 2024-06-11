import { api as apiService, ApiService } from './api'

const baseURL = 'http://192.168.1.5:3000/api'


interface ILoginData {
  email: string;
  password: string;
}

class AuthService {
  constructor(private readonly api: ApiService, private readonly baseURL: string) { }

  public signIn = async (data: ILoginData) => {
    console.log(`${this.baseURL}/auth/login`)
    return await this.api.post(`${this.baseURL}/auth/login`, data);
  }
}

export const authService = new AuthService(apiService, baseURL)
