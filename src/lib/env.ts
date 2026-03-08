import { z } from 'zod'

const envSchema = z.object({
  NEXT_PUBLIC_API_URL: z.string().url(),
  NEXT_PUBLIC_SITE_URL: z.string().url(),
  NEXT_PUBLIC_KAKAO_MAP_CLIENT: z.string().min(1),
  NEXT_PUBLIC_TOSSPAY_CLIENT_KEY: z.string().min(1),
  NEXT_PUBLIC_TOSSPAY_CUSTOMER_KEY: z.string().min(1),
  TOSS_PAYMENTS_SECRET_KEY: z.string().min(1),
  UPLOAD_DIR: z.string().optional(),
})

const parsed = envSchema.safeParse(process.env)

if (!parsed.success) {
  const missing = parsed.error.issues.map((issue) => issue.path.join('.')).join(', ')
  throw new Error(`환경 변수 검증 실패: ${missing}`)
}

export const env = parsed.data
