'use server'

import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { revalidatePath } from 'next/cache'

import { api } from '@/lib/api'
import { API_ENDPOINTS } from '@/lib/endpoints'
import { PAGE_PATHS } from '@/lib/paths'

export async function logout() {
  try {
    await api.post(API_ENDPOINTS.AUTH_LOGOUT)

    const cookieStore = await cookies()
    cookieStore.delete('accessToken')
    cookieStore.delete('refreshToken')

    revalidatePath('/', 'layout')
  } catch (error) {
    console.error('[Server Action] Logout error:', error)
  }

  redirect(PAGE_PATHS.HOME)
}
