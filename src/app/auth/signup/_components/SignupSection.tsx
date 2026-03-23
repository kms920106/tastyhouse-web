'use client'

import {
  checkNicknameAvailability,
  confirmEmailVerificationCode,
  sendEmailVerificationCode,
  signupFormAction,
} from '@/app/auth/signup/action'
import Header, { HeaderCenter, HeaderLeft, HeaderTitle } from '@/components/layouts/Header'
import { BackButton } from '@/components/layouts/header-parts'
import AppFormField from '@/components/ui/AppFormField'
import AppInputNumber from '@/components/ui/AppInputNumber'
import AppInputPassword from '@/components/ui/AppInputPassword'
import AppInputText from '@/components/ui/AppInputText'
import AppOutlineButton from '@/components/ui/AppOutlineButton'
import AppSelect from '@/components/ui/AppSelect'
import AppSubmitButton from '@/components/ui/AppSubmitButton'
import { toast } from '@/components/ui/AppToaster'
import BorderedSection from '@/components/ui/BorderedSection'
import CircleCheckbox from '@/components/ui/CircleCheckbox'
import FormCheckbox from '@/components/ui/FormCheckbox'
import PhoneVerificationField from '@/components/ui/PhoneVerificationField'
import SectionStack from '@/components/ui/SectionStack'
import type { Gender } from '@/domains/member'
import { usePhoneVerification } from '@/hooks/usePhoneVerification'
import { extractZodFieldErrors } from '@/lib/form'
import { cn } from '@/lib/utils'
import Image from 'next/image'
import { useActionState, useEffect, useState, useTransition } from 'react'
import { z } from 'zod'

const BIRTH_YEARS = Array.from({ length: 100 }, (_, i) => 2026 - i)
const BIRTH_MONTHS = Array.from({ length: 12 }, (_, i) => i + 1)
const BIRTH_DAYS = Array.from({ length: 31 }, (_, i) => i + 1)

const TERMS_LIST = [
  { key: 'agreedTerms', label: '이용약관 동의 (필수)', required: true, href: '/terms' },
  { key: 'agreedPrivacy', label: '개인정보처리방침 동의 (필수)', required: true, href: '/privacy' },
  {
    key: 'agreedFinance',
    label: '전자금융거래 이용약관 동의 (필수)',
    required: true,
    href: '/terms/finance',
  },
  {
    key: 'agreedAge',
    label: '만 14세 이상 이용 동의 (필수)',
    required: true,
    href: '/terms/finance',
  },
  { key: 'agreedMarketing', label: '이벤트 정보 수신 동의 (선택)', required: false, href: null },
] as const

type TermsKey = (typeof TERMS_LIST)[number]['key']

