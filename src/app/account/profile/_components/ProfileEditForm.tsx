'use client'

import AppButton from '@/components/ui/AppButton'
import AppFormField from '@/components/ui/AppFormField'
import AppInputText from '@/components/ui/AppInputText'
import { toast } from '@/components/ui/AppToaster'
import { Spinner } from '@/components/ui/shadcn/spinner'
import { MEMBER_PROFILE_QUERY_KEY, useMemberProfile } from '@/hooks/useMemberProfile'
import { updateMemberProfile } from '@/services/member'
import { uploadFile } from '@/services/file'
import { useQueryClient } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { z } from 'zod'
import ProfileImageEditor from './ProfileImageEditor'

const profileSchema = z.object({
  nickname: z
    .string()
    .min(1, '닉네임을 입력해주세요.')
    .max(20, '닉네임은 최대 20자까지 가능합니다.')
    .refine((val) => !/\s/.test(val), '닉네임에 공백을 포함할 수 없습니다.'),
  statusMessage: z.string().max(30, '상태메세지는 최대 30자까지 가능합니다.'),
})

type ProfileErrors = {
  nickname?: string
  statusMessage?: string
}

export default function ProfileEditForm() {
  const router = useRouter()
  const queryClient = useQueryClient()
  const { memberProfile, isLoading } = useMemberProfile()

  const [nickname, setNickname] = useState('')
  const [statusMessage, setStatusMessage] = useState('')
  const [profileImageUrl, setProfileImageUrl] = useState<string | null>(null)
  const [profileImageFileId, setProfileImageFileId] = useState<number | null>(null)
  const [errors, setErrors] = useState<ProfileErrors>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isUploading, setIsUploading] = useState(false)

  // 프로필 정보로 초기값 설정
  useEffect(() => {
    if (memberProfile) {
      setNickname(memberProfile.nickname || '')
      setStatusMessage(memberProfile.statusMessage || '')
      setProfileImageUrl(memberProfile.profileImageUrl || null)
    }
  }, [memberProfile])

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    // 이미지 파일 타입 검증
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp']
    if (!allowedTypes.includes(file.type)) {
      toast('jpg, png, gif, webp 형식의 이미지만 업로드 가능합니다.')
      return
    }

    // 파일 크기 검증 (10MB)
    const maxSize = 10 * 1024 * 1024
    if (file.size > maxSize) {
      toast('파일 크기는 최대 10MB까지 가능합니다.')
      return
    }

    // 미리보기용 DataURL 생성
    const reader = new FileReader()
    reader.onloadend = () => {
      setProfileImageUrl(reader.result as string)
    }
    reader.readAsDataURL(file)

    // 파일 업로드
    setIsUploading(true)
    try {
      const response = await uploadFile(file)

      if (response?.data?.success && response.data.data) {
        setProfileImageFileId(response.data.data)
      } else {
        toast('이미지 업로드에 실패했습니다.')
        setProfileImageUrl(null)
      }
    } catch (error) {
      console.error('이미지 업로드 실패:', error)
      toast('이미지 업로드 중 오류가 발생했습니다.')
      setProfileImageUrl(null)
    } finally {
      setIsUploading(false)
    }
  }

  const validate = () => {
    const result = profileSchema.safeParse({ nickname, statusMessage })
    if (!result.success) {
      const fieldErrors: ProfileErrors = {}
      result.error.issues.forEach((err) => {
        const field = err.path[0] as keyof ProfileErrors
        fieldErrors[field] = err.message
      })
      setErrors(fieldErrors)
      return false
    }
    setErrors({})
    return true
  }

  const handleSubmit = async () => {
    if (!validate()) return

    setIsSubmitting(true)
    try {
      const response = await updateMemberProfile({
        nickname,
        statusMessage,
        profileImageFileId: profileImageFileId || undefined,
      })

      if (response?.data?.success) {
        // 프로필 캐시 무효화하여 최신 데이터 다시 가져오기
        await queryClient.invalidateQueries({ queryKey: MEMBER_PROFILE_QUERY_KEY })
        toast('프로필이 변경됐습니다.')
        router.back()
      } else {
        toast('프로필 수정에 실패했습니다.')
      }
    } catch (error) {
      console.error('프로필 수정 실패:', error)
      toast('프로필 수정 중 오류가 발생했습니다.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div>
      <ProfileImageEditor profileImageUrl={profileImageUrl} onImageChange={handleImageChange} />
      <div className="flex flex-col gap-5 px-[15px]">
        <AppFormField label="닉네임" required error={errors.nickname}>
          {({ className }) => (
            <AppInputText
              value={nickname}
              onChange={(e) => setNickname(e.target.value.replace(/\s/g, ''))}
              placeholder="닉네임은 공백을 포함하지 않는 최대 20자까지 가능합니다."
              maxLength={20}
              className={className}
            />
          )}
        </AppFormField>
        <AppFormField label="상태메세지" error={errors.statusMessage}>
          {({ className }) => (
            <AppInputText
              value={statusMessage}
              onChange={(e) => setStatusMessage(e.target.value)}
              placeholder="상태메세지는 공백을 포함한 최대 30자까지 가능합니다."
              maxLength={30}
              className={className}
            />
          )}
        </AppFormField>
      </div>
      <div className="px-[15px] mt-[30px]">
        <AppButton
          onClick={handleSubmit}
          disabled={isSubmitting || isLoading || isUploading}
          className="text-white bg-[#a91201]"
        >
          {isUploading ? (
            <>
              이미지 업로드 중
              <Spinner />
            </>
          ) : isSubmitting ? (
            <>
              변경 중
              <Spinner />
            </>
          ) : (
            '완료'
          )}
        </AppButton>
      </div>
    </div>
  )
}
