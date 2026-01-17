import { env } from "@/env";

export class ApiError extends Error {
  public status?: number;
  public code?: string;

  constructor(message: string, status?: number, code?: string) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.code = code;
  }
}

export const apiClient = {
  async request<T>(url: string, options: RequestInit = {}): Promise<T> {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 30000); // 30s timeout

    try {
      const response = await fetch(`${env.API_URL}${url}`, {
        ...options,
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          ...options.headers,
        },
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        let errorMessage = `Request failed with status ${response.status}`;

        try {
          const errorData = await response.json();
          errorMessage = errorData.error || errorData.message || errorMessage;
        } catch {
          // If JSON parsing fails, use default error message
        }

        throw new ApiError(errorMessage, response.status);
      }

      return await response.json();
    } catch (error) {
      clearTimeout(timeoutId);

      if (error instanceof ApiError) {
        throw error;
      }

      if (error instanceof Error && error.name === "AbortError") {
        throw new ApiError("Request timeout", 408);
      }

      throw new ApiError("Network error occurred");
    }
  },

  get<T>(url: string, options?: Omit<RequestInit, "method" | "body">) {
    return this.request<T>(url, { ...options, method: "GET" });
  },

  post<T>(
    url: string,
    data?: any,
    options?: Omit<RequestInit, "method" | "body">,
  ) {
    return this.request<T>(url, {
      ...options,
      method: "POST",
      body: data ? JSON.stringify(data) : undefined,
    });
  },

  put<T>(
    url: string,
    data?: any,
    options?: Omit<RequestInit, "method" | "body">,
  ) {
    return this.request<T>(url, {
      ...options,
      method: "PUT",
      body: data ? JSON.stringify(data) : undefined,
    });
  },

  delete<T>(url: string, options?: Omit<RequestInit, "method" | "body">) {
    return this.request<T>(url, { ...options, method: "DELETE" });
  },

  async download(url: string, filename?: string): Promise<void> {
    const response = await fetch(`${env.API_URL}${url}`, {
      credentials: "include",
    });

    if (!response.ok) {
      throw new ApiError(
        `Download failed with status ${response.status}`,
        response.status,
      );
    }

    const blob = await response.blob();
    const downloadUrl = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = downloadUrl;
    a.download = filename || `download-${Date.now()}`;
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(downloadUrl);
    document.body.removeChild(a);
  },
};
