import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

export class ApiService {
  private isAuthError = false;

  private async getToken() {
    try {
      const token = await AsyncStorage.getItem('authToken');
      return token;
    } catch (error) {
      console.error('Error getting token:', error);
      return null;
    }
  }

  public instance = axios.create({
    baseURL: 'http://172.28.80.1:3000/api',
  });

  public async initializeInterceptor() {
    const token = await this.getToken();
    if (token) {
      this.instance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    }

    this.instance.interceptors.response.use(
      (response: AxiosResponse) => {
        return response;
      },
      (error: AxiosError) => {
        let data: any = error.response?.data;
        if (
          error.response?.status === 401 &&
          data.detail !== 'No active account found with the given credentials'
        ) {
          if (!this.isAuthError) {
            this.isAuthError = true;
            // this.signOut();  // Removido
            // this.addPopup({   // Removido
            //   type: 'info',   // Removido
            //   title: 'Token expirado ou inválido.',  // Removido
            // });
          }
        }
        return Promise.reject(error);
      }
    );
  }

  public get = async (url: string, config?: AxiosRequestConfig): Promise<any> => {
    return this.instance
      .get(url, config)
      .then(x => x.data)
      .catch(err => {
        if (err?.message === 'Network Error') throw new Error('Network Error');
        if (axios.isAxiosError(err)) throw err.response?.data;
        if (err?.messages?.message === "Token is invalid or expired") throw new Error('Unauthorized');
        throw err;
      });
  };

  public post = async (url: string, params?: any, config?: AxiosRequestConfig): Promise<any> => {
    return this.instance
      .post(url, params, config)
      .then(x => x.data)
      .catch(err => {
        if (err?.message === 'Network Error') throw new Error('Network Error');
        if (axios.isAxiosError(err)) throw err.response?.data;
        if (err?.messages?.message === "Token is invalid or expired") throw new Error('Unauthorized');
        throw err;
      });
  };

  public put = async (url: string, params?: any, config?: AxiosRequestConfig): Promise<any> => {
    return this.instance
      .put(url, params, config)
      .then(x => x.data)
      .catch(err => {
        if (err?.message === 'Network Error') throw new Error('Network Error');
        if (axios.isAxiosError(err)) throw err.response?.data;
        if (err?.messages?.message === "Token is invalid or expired") throw new Error('Unauthorized');
        throw err;
      });
  };

  public delete = async (url: string, config?: AxiosRequestConfig): Promise<any> => {
    return this.instance
      .delete(url, config)
      .then(x => x.data)
      .catch(err => {
        if (err?.message === 'Network Error') throw new Error('Network Error');
        if (axios.isAxiosError(err)) throw err.response?.data;
        if (err?.messages?.message === "Token is invalid or expired") throw new Error('Unauthorized');
        throw err;
      });
  };

  public patch = async (url: string, params?: any, config?: AxiosRequestConfig): Promise<any> => {
    return this.instance
      .patch(url, params, config)
      .then(x => x.data)
      .catch(err => {
        if (err?.message === 'Network Error') throw new Error('Network Error');
        if (axios.isAxiosError(err)) throw err.response?.data;
        if (err?.messages?.message === "Token is invalid or expired") throw new Error('Unauthorized');
        throw err;
      });
  };
}

export const api = new ApiService();
api.initializeInterceptor();
