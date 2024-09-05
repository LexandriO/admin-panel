type RequestMethodType = "GET" | "POST" | "PUT" | "DELETE";

export class Api {
  private baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  private async request<T>(resource: string, method: RequestMethodType, body?: any): Promise<T> {
    const headers = {
      "Content-Type": "application/json",
    };

    const response = await fetch(`${this.baseUrl}${resource}`, {
      method,
      headers,
      body: body ? JSON.stringify(body) : undefined,
    });

    if (!response.ok) {
      throw new Error(`Произошла ошибка! Статус: ${response.status}`);
    }

    return response.json();
  }

  public get(url: string): Promise<unknown> {
    return this.request(url, "GET");
  }

  public post(url: string, body: any): Promise<unknown> {
    return this.request(url, "POST", body);
  }

  public put(url: string, body: any): Promise<unknown> {
    return this.request(url, "PUT", body);
  }

  public delete(url: string): Promise<unknown> {
    return this.request(url, "DELETE");
  }
}
