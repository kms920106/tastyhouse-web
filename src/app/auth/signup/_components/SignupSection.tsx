'use client'

import {
  checkNicknameDuplicate,
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
import CircleCheckbox from '@/components/ui/CircleCheckbox'
import FormCheckbox from '@/components/ui/FormCheckbox'
import type { Gender } from '@/domains/member'
import { extractZodFieldErrors } from '@/lib/form'
import { cn } from '@/lib/utils'
import {
  confirmPhoneVerificationCode,
  sendPhoneVerificationCode,
} from '@/services/phone-verification'
import { useActionState, useEffect, useState, useTransition } from 'react'
import { MdChevronRight } from 'react-icons/md'
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
  { key: 'agreedAge', label: '만 14세 이상 이용 동의 (필수)', required: true, href: null },
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
        message: '올바른 비밀번호 형식이 아닙니다. (8자 이상, 영문자·숫자·특수문자를 각각 1개 이상 포함)',
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
        message: '올바른 비밀번호 형식이 아닙니다. (8자 이상, 영문자·숫자·특수문자를 각각 1개 이상 포함)',
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

  const [phoneNumber, setPhoneNumber] = useState('')
  const [phoneVerifyCode, setPhoneVerifyCode] = useState('')
  const [isPhoneCodeVisible, setIsPhoneCodeVisible] = useState(false)
  const [isPhoneVerified, setIsPhoneVerified] = useState(false)
  const [phoneVerifyToken, setPhoneVerifyToken] = useState('')
  const [isSendingPhoneCode, startSendingPhoneCode] = useTransition()
  const [isConfirmingPhoneCode, startConfirmingPhoneCode] = useTransition()

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
        const response = await checkNicknameDuplicate(nickname)

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

        toast('사용 가능한 닉네임입니다.')
      } catch {
        toast('닉네임 확인에 실패했습니다. 다시 시도해 주세요.')
      }
    })
  }

  const handleSendPhoneCode = () => {
    if (phoneNumber.length === 0) {
      setErrors((prev) => ({ ...prev, phoneNumber: '휴대폰 번호를 입력해 주세요.' }))
      return
    }
    if (!phoneNumber.match(/^01[0-9]{8,9}$/)) {
      setErrors((prev) => ({
        ...prev,
        phoneNumber: '올바른 휴대폰 번호 형식이 아닙니다. ("-" 없이 숫자만 입력)',
      }))
      return
    }

    startSendingPhoneCode(async () => {
      try {
        const response = await sendPhoneVerificationCode({ phoneNumber })
        if (response?.error) {
          toast(response.error)
          return
        }
        setIsPhoneCodeVisible(true)
        toast('인증번호가 발송되었습니다.')
      } catch {
        toast('인증번호 발송에 실패했습니다. 다시 시도해 주세요.')
      }
    })
  }

  const handleConfirmPhoneCode = () => {
    startConfirmingPhoneCode(async () => {
      try {
        const response = await confirmPhoneVerificationCode({
          phoneNumber,
          verificationCode: phoneVerifyCode,
        })
        if (response?.error) {
          toast(response.error)
          return
        }
        const token = response?.data?.phoneVerifyToken
        if (!token) {
          toast('인증에 실패했습니다. 다시 시도해 주세요.')
          return
        }
        setPhoneVerifyToken(token)
        setIsPhoneVerified(true)
      } catch {
        toast('인증번호 확인에 실패했습니다. 다시 시도해 주세요.')
      }
    })
  }

  const handleCheckReferrer = () => {
    if (!referrerNickname.trim()) return

    startCheckingReferrer(async () => {
      try {
        const response = await checkNicknameDuplicate(referrerNickname)
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
      phoneNumber,
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
    if (!isPhoneVerified) {
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
        <div className="px-[15px] py-[30px] flex flex-col gap-5">
          {/* hidden */}
          <input type="hidden" name="emailVerifyToken" value={emailVerifyToken} />
          <input type="hidden" name="phoneVerifyToken" value={phoneVerifyToken} />

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
                    readOnly={isEmailVerified}
                    className={cn(
                      'flex-1',
                      isEmailVerified && 'bg-[#f8f8f8] text-[#aaaaaa]',
                      className,
                    )}
                  />
                  <AppOutlineButton
                    type="button"
                    onClick={handleSendEmailCode}
                    disabled={isEmailVerified || isSendingEmailCode}
                    className="shrink-0 w-auto h-auto px-4"
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
                      className="shrink-0 w-auto px-4"
                      onClick={handleConfirmEmailCode}
                      disabled={isEmailVerified || isConfirmingEmailCode}
                    >
                      {isConfirmingEmailCode ? '확인 중' : '확인'}
                    </AppOutlineButton>
                  </div>
                )}
                {isEmailVerified && (
                  <p className="text-xs leading-[12px] text-[#666666]">인증이 완료되었습니다.</p>
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
                    errors.password ? 'border-[#bc4040] focus-visible:border-[#bc4040]' : undefined
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
                  <p className="text-xs leading-[12px] text-[#bc4040]">{errors.passwordConfirm}</p>
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
                      if (errors.nickname) setErrors((prev) => ({ ...prev, nickname: undefined }))
                    }}
                    className={cn('flex-1', className)}
                  />
                  <AppOutlineButton
                    type="button"
                    onClick={handleCheckNickname}
                    disabled={isCheckingNickname}
                    className="shrink-0 w-auto h-auto px-4"
                  >
                    {isCheckingNickname ? '확인 중' : '중복확인'}
                  </AppOutlineButton>
                </div>
                {isNicknameChecked && (
                  <p className="text-xs leading-[12px] text-[#666666]">사용 가능한 닉네임입니다.</p>
                )}
              </div>
            )}
          </AppFormField>

          {/* 휴대폰 번호 */}
          <AppFormField label="휴대폰 번호" required error={errors.phoneNumber}>
            {({ className }) => (
              <div className="flex flex-col gap-2">
                <div className="flex gap-2">
                  <AppInputNumber
                    id="phoneNumber"
                    name="phoneNumber"
                    value={phoneNumber}
                    onChange={(e) => {
                      if (e.target.value.length <= 11) setPhoneNumber(e.target.value)
                      setIsPhoneVerified(false)
                      setIsPhoneCodeVisible(false)
                      setPhoneVerifyToken('')
                      if (errors.phoneNumber)
                        setErrors((prev) => ({ ...prev, phoneNumber: undefined }))
                    }}
                    readOnly={isPhoneVerified}
                    disabled={isPhoneVerified}
                    placeholder="숫자만 입력해 주세요."
                    maxLength={11}
                    className={cn(
                      'flex-1 pr-4',
                      isPhoneVerified && 'bg-[#f8f8f8] text-[#aaaaaa]',
                      className,
                    )}
                  />
                  <AppOutlineButton
                    type="button"
                    onClick={handleSendPhoneCode}
                    disabled={isPhoneVerified || isSendingPhoneCode}
                    className="shrink-0 w-auto h-auto px-4"
                  >
                    {isSendingPhoneCode
                      ? '발송 중'
                      : isPhoneCodeVisible
                        ? '재발송'
                        : '인증번호 받기'}
                  </AppOutlineButton>
                </div>
                {isPhoneCodeVisible && (
                  <div className="flex gap-2">
                    <AppInputNumber
                      value={phoneVerifyCode}
                      onChange={(e) => {
                        if (e.target.value.length <= 6) setPhoneVerifyCode(e.target.value)
                      }}
                      readOnly={isPhoneVerified}
                      disabled={isPhoneVerified}
                      placeholder="123456"
                      maxLength={6}
                      className={cn(
                        'flex-1 pr-4',
                        isPhoneVerified && 'bg-[#f8f8f8] text-[#aaaaaa]',
                      )}
                    />
                    <AppOutlineButton
                      type="button"
                      className="shrink-0 w-auto px-4"
                      onClick={handleConfirmPhoneCode}
                      disabled={isPhoneVerified || isConfirmingPhoneCode}
                    >
                      {isConfirmingPhoneCode ? '확인 중' : '확인'}
                    </AppOutlineButton>
                  </div>
                )}
                {isPhoneVerified && (
                  <p className="text-xs leading-[12px] text-[#666666]">인증이 완료되었습니다.</p>
                )}
              </div>
            )}
          </AppFormField>

          {/* 생년월일 */}
          <AppFormField label="생년월일" required error={errors.birthDate}>
            {() => (
              <div className="flex gap-2">
                <AppSelect
                  value={birthYear}
                  onChange={(e) => {
                    setBirthYear(e.target.value)
                    if (errors.birthDate) setErrors((prev) => ({ ...prev, birthDate: undefined }))
                  }}
                  className={cn(
                    'flex-1',
                    errors.birthDate && !birthYear && 'border-[#bc4040]',
                  )}
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
                    if (errors.birthDate) setErrors((prev) => ({ ...prev, birthDate: undefined }))
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
                    if (errors.birthDate) setErrors((prev) => ({ ...prev, birthDate: undefined }))
                  }}
                  className={cn(
                    'flex-1',
                    errors.birthDate && !birthDay && 'border-[#bc4040]',
                  )}
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
                      'flex-1 flex items-center justify-center h-[45px] border cursor-pointer transition-colors',
                      index > 0 && '-ml-px',
                      gender === value
                        ? 'border-[#a91201] text-[#a91201] z-10'
                        : errors.gender
                          ? 'border-[#bc4040] text-[#333333]'
                          : 'border-[#eeeeee] text-[#333333]',
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
                  className="shrink-0 w-auto h-auto px-4"
                >
                  {isCheckingReferrer ? '확인 중' : '추천인 확인'}
                </AppOutlineButton>
              </div>
            )}
          </AppFormField>
        </div>

        {/* 약관 동의 */}
        <div className="border-t border-[#eeeeee] px-[15px] py-[30px] flex flex-col gap-5">
          <label className="flex items-center gap-3 cursor-pointer">
            <CircleCheckbox checked={agreedAll} onChange={handleAgreedAll} />
            <span className="text-base font-semibold leading-[16px] text-[#333333]">
              약관에 모두 동의합니다.
            </span>
          </label>
          <div className="flex flex-col gap-4 pl-1">
            {TERMS_LIST.map(({ key, label, href }) => (
              <div key={key} className="flex items-center justify-between">
                <label className="flex items-center gap-3 cursor-pointer">
                  <FormCheckbox
                    name={key}
                    checked={agreedTerms[key]}
                    onChange={(checked) => setAgreedTerms((prev) => ({ ...prev, [key]: checked }))}
                  />
                  <span className="text-sm leading-[14px] text-[#666666]">{label}</span>
                </label>
                {href && (
                  <a href={href} className="text-[#aaaaaa]">
                    <MdChevronRight size={20} />
                  </a>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* 가입하기 버튼 */}
        <div className="px-[15px] pb-[30px]">
          <AppSubmitButton isSubmitting={isPending} loadingText="가입 중">
            가입하기
          </AppSubmitButton>
        </div>
      </form>
    </section>
  )
}
