'use client'

import { createReservation } from '@/actions/order'
import {
  fetchAgeVerificationContent,
  fetchElectronicFinancialTransactionsContent,
  fetchPrivacyPolicyContent,
  fetchTermsOfServiceContent,
} from '@/actions/policies'
import AppPrimaryButton from '@/components/ui/AppPrimaryButton'
import AppTermsDialog from '@/components/ui/AppTermsDialog'
import { toast } from '@/components/ui/AppToaster'
import BorderedSection from '@/components/ui/BorderedSection'
import SectionStack from '@/components/ui/SectionStack'
import StickyFooter from '@/components/ui/StickyFooter'
import { useEffect, useState } from 'react'
import { shiftMonth } from '../_lib/calendar'
import ReservationDateTime from './ReservationDateTime'
import ReservationGuestCounter from './ReservationGuestCounter'
import ReservationNotice from './ReservationNotice'
import ReservationRequest from './ReservationRequest'
import ReservationTermsSection, {
  RESERVATION_TERMS_LIST,
  type ReservationTermsKey,
} from './ReservationTermsSection'

interface Props {
  shopId: number
}

const INITIAL_AGREED_TERMS: Record<ReservationTermsKey, boolean> = {
  agreedTerms: false,
  agreedPrivacy: false,
  agreedFinance: false,
  agreedAge: false,
  agreedEvent: false,
}

const TERMS_FETCH_MAP: Partial<Record<ReservationTermsKey, () => Promise<string>>> = {
  agreedTerms: fetchTermsOfServiceContent,
  agreedPrivacy: fetchPrivacyPolicyContent,
  agreedFinance: fetchElectronicFinancialTransactionsContent,
  agreedAge: fetchAgeVerificationContent,
}

export default function ReservationContentClient({ shopId }: Props) {
  const [viewMonth, setViewMonth] = useState(() => {
    const now = new Date()
    return { year: now.getFullYear(), month: now.getMonth() }
  })
  const [selectedDate, setSelectedDate] = useState<string | null>(null)
  const [selectedTime, setSelectedTime] = useState<string | null>(null)
  const [guestCount, setGuestCount] = useState(1)
  const [request, setRequest] = useState('')

  const [agreedAll, setAgreedAll] = useState(false)
  const [agreedTerms, setAgreedTerms] =
    useState<Record<ReservationTermsKey, boolean>>(INITIAL_AGREED_TERMS)

  const [termsDialog, setTermsDialog] = useState<{
    open: boolean
    title: string
    htmlContent: string
  }>({ open: false, title: '', htmlContent: '' })

  useEffect(() => {
    setAgreedAll(RESERVATION_TERMS_LIST.every(({ key }) => agreedTerms[key]))
  }, [agreedTerms])

  const handleAgreedAll = (checked: boolean) => {
    setAgreedAll(checked)
    setAgreedTerms(
      Object.fromEntries(RESERVATION_TERMS_LIST.map(({ key }) => [key, checked])) as Record<
        ReservationTermsKey,
        boolean
      >,
    )
  }

  const handleTermChange = (key: ReservationTermsKey, checked: boolean) => {
    setAgreedTerms((prev) => ({ ...prev, [key]: checked }))
  }

  const handleOpenTermsDialog = async (key: ReservationTermsKey, label: string) => {
    const fetcher = TERMS_FETCH_MAP[key]
    if (!fetcher) return
    try {
      const htmlContent = await fetcher()
      setTermsDialog({ open: true, title: label, htmlContent })
    } catch {
      toast('약관 내용을 불러오는데 실패했습니다.')
    }
  }

  const requiredTermsOk = RESERVATION_TERMS_LIST.filter((t) => t.required).every(
    ({ key }) => agreedTerms[key],
  )
  const isSubmittable = !!selectedDate && !!selectedTime && requiredTermsOk

  const handleReserve = async () => {
    if (!isSubmittable) return
    const result = await createReservation({
      shopId,
      reservationDate: selectedDate!,
      reservationTime: selectedTime!,
      guestCount,
      request,
    })
    if (result.error) {
      toast(result.error)
      return
    }
    // TODO: 성공 시 이동 경로 — 예약 완료 화면 디자인 미확보. 확정 시 PAGE_PATHS 추가 후 router.push
  }

  return (
    <>
      <SectionStack className="flex-1">
        <BorderedSection>
          <ReservationDateTime
            viewMonth={viewMonth}
            selectedDate={selectedDate}
            selectedTime={selectedTime}
            onChangeMonth={(delta) => setViewMonth((prev) => shiftMonth(prev, delta))}
            onSelectDate={setSelectedDate}
            onSelectTime={setSelectedTime}
          />
        </BorderedSection>
        <BorderedSection>
          <ReservationGuestCounter count={guestCount} onChange={setGuestCount} />
        </BorderedSection>
        <BorderedSection>
          <ReservationRequest value={request} onChange={setRequest} />
        </BorderedSection>
        <BorderedSection>
          <ReservationNotice />
        </BorderedSection>
        <BorderedSection>
          <ReservationTermsSection
            agreedAll={agreedAll}
            agreedTerms={agreedTerms}
            onAgreedAllChange={handleAgreedAll}
            onTermChange={handleTermChange}
            onOpenTermsDialog={handleOpenTermsDialog}
          />
        </BorderedSection>
      </SectionStack>

      <StickyFooter>
        <div className="px-[15px] py-2.5">
          <AppPrimaryButton onClick={handleReserve} disabled={!isSubmittable}>
            예약하기
          </AppPrimaryButton>
        </div>
      </StickyFooter>

      <AppTermsDialog
        open={termsDialog.open}
        onOpenChange={(open) => setTermsDialog((prev) => ({ ...prev, open }))}
        title={termsDialog.title}
      >
        <div dangerouslySetInnerHTML={{ __html: termsDialog.htmlContent }} />
      </AppTermsDialog>
    </>
  )
}
