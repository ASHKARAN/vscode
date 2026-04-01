import type { ApiError } from '@netpilot/shared-types';

export class NetPilotHttpClient {
  public constructor(private readonly baseUrl: string) {}

  public async get<T>(path: string): Promise<T> {
    return this.request<T>('GET', path);
  }

  public async post<T>(path: string, body: unknown): Promise<T> {
    return this.request<T>('POST', path, body);
  }

  private async request<T>(method: 'GET' | 'POST', path: string, body?: unknown): Promise<T> {
    const response = await fetch(this.baseUrl + path, {
      method,
      headers: {
        'content-type': 'application/json',
      },
      body: body === undefined ? undefined : JSON.stringify(body),
    });

    if (!response.ok) {
      const error = await response.json() as ApiError;
      throw new Error(`${error.code}: ${error.message}`);
    }

    return response.json() as Promise<T>;
  }
}