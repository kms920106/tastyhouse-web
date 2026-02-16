import { cookies } from 'next/headers'

type RequestConfig = RequestInit & {
  params?: Record<
    string,
    string | number | boolean | Array<string | number | boolean> | null | undefined
  >
}

interface ApiResponse<T = unknown> {
  data?: T
  error?: string
  status: number
}

class ApiClient {
  private baseURL: string

  constructor(baseURL: string = process.env.NEXT_PUBLIC_API_URL || '') {
    this.baseURL = baseURL
  }

  private async getRequestHeaders(headers?: HeadersInit): Promise<Record<string, string>> {
    const requestHeaders: Record<string, string> = {
      'Content-Type': 'application/json',
    }

    const cookieStore = await cookies()
    const accessToken = cookieStore.get('accessToken')?.value

    if (accessToken) {
      requestHeaders['Authorization'] = `Bearer ${accessToken}`
    }

    if (headers) {
      Object.assign(requestHeaders, headers)
    }

    return requestHeaders
  }

  private async request<T>(endpoint: string, config: RequestConfig = {}): Promise<ApiResponse<T>> {
    const { params, headers, ...restConfig } = config

    let url = `${this.baseURL}${endpoint}`
    if (params) {
      const searchParams = new URLSearchParams()

      Object.entries(params).forEach(([key, value]) => {
        if (value == null) return

        if (Array.isArray(value)) {
          value.forEach((item) => searchParams.append(key, String(item)))
        } else {
          searchParams.append(key, String(value))
        }
      })

      const queryString = searchParams.toString()
      if (queryString) {
        url += `?${queryString}`
      }
    }

    try {
      const requestHeaders = await this.getRequestHeaders(headers)

      const response = await fetch(url, {
        headers: requestHeaders,
        cache: 'no-store',
        ...restConfig,
      })

      const status = response.status
      const data = await response.json().catch(() => null)

      if (!response.ok) {
        return {
          error: data?.message || response.statusText || 'An error occurred',
          status,
        }
      }

      return { data, status }
    } catch (error) {
      return {
        error: error instanceof Error ? error.message : 'Network error',
        status: 0,
      }
    }
  }

  async get<T = unknown>(endpoint: string, config?: RequestConfig): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, {
      method: 'GET',
      ...config,
    })
  }

  async post<T = unknown>(
    endpoint: string,
    body?: unknown,
    config?: RequestConfig,
  ): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, {
      method: 'POST',
      body: body ? JSON.stringify(body) : undefined,
      ...config,
    })
  }

  async put<T = unknown>(
    endpoint: string,
    body?: unknown,
    config?: RequestConfig,
  ): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, {
      method: 'PUT',
      body: body ? JSON.stringify(body) : undefined,
      ...config,
    })
  }

  async delete<T = unknown>(endpoint: string, config?: RequestConfig): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, {
      method: 'DELETE',
      ...config,
    })
  }
}

export const api = new ApiClient()
