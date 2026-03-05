import { cookies } from 'next/headers'

type RequestConfig = RequestInit & {
  params?: Record<
    string,
    string | number | boolean | Array<string | number | boolean> | null | undefined
  >
  isFormData?: boolean
}

type PageInfo = {
  page: number
  size: number
  totalElements: number
  totalPages: number
}

export interface ApiResponse<T = unknown> {
  data?: T
  error?: string
  status: number
  pagination?: PageInfo
}

class ApiClient {
  private baseURL: string

  constructor(baseURL: string = process.env.NEXT_PUBLIC_API_URL || '') {
    this.baseURL = baseURL
  }

  private async getRequestHeaders(
    headers?: HeadersInit,
    isFormData?: boolean,
  ): Promise<Record<string, string>> {
    const requestHeaders: Record<string, string> = isFormData
      ? {}
      : { 'Content-Type': 'application/json' }

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
    const { params, headers, isFormData, ...restConfig } = config

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
      const requestHeaders = await this.getRequestHeaders(headers, isFormData)

      const response = await fetch(url, {
        headers: requestHeaders,
        cache: 'no-store',
        ...restConfig,
      })

      const status = response.status
      const json = await response.json().catch(() => null)

      if (!response.ok) {
        return {
          error: json?.message || response.statusText || 'An error occurred',
          status,
        }
      }

      // 백엔드 응답 { success, data, message, pagination } 구조를 자동 언래핑
      if (json && typeof json === 'object' && 'success' in json) {
        return {
          data: json.data as T,
          status,
          ...(json.pagination ? { pagination: json.pagination } : {}),
        }
      }

      return { data: json as T, status }
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

  async upload<T = unknown>(
    endpoint: string,
    formData: FormData,
    config?: RequestConfig,
  ): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, {
      ...config,
      method: 'POST',
      body: formData,
      isFormData: true,
    })
  }

  async delete<T = unknown>(
    endpoint: string,
    body?: unknown,
    config?: RequestConfig,
  ): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, {
      method: 'DELETE',
      body: body ? JSON.stringify(body) : undefined,
      ...config,
    })
  }
}

export const api = new ApiClient()