const signupSchema = z.object({
  email: z.string().superRefine((val, ctx) => {
    if (val.length === 0) {
      ctx.addIssue({ code: 'custom', message: '이메일 주소를 입력해 주세요.' })
      return
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val)) {
      ctx.addIssue({ code: 'custom', message: '올바른 이메일 주소 형식이 아닙니다.' })
    }
  }),
  password: z.string().superRefine((val, ctx) => {
    if (val.length === 0) {
      ctx.addIssue({ code: 'custom', message: '비밀번호를 입력해 주세요.' })
      return
    }
    if (
      val.length < 8 ||
      !/[A-Za-z]/.test(val) ||
      !/[0-9]/.test(val) ||
      !/[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(val)
    ) {
      ctx.addIssue({
        code: 'custom',
        message:
          '올바른 비밀번호 형식이 아닙니다. (8자 이상, 영문자·숫자·특수문자를 각각 1개 이상 포함)',
      })
    }
  }),
  passwordConfirm: z.string().superRefine((val, ctx) => {
    if (val.length === 0) {
      ctx.addIssue({ code: 'custom', message: '비밀번호를 입력해 주세요.' })
      return
    }
    if (
      val.length < 8 ||
      !/[A-Za-z]/.test(val) ||
      !/[0-9]/.test(val) ||
      !/[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(val)
    ) {
      ctx.addIssue({
        code: 'custom',
        message:
          '올바른 비밀번호 형식이 아닙니다. (8자 이상, 영문자·숫자·특수문자를 각각 1개 이상 포함)',
      })
    }
  }),
  fullName: z.string().min(1, '이름을 입력해 주세요.'),
  nickname: z.string().min(1, '닉네임을 입력해 주세요.'),
  phoneNumber: z.string().superRefine((val, ctx) => {
    if (val.length === 0) {
      ctx.addIssue({ code: 'custom', message: '휴대폰 번호를 입력해 주세요.' })
      return
    }
    if (!/^01[0-9]{8,9}$/.test(val)) {
      ctx.addIssue({
        code: 'custom',
        message: '올바른 휴대폰 번호 형식이 아닙니다. ("-" 없이 숫자만 입력)',
      })
    }
  }),
  birthYear: z.string(),
  birthMonth: z.string(),
  birthDay: z.string(),
  gender: z.enum(['MALE', 'FEMALE'], { message: '성별을 선택해 주세요.' }),
})

type FormErrors = Partial<Record<keyof z.infer<typeof signupSchema> | 'birthDate', string>>

export default function SignupSection() {
  const [email, setEmail] = useState('')
  const [emailVerifyCode, setEmailVerifyCode] = useState('')
  const [isEmailCodeVisible, setIsEmailCodeVisible] = useState(false)
  const [isEmailVerified, setIsEmailVerified] = useState(false)
  const [emailVerifyToken, setEmailVerifyToken] = useState('')
  const [isSendingEmailCode, startSendingEmailCode] = useTransition()
  const [isConfirmingEmailCode, startConfirmingEmailCode] = useTransition()

  const [password, setPassword] = useState('')
  const [passwordConfirm, setPasswordConfirm] = useState('')

  const [fullName, setFullName] = useState('')

  const [nickname, setNickname] = useState('')
  const [isNicknameChecked, setIsNicknameChecked] = useState(false)
  const [isCheckingNickname, startCheckingNickname] = useTransition()

  const phoneVerification = usePhoneVerification()

  const [birthYear, setBirthYear] = useState('')
  const [birthMonth, setBirthMonth] = useState('')
  const [birthDay, setBirthDay] = useState('')
  const [gender, setGender] = useState<Gender | null>(null)

  const [referrerNickname, setReferrerNickname] = useState('')
  const [isCheckingReferrer, startCheckingReferrer] = useTransition()

  const [agreedAll, setAgreedAll] = useState(false)
  const [agreedTerms, setAgreedTerms] = useState<Record<TermsKey, boolean>>({
    agreedTerms: false,
    agreedPrivacy: false,
    agreedFinance: false,
    agreedAge: false,
    agreedMarketing: false,
  })

  const [errors, setErrors] = useState<FormErrors>({})
  const [state, formAction, isPending] = useActionState(signupFormAction, null)

  useEffect(() => {
    if (state && !state.success) {
      toast(state.error)
    }
  }, [state])

  useEffect(() => {
    const allChecked = TERMS_LIST.every(({ key }) => agreedTerms[key])
    setAgreedAll(allChecked)
  }, [agreedTerms])

  const handleAgreedAll = (checked: boolean) => {
    setAgreedAll(checked)
    const updated = {} as Record<TermsKey, boolean>
    TERMS_LIST.forEach(({ key }) => {
      updated[key] = checked
    })
    setAgreedTerms(updated)
  }

  const handleSendEmailCode = () => {
    if (!email.trim().match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      setErrors((prev) => ({ ...prev, email: '올바른 이메일 주소를 입력해 주세요.' }))
      return
    }

    startSendingEmailCode(async () => {
      try {
        const response = await sendEmailVerificationCode(email)

        if (response?.error) {
          toast(response.error)
          return
        }

        setIsEmailCodeVisible(true)

        toast('인증 메일이 발송되었습니다.')
      } catch {
        toast('인증 메일 발송에 실패했습니다. 다시 시도해 주세요.')
      }
    })
  }

  const handleConfirmEmailCode = () => {
    startConfirmingEmailCode(async () => {
      try {
        const response = await confirmEmailVerificationCode(email, emailVerifyCode)

        if (response?.error) {
          toast(response.error)
          return
        }

        const token = response?.data?.emailVerifyToken

        if (!token) {
          toast('인증에 실패했습니다. 다시 시도해 주세요.')
          return
        }

        setEmailVerifyToken(token)
        setIsEmailVerified(true)
      } catch {
        toast('인증번호 확인에 실패했습니다. 다시 시도해 주세요.')
      }
    })
  }

  const handleCheckNickname = () => {
    if (!nickname.trim()) {
      setErrors((prev) => ({ ...prev, nickname: '닉네임을 입력해 주세요.' }))
      return
    }

    startCheckingNickname(async () => {
      try {
        const response = await checkNicknameAvailability(nickname)

        if (response?.error) {
          toast(response.error)
          return
        }

        if (response?.data?.available === false) {
          setErrors((prev) => ({ ...prev, nickname: '이미 사용 중인 닉네임입니다.' }))
          setIsNicknameChecked(false)
          return
        }

        setIsNicknameChecked(true)
        setErrors((prev) => ({ ...prev, nickname: undefined }))
      } catch {
        toast('닉네임 확인에 실패했습니다. 다시 시도해 주세요.')
      }
    })
  }

  const handleCheckReferrer = () => {
    if (!referrerNickname.trim()) return

    startCheckingReferrer(async () => {
      try {
        const response = await checkNicknameAvailability(referrerNickname)
        if (response?.error || response?.data?.available !== false) {
          toast('존재하지 않는 닉네임입니다.')
          return
        }
        toast('추천인이 확인되었습니다.')
      } catch {
        toast('추천인 확인에 실패했습니다. 다시 시도해 주세요.')
      }
    })
  }

  const validateForm = (): boolean => {
    const result = signupSchema.safeParse({
      email,
      password,
      passwordConfirm,
      fullName,
      nickname,
      phoneNumber: phoneVerification.phone,
      birthYear,
      birthMonth,
      birthDay,
      gender: gender ?? '',
    })

    const fieldErrors: FormErrors = result.success
      ? {}
      : (extractZodFieldErrors(result.error) as FormErrors)

    // 비밀번호 일치 검사
    if (
      !fieldErrors.passwordConfirm &&
      password.length > 0 &&
      passwordConfirm.length > 0 &&
      password !== passwordConfirm
    ) {
      fieldErrors.passwordConfirm = '비밀번호가 일치하지 않습니다.'
    }

    // 생년월일 검사
    const hasYear = birthYear.length > 0
    const hasMonth = birthMonth.length > 0
    const hasDay = birthDay.length > 0

    if (!hasYear || !hasMonth || !hasDay) {
      fieldErrors.birthDate = '생년월일을 선택해 주세요.'
    }

    const hasErrors = Object.values(fieldErrors).some((v) => v !== undefined)

    if (hasErrors) {
      setErrors(fieldErrors)
      return false
    }

    setErrors({})
    return true
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!validateForm()) return
    if (!isEmailVerified) {
      toast('이메일 인증을 완료해 주세요.')
      return
    }
    if (!isNicknameChecked) {
      toast('닉네임 중복확인을 해 주세요.')
      return
    }
    if (!phoneVerification.isVerified) {
      toast('휴대폰 인증을 완료해 주세요.')
      return
    }
    if (TERMS_LIST.filter((t) => t.required).some(({ key }) => !agreedTerms[key])) {
      toast('필수 약관에 동의해 주세요.')
      return
    }
    formAction(new FormData(e.currentTarget))
  }

  return (
    <section className="min-h-screen">
      <Header variant="white" height={55}>
        <HeaderLeft>
          <BackButton />
        </HeaderLeft>
        <HeaderCenter>
          <HeaderTitle>회원가입</HeaderTitle>
        </HeaderCenter>
      </Header>
      <form onSubmit={handleSubmit}>
        <SectionStack>
          <BorderedSection className="border-t-0">
            <div className="px-[15px] py-[30px] flex flex-col gap-5">
              {/* hidden */}
              <input type="hidden" name="emailVerifyToken" value={emailVerifyToken} />
              <input
                type="hidden"
                name="phoneVerifyToken"
                value={phoneVerification.phoneVerifyToken}
              />

              {/* 아이디 */}
              <AppFormField label="아이디" required error={errors.email}>
                {({ className }) => (
                  <div className="flex flex-col gap-2">
                    <div className="flex gap-2">
                      <AppInputText
                        id="email"
                        name="email"
                        placeholder="이메일을 입력해 주세요."
                        value={email}
                        onChange={(e) => {
                          setEmail(e.target.value)
                          setIsEmailVerified(false)
                          setIsEmailCodeVisible(false)
                          setEmailVerifyToken('')
                          if (errors.email) setErrors((prev) => ({ ...prev, email: undefined }))
                        }}
                        disabled={isEmailVerified}
                        className={cn(
                          'flex-1',
                          isEmailVerified && 'bg-[#f8f8f8] text-[#aaaaaa]',
                          className,
                        )}
                      />
                      <AppOutlineButton
                        type="button"
                        onClick={handleSendEmailCode}
                        disabled={!email.trim() || isEmailVerified || isSendingEmailCode}
                        className="shrink-0"
                      >
                        {isSendingEmailCode
                          ? '발송 중'
                          : isEmailCodeVisible
                            ? '재발송'
                            : '인증메일 받기'}
                      </AppOutlineButton>
                    </div>
                    {isEmailCodeVisible && (
                      <div className="flex gap-2">
                        <AppInputNumber
                          value={emailVerifyCode}
                          onChange={(e) => {
                            if (e.target.value.length <= 6) setEmailVerifyCode(e.target.value)
                          }}
                          readOnly={isEmailVerified}
                          disabled={isEmailVerified}
                          placeholder="123456"
                          maxLength={6}
                          className={cn(
                            'flex-1 pr-4',
                            isEmailVerified && 'bg-[#f8f8f8] text-[#aaaaaa]',
                          )}
                        />
                        <AppOutlineButton
                          type="button"
                          className="shrink-0"
                          onClick={handleConfirmEmailCode}
                          disabled={
                            !emailVerifyCode.trim() || isEmailVerified || isConfirmingEmailCode
                          }
                        >
                          {isConfirmingEmailCode ? '확인 중' : '확인'}
                        </AppOutlineButton>
                      </div>
                    )}
                    {isEmailVerified && (
                      <p className="text-xs leading-[12px] text-[#999999]">
                        인증이 완료되었습니다.
                      </p>
                    )}
                  </div>
                )}
              </AppFormField>

              {/* 비밀번호 */}
              <AppFormField label="비밀번호" required>
                {() => (
                  <div className="flex flex-col gap-2.5">
                    <AppInputPassword
                      id="password"
                      name="password"
                      placeholder="비밀번호를 입력해 주세요."
                      value={password}
                      onChange={(e) => {
                        setPassword(e.target.value)
                        if (errors.password) setErrors((prev) => ({ ...prev, password: undefined }))
                      }}
                      className={
                        errors.password
                          ? 'border-[#bc4040] focus-visible:border-[#bc4040]'
                          : undefined
                      }
                    />
                    {errors.password && (
                      <p className="text-xs leading-[12px] text-[#bc4040]">{errors.password}</p>
                    )}
                    <AppInputPassword
                      id="passwordConfirm"
                      name="passwordConfirm"
                      placeholder="비밀번호를 확인해 주세요."
                      value={passwordConfirm}
                      onChange={(e) => {
                        setPasswordConfirm(e.target.value)
                        if (errors.passwordConfirm)
                          setErrors((prev) => ({ ...prev, passwordConfirm: undefined }))
                      }}
                      className={
                        errors.passwordConfirm
                          ? 'border-[#bc4040] focus-visible:border-[#bc4040]'
                          : undefined
                      }
                    />
                    {errors.passwordConfirm && (
                      <p className="text-xs leading-[12px] text-[#bc4040]">
                        {errors.passwordConfirm}
                      </p>
                    )}
                  </div>
                )}
              </AppFormField>

              {/* 이름 */}
              <AppFormField label="이름" required error={errors.fullName}>
                {({ className }) => (
                  <AppInputText
                    id="fullName"
                    name="fullName"
                    placeholder="이름을 입력해 주세요."
                    value={fullName}
                    onChange={(e) => {
                      setFullName(e.target.value)
                      if (errors.fullName) setErrors((prev) => ({ ...prev, fullName: undefined }))
                    }}
                    className={className}
                  />
                )}
              </AppFormField>

              {/* 닉네임 */}
              <AppFormField label="닉네임" required error={errors.nickname}>
                {({ className }) => (
                  <div className="flex flex-col gap-2">
                    <div className="flex gap-2">
                      <AppInputText
                        id="nickname"
                        name="nickname"
                        placeholder="닉네임을 입력해 주세요."
                        value={nickname}
                        onChange={(e) => {
                          setNickname(e.target.value)
                          setIsNicknameChecked(false)
                          if (errors.nickname)
                            setErrors((prev) => ({ ...prev, nickname: undefined }))
                        }}
                        className={cn('flex-1', className)}
                      />
                      <AppOutlineButton
                        type="button"
                        onClick={handleCheckNickname}
                        disabled={!nickname.trim() || isCheckingNickname || isNicknameChecked}
                        className="shrink-0"
                      >
                        {isCheckingNickname ? '확인 중' : '중복확인'}
                      </AppOutlineButton>
                    </div>
                    {isNicknameChecked && (
                      <p className="text-xs leading-[12px] text-[#999999]">
                        사용 가능한 닉네임입니다.
                      </p>
                    )}
                  </div>
                )}
              </AppFormField>

              {/* 휴대폰 번호 */}
              <PhoneVerificationField
                verification={phoneVerification}
                error={errors.phoneNumber}
                phoneInputName="phoneNumber"
                placeholder="숫자만 입력해 주세요."
                onClearError={() => setErrors((prev) => ({ ...prev, phoneNumber: undefined }))}
                onInvalidPhone={(message) => setErrors((prev) => ({ ...prev, phoneNumber: message }))}
              />

              {/* 생년월일 */}
              <AppFormField label="생년월일" required error={errors.birthDate}>
                {() => (
                  <div className="flex gap-2">
                    <AppSelect
                      value={birthYear}
                      onChange={(e) => {
                        setBirthYear(e.target.value)
                        if (errors.birthDate)
                          setErrors((prev) => ({ ...prev, birthDate: undefined }))
                      }}
                      className={cn('flex-1', errors.birthDate && !birthYear && 'border-[#bc4040]')}
                    >
                      <option value="">년도</option>
                      {BIRTH_YEARS.map((year) => (
                        <option key={year} value={year}>
                          {year}
                        </option>
                      ))}
                    </AppSelect>
                    <AppSelect
                      value={birthMonth}
                      onChange={(e) => {
                        setBirthMonth(e.target.value)
                        if (errors.birthDate)
                          setErrors((prev) => ({ ...prev, birthDate: undefined }))
                      }}
                      className={cn(
                        'flex-1',
                        errors.birthDate && !birthMonth && 'border-[#bc4040]',
                      )}
                    >
                      <option value="">월</option>
                      {BIRTH_MONTHS.map((month) => (
                        <option key={month} value={month}>
                          {month}
                        </option>
                      ))}
                    </AppSelect>
                    <AppSelect
                      value={birthDay}
                      onChange={(e) => {
                        setBirthDay(e.target.value)
                        if (errors.birthDate)
                          setErrors((prev) => ({ ...prev, birthDate: undefined }))
                      }}
                      className={cn('flex-1', errors.birthDate && !birthDay && 'border-[#bc4040]')}
                    >
                      <option value="">일</option>
                      {BIRTH_DAYS.map((day) => (
                        <option key={day} value={day}>
                          {day}
                        </option>
                      ))}
                    </AppSelect>
                  </div>
                )}
              </AppFormField>

              {/* 성별 */}
              <AppFormField label="성별" required error={errors.gender}>
                {() => (
                  <div className="flex">
                    {(['MALE', 'FEMALE'] as const).map((value, index) => (
                      <label
                        key={value}
                        className={cn(
                          'flex-1 flex items-center justify-center h-[45px] text-sm leading-[14px] text-[#aaaaaa] border cursor-pointer transition-colors',
                          index > 0 && '-ml-px',
                          gender === value
                            ? 'border-[#a91201] text-[#a91201] z-10'
                            : errors.gender
                              ? 'border-[#bc4040]'
                              : 'border-[#eeeeee]',
                        )}
                      >
                        <input
                          type="radio"
                          name="gender"
                          value={value}
                          checked={gender === value}
                          onChange={() => {
                            setGender(value)
                            if (errors.gender) setErrors((prev) => ({ ...prev, gender: undefined }))
                          }}
                          className="sr-only"
                        />
                        {value === 'MALE' ? '남성' : '여성'}
                      </label>
                    ))}
                  </div>
                )}
              </AppFormField>

              {/* 추천인 닉네임 */}
              <AppFormField label="추천인 닉네임">
                {() => (
                  <div className="flex gap-2">
                    <AppInputText
                      id="referrerNickname"
                      name="referrerNickname"
                      placeholder="추천인 닉네임을 입력해 주세요."
                      value={referrerNickname}
                      onChange={(e) => setReferrerNickname(e.target.value)}
                      className="flex-1"
                    />
                    <AppOutlineButton
                      type="button"
                      onClick={handleCheckReferrer}
                      disabled={!referrerNickname.trim() || isCheckingReferrer}
                      className="shrink-0"
                    >
                      {isCheckingReferrer ? '확인 중' : '추천인 확인'}
                    </AppOutlineButton>
                  </div>
                )}
              </AppFormField>
            </div>
          </BorderedSection>

          {/* 약관 동의 */}
          <BorderedSection className="border-b-0">
            <div className="flex flex-col px-[15px] pt-[18px]">
              <label className="flex items-center gap-2.5 pb-2.5 border-b border-[#eeeeee] cursor-pointer">
                <CircleCheckbox checked={agreedAll} onChange={handleAgreedAll} />
                <span className="text-sm leading-[14px]">약관에 모두 동의합니다.</span>
              </label>
              <div className="flex flex-col gap-[13px] px-[5px] py-5">
                {TERMS_LIST.map(({ key, label, href }) => (
                  <div key={key} className="flex items-center justify-between">
                    <label className="flex items-center gap-[15px] cursor-pointer">
                      <FormCheckbox
                        name={key}
                        checked={agreedTerms[key]}
                        onChange={(checked) =>
                          setAgreedTerms((prev) => ({ ...prev, [key]: checked }))
                        }
                      />
                      <span className="text-[13px] leading-[13px] font-light">{label}</span>
                    </label>
                    {href && (
                      <a href={href}>
                        <Image src="/images/icon-nav-right.svg" alt="" width={6} height={10} />
                      </a>
                    )}
                  </div>
                ))}
              </div>

              {/* 가입하기 버튼 */}
              <div className="mt-5">
                <AppSubmitButton isSubmitting={isPending} loadingText="가입 중">
                  가입하기
                </AppSubmitButton>
              </div>
            </div>
          </BorderedSection>
        </SectionStack>
      </form>
    </section>
  )
}
