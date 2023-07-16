import * as https from 'https';
import * as http from 'http';

export interface FetchOptions {
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE';
  headers?: Record<string, string>;
  body?: BodyInit;
}

export interface ResponseData<T> {
  code: number;
  message: string;
  data?: T;
}

export class Http {
  private static instance: Http;

  private constructor() {}

  public static getInstance(): Http {
    if (!Http.instance) {
      Http.instance = new Http();
    }

    return Http.instance;
  }

  public async get<T>(url: string, options?: FetchOptions): Promise<ResponseData<T>> {
    return this.request<T>(url, { ...options, method: 'GET' });
  }

  public async post<T>(url: string, data?: any, options?: FetchOptions): Promise<ResponseData<T>> {
    return this.request<T>(url, { ...options, method: 'POST', body: JSON.stringify(data) });
  }

  public async put<T>(url: string, data?: any, options?: FetchOptions): Promise<ResponseData<T>> {
    return this.request<T>(url, { ...options, method: 'PUT', body: JSON.stringify(data) });
  }

  public async delete<T>(url: string, options?: FetchOptions): Promise<ResponseData<T>> {
    return this.request<T>(url, { ...options, method: 'DELETE' });
  }

  public async request<T>(url: string, options?: FetchOptions): Promise<ResponseData<T>> {
    const headers = { ...options?.headers };
    headers['Content-Type'] = 'application/json';

    try {
      const response = await fetch(url, {
        method: options?.method ?? 'GET',
        headers,
        body: options?.body,
      
      });

      const responseData: ResponseData<T> = await response.json();

      if (response.ok) {
        return responseData;
      }

      throw new Error(responseData.message);
    } catch (error) {
      throw error;
    }
  }
}