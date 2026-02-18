'use client'

import FixedBottomSection from '@/components/ui/FixedBottomSection'
import ImageContainer from '@/components/ui/ImageContainer'
import { PAGE_PATHS } from '@/lib/paths'
import Link from 'next/link'
import { useState } from 'react'

interface OrderItem {
  id: number
  name: string
  imageUrl: string
  price: number
  quantity: number
  hasReview?: boolean
}

interface CustomerInfo {
  name: string
  phone: string
  email: string
}

interface ReservationInfo {
  method: string
  status: string
  dateTime: string
  people: number
  request: string
}

interface PaymentInfo {
  dateTime: string
  method: string
  cardNumber?: string
}

interface PaymentBreakdown {
  productTotal: number
  discount: number
  productDiscount: number
  couponUsed: number
  pointsUsed: number
  finalTotal: number
}

export default function PaymentDetailPage() {
  const [isOrderExpanded, setIsOrderExpanded] = useState(true)
  const [isCustomerExpanded, setIsCustomerExpanded] = useState(true)
  const [isReservationExpanded, setIsReservationExpanded] = useState(false)
  const [isPaymentExpanded, setIsPaymentExpanded] = useState(false)
  const [isBreakdownExpanded, setIsBreakdownExpanded] = useState(false)

  // Mock data
  const orderNumber = 'NO.12345'
  const orderStatus: string = '결제완료'

  const placeName = '땡스오트'

  const orderItems: OrderItem[] = [
    {
      id: 1,
      name: '베리 스트로베리',
      imageUrl: '/placeholder-food.jpg',
      price: 7900,
      quantity: 1,
      hasReview: false,
    },
    {
      id: 2,
      name: '블루나잇',
      imageUrl: '/placeholder-food.jpg',
      price: 7500,
      quantity: 1,
      hasReview: true,
    },
    {
      id: 3,
      name: '아보카도 햄치즈 샌드위치',
      imageUrl: '/placeholder-food.jpg',
      price: 8500,
      quantity: 1,
      hasReview: true,
    },
  ]

  const customerInfo: CustomerInfo = {
    name: '김철수',
    phone: '010-1234-5678',
    email: 'abc123@naver.com',
  }

  const reservationInfo: ReservationInfo = {
    method: '예약',
    status: '승인대기중',
    dateTime: '2021-01-01 오후 1:00',
    people: 2,
    request: '요청사항 적으면 최대 맛좋까지 니타나는지 모르겠다',
  }

  const paymentInfo: PaymentInfo = {
    dateTime: '2020-01-21 18:00',
    method: '신용카드',
    cardNumber: '신한 (4518*******6)',
  }

  const paymentBreakdown: PaymentBreakdown = {
    productTotal: 23900,
    discount: 1000,
    productDiscount: 1000,
    couponUsed: 0,
    pointsUsed: 0,
    finalTotal: 22900,
  }

  const cancellationPolicies = [
    '3일 전 취소: 전액 환불',
    '2일 전 취소: 결제 금액의 80% 환불',
    '1일 전 취소: 결제 금액의 50% 환불',
    '당일 취소: 환불 불가',
  ]

  const statusColor =
    orderStatus === '결제완료'
      ? 'bg-[#22C55E] text-white'
      : orderStatus === '사용완료'
        ? 'bg-gray-500 text-white'
        : 'bg-red-600 text-white'

  return (
    <div className="min-h-screen flex flex-col bg-white">
      {/* Header */}
      <header className="sticky top-0 bg-white z-10 border-b border-[#eeeeee]">
        <div className="flex items-center h-14 px-4">
          <Link href={PAGE_PATHS.MY_PAGE} className="mr-auto">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path
                d="M15 18L9 12L15 6"
                stroke="#000"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </Link>
          <h1 className="absolute left-1/2 -translate-x-1/2 text-lg">결제내역</h1>
          <button className="ml-auto">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <rect x="3" y="3" width="18" height="18" stroke="#000" strokeWidth="2" />
              <path d="M9 3V21M15 3V21M3 9H21M3 15H21" stroke="#000" strokeWidth="2" />
            </svg>
          </button>
        </div>
      </header>

      <div className="flex-1">
        {/* Order Number and Status */}
        <div className="px-4 py-4 border-b-8 border-[#f5f5f5] flex items-center justify-between">
          <span className="text-base">{orderNumber}</span>
          <span className={`px-4 py-1.5 text-[13px] rounded-full ${statusColor}`}>
            {orderStatus}
          </span>
        </div>

        {/* 땡스오트 Section */}
        <div className="border-b-8 border-[#f5f5f5]">
          <button
            onClick={() => setIsOrderExpanded(!isOrderExpanded)}
            className="w-full px-4 py-4 flex items-center justify-between"
          >
            <h2 className="text-base font-bold">{placeName}</h2>
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              className={`transform transition-transform ${isOrderExpanded ? 'rotate-180' : ''}`}
            >
              <path
                d="M6 9L12 15L18 9"
                stroke="#000"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>

          {isOrderExpanded && (
            <div className="px-4 pb-4 space-y-4">
              {orderItems.map((item) => (
                <div key={item.id} className="flex gap-3">
                  <ImageContainer src={item.imageUrl} alt={item.name} size={65} />
                  <div className="flex-1 flex items-center justify-between">
                    <div className="flex-1">
                      <h3 className="text-[15px] mb-1">{item.name}</h3>
                      <p className="text-sm leading-[14px] text-[#666666]">
                        {item.price.toLocaleString()}원 | {item.quantity}개
                      </p>
                    </div>
                    {orderStatus === '사용완료' && (
                      <Link
                        href={
                          item.hasReview
                            ? PAGE_PATHS.REVIEW_EDIT(item.id)
                            : PAGE_PATHS.REVIEW_CREATE_WITH_MENU(item.id)
                        }
                        className={`px-4 py-1.5 text-[13px] rounded border ${
                          item.hasReview
                            ? 'bg-[#DC2626] text-white border-[#DC2626]'
                            : 'bg-white text-[#DC2626] border-[#DC2626]'
                        }`}
                      >
                        {item.hasReview ? '리뷰수정' : '리뷰작성'}
                      </Link>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* 주문자 정보 Section */}
        <div className="border-b-8 border-[#f5f5f5]">
          <button
            onClick={() => setIsCustomerExpanded(!isCustomerExpanded)}
            className="w-full px-4 py-4 flex items-center justify-between"
          >
            <h2 className="text-base font-bold">주문자 정보</h2>
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              className={`transform transition-transform ${isCustomerExpanded ? 'rotate-180' : ''}`}
            >
              <path
                d="M6 9L12 15L18 9"
                stroke="#000"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>

          {isCustomerExpanded && (
            <div className="px-4 pb-4 space-y-3">
              <div className="flex">
                <span className="text-[15px] text-[#666666] w-24">주문하는 분</span>
                <span className="text-[15px]">{customerInfo.name}</span>
              </div>
              <div className="flex">
                <span className="text-[15px] text-[#666666] w-24">휴대폰</span>
                <span className="text-[15px]">{customerInfo.phone}</span>
              </div>
              <div className="flex">
                <span className="text-[15px] text-[#666666] w-24">이메일</span>
                <span className="text-[15px]">{customerInfo.email}</span>
              </div>
            </div>
          )}
        </div>

        {/* 예약 정보 Section */}
        <div className="border-b-8 border-[#f5f5f5]">
          <button
            onClick={() => setIsReservationExpanded(!isReservationExpanded)}
            className="w-full px-4 py-4 flex items-center justify-between"
          >
            <h2 className="text-base font-bold">예약 정보</h2>
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              className={`transform transition-transform ${
                isReservationExpanded ? 'rotate-180' : ''
              }`}
            >
              <path
                d="M6 9L12 15L18 9"
                stroke="#000"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>

          {isReservationExpanded && (
            <div className="px-4 pb-4 space-y-3">
              <div className="flex">
                <span className="text-[15px] text-[#666666] w-24">주문방법</span>
                <span className="text-[15px]">{reservationInfo.method}</span>
              </div>
              <div className="flex">
                <span className="text-[15px] text-[#666666] w-24">주문상태</span>
                <span className="text-[15px]">{reservationInfo.status}</span>
              </div>
              <div className="flex">
                <span className="text-[15px] text-[#666666] w-24">예약날짜</span>
                <span className="text-[15px]">{reservationInfo.dateTime}</span>
              </div>
              <div className="flex">
                <span className="text-[15px] text-[#666666] w-24">예약인원</span>
                <span className="text-[15px]">{reservationInfo.people}명</span>
              </div>
              <div className="flex">
                <span className="text-[15px] text-[#666666] w-24">요청사항</span>
                <span className="text-[15px]">{reservationInfo.request}</span>
              </div>
            </div>
          )}
        </div>

        {/* 결제 정보 Section */}
        <div className="border-b-8 border-[#f5f5f5]">
          <button
            onClick={() => setIsPaymentExpanded(!isPaymentExpanded)}
            className="w-full px-4 py-4 flex items-center justify-between"
          >
            <h2 className="text-base font-bold">결제 정보</h2>
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              className={`transform transition-transform ${isPaymentExpanded ? 'rotate-180' : ''}`}
            >
              <path
                d="M6 9L12 15L18 9"
                stroke="#000"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>

          {isPaymentExpanded && (
            <div className="px-4 pb-4 space-y-3">
              <div className="flex">
                <span className="text-[15px] text-[#666666] w-24">결제시간</span>
                <span className="text-[15px]">{paymentInfo.dateTime}</span>
              </div>
              <div className="flex">
                <span className="text-[15px] text-[#666666] w-24">결제방법</span>
                <div className="flex flex-col">
                  <span className="text-[15px]">{paymentInfo.method}</span>
                  {paymentInfo.cardNumber && (
                    <span className="text-[13px] text-[#999999]">{paymentInfo.cardNumber}</span>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* 결제 내역 Section */}
        <div className="border-b-8 border-[#f5f5f5]">
          <button
            onClick={() => setIsBreakdownExpanded(!isBreakdownExpanded)}
            className="w-full px-4 py-4 flex items-center justify-between"
          >
            <h2 className="text-base font-bold">결제 내역</h2>
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              className={`transform transition-transform ${
                isBreakdownExpanded ? 'rotate-180' : ''
              }`}
            >
              <path
                d="M6 9L12 15L18 9"
                stroke="#000"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>

          {isBreakdownExpanded && (
            <div className="px-4 pb-4 space-y-3">
              <div className="flex justify-between text-[15px]">
                <span className="text-[#666666]">상품금액</span>
                <span>{paymentBreakdown.productTotal.toLocaleString()}원</span>
              </div>
              <div className="flex justify-between text-[15px]">
                <span className="text-[#666666]">할인금액</span>
                <span>- {paymentBreakdown.discount.toLocaleString()}원</span>
              </div>
              <div className="flex justify-between text-[13px] text-[#cccccc] pl-4">
                <span>상품 할인</span>
                <span>- {paymentBreakdown.productDiscount.toLocaleString()}원</span>
              </div>
              <div className="flex justify-between text-[13px] text-[#cccccc] pl-4">
                <span>쿠폰 사용</span>
                <span>{paymentBreakdown.couponUsed}원</span>
              </div>
              <div className="flex justify-between text-[13px] text-[#cccccc] pl-4">
                <span>포인트 사용</span>
                <span>{paymentBreakdown.pointsUsed}원</span>
              </div>
              <div className="h-px bg-[#eeeeee] my-2" />
              <div className="flex justify-between text-[15px] font-bold">
                <span>최종 결제금액</span>
                <span>{paymentBreakdown.finalTotal.toLocaleString()}원</span>
              </div>
            </div>
          )}
        </div>

        {/* 결제 취소시 환불 규정 안내 */}
        <div className="px-4 py-6 bg-[#f9f9f9]">
          <h3 className="text-[15px] font-bold mb-4">결제 취소시 환불 규정 안내</h3>
          <p className="text-[13px] text-[#666666] mb-3">
            결제 취소 사업은 예약 날짜를 기준으로 합니다.
          </p>
          <ul className="space-y-2 mb-4">
            {cancellationPolicies.map((policy, index) => (
              <li key={index} className="text-[13px] text-[#666666] flex items-start">
                <span className="mr-2">•</span>
                <span>{policy}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* 하단 결제 취소 버튼 */}
      {orderStatus !== '사용완료' && (
        <FixedBottomSection className="px-4 py-4">
          <button className="w-full py-4 bg-main text-white font-bold rounded">결제 취소</button>
        </FixedBottomSection>
      )}
    </div>
  )
}
