import axiosInstance from './base/axiosInstance';
import { handleAxiosError } from './base/handleAxiosError';

export default abstract class ApiBase {
  protected constructor(private baseUrl: string) {}

  public async get<T>(url?: string): Promise<T> {
    try {
      const response = await axiosInstance.get<T>(`${this.baseUrl}${url}`);
      // console.log('response.data>>',response.data.EscalaMotoristasDTO.EscalaMotoristaEntrada);
      return response.data;
    } catch (error) {
      handleAxiosError(error, url);
      throw error;
    }
  }

  public async post<T, U>(url: string, data: T): Promise<U> {
    try {
      const response = await axiosInstance.post<U>(`${this.baseUrl}${url}`, data);
      return response.data;
    } catch (error) {
      handleAxiosError(error, data);
      throw error;
    }
  }

  public async postFormData<T, U>(url: string, data: T) {
    try {
      const response = await axiosInstance.post<U>(`${this.baseUrl}${url}`, data, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data;
    } catch (error) {
      handleAxiosError(error, data);
      throw error;
    }
    
  }

  public async put<T, U>(url: string, data: T): Promise<U> {
    try {
      const response = await axiosInstance.put<U>(`${this.baseUrl}${url}`, data);
      return response.data;
    } catch (error) {
      handleAxiosError(error, data);
      throw error;
    }
  }

  public async patch<T, U>(url: string, data: T): Promise<U> {
    try {
      const response = await axiosInstance.patch<U>(`${this.baseUrl}${url}`, data);
      return response.data;
    } catch (error) {
      handleAxiosError(error, data);
      throw error;
    }
  }

  public async delete<T>(url: string): Promise<T> {
    try {
      const response = await axiosInstance.delete<T>(`${this.baseUrl}${url}`);
      return response.data;
    } catch (error) {
      handleAxiosError(error, url);
      throw error;
    }
  }
}
