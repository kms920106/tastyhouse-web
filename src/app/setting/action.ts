'use server'

import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { revalidatePath } from 'next/cache'

import { AUTH_COOKIE_KEYS } from '@/lib/auth-config'
import { api } from '@/lib/api'
import { PAGE_PATHS } from '@/lib/paths'

const AUTH_LOGOUT_ENDPOINT = '/api/auth/v1/logout'

export async function logout() {
  try {
    await api.post(AUTH_LOGOUT_ENDPOINT)

    const cookieStore = await cookies()
    cookieStore.delete(AUTH_COOKIE_KEYS.ACCESS_TOKEN)
    cookieStore.delete(AUTH_COOKIE_KEYS.REFRESH_TOKEN)

    revalidatePath('/', 'layout')
  } catch (error) {
    console.error('[Server Action] Logout error:', error)
  }

  redirect(PAGE_PATHS.HOME)
}
