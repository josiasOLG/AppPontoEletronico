import axiosInstance from './base/axiosInstance';

export default abstract class ApiBase {
  protected constructor(private baseUrl: string) {}

  public async get<T>(url?: string): Promise<T> {
    const response = await axiosInstance.get<T>(`${this.baseUrl}${url}`);
    return response.data;
  }

  public async post<T, U>(url: string, data: T): Promise<U> {
    const response = await axiosInstance.post<U>(`${this.baseUrl}${url}`, data);
    return response.data;
  }

  public async put<T, U>(url: string, data: T): Promise<U> {
    const response = await axiosInstance.put<U>(`${this.baseUrl}${url}`, data);
    return response.data;
  }

  public async patch<T, U>(url: string, data: T): Promise<U> {
    const response = await axiosInstance.patch<U>(`${this.baseUrl}${url}`, data);
    return response.data;
  }

  public async delete<T>(url: string): Promise<T> {
    const response = await axiosInstance.delete<T>(`${this.baseUrl}${url}`);
    return response.data;
  }
}
