'use client'

import type { PointBalance, PointHistory } from '@/domains/member'
import { useRouter } from 'next/navigation'
import { IoChevronBack } from 'react-icons/io5'

const pointBalance: PointBalance = {
  availablePoints: 1000,
  expiringPoints: 0,
  expiringDate: null,
}

const pointHistories: PointHistory[] = [
  {
    id: 1,
    description: '적립',
    date: '2020.10.05',
    amount: 1000,
    type: 'earn',
  },
  {
    id: 2,
    description: '사용',
    date: '2020.10.04',
    amount: -3000,
    type: 'spend',
  },
  {
    id: 3,
    description: '적립',
    date: '2020.10.02',
    amount: 3000,
    type: 'earn',
  },
]

export default function PointPage() {
  const router = useRouter()

  return (
    <div className="min-h-screen bg-white">
      {/* 헤더 */}
      <header className="sticky top-0 z-10 bg-white border-b border-gray-100">
        <div className="flex items-center justify-center h-14 relative">
          <button
            onClick={() => router.back()}
            className="absolute left-4 flex items-center justify-center w-10 h-10"
          >
            <IoChevronBack size={24} className="text-gray-900" />
          </button>
          <h1 className="text-[17px] font-medium text-gray-900">포인트</h1>
        </div>
      </header>

      {/* 포인트 잔액 */}
      <div className="px-4 py-8 border-b-8 border-gray-50">
        <div className="text-center">
          <p className="text-[14px] text-gray-500 mb-2">포인트 잔액</p>
          <p className="text-[32px] font-bold text-red-500">
            {pointBalance.availablePoints.toLocaleString()}
            <span className="text-[24px]">p</span>
          </p>
          {pointBalance.expiringPoints > 0 && pointBalance.expiringDate && (
            <p className="text-[13px] text-gray-400 mt-3">
              만료 예정 포인트 {pointBalance.expiringPoints}p
            </p>
          )}
        </div>
      </div>

      {/* 포인트 내역 */}
      <div className="divide-y divide-gray-100">
        {pointHistories.length > 0 ? (
          pointHistories.map((history) => (
            <div key={history.id} className="px-4 py-5">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-[15px] text-gray-900 font-medium mb-1">
                    {history.description}
                  </p>
                  <p className="text-[13px] text-gray-400">{history.date}</p>
                </div>
                <div>
                  <p
                    className={`text-base font-medium ${
                      history.type === 'earn' ? 'text-red-500' : 'text-gray-900'
                    }`}
                  >
                    {history.amount > 0 ? '+' : ''}
                    {history.amount.toLocaleString()}p
                  </p>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="flex flex-col items-center justify-center py-20">
            <div className="w-16 h-16 mb-4 flex items-center justify-center">
              <svg viewBox="0 0 100 100" className="text-gray-300 fill-current w-full h-full">
                <circle cx="50" cy="50" r="40" />
                <text
                  x="50"
                  y="60"
                  fontSize="40"
                  textAnchor="middle"
                  className="fill-white font-bold"
                >
                  P
                </text>
              </svg>
            </div>
            <p className="text-gray-400 text-[15px]">포인트 내역이 없습니다.</p>
          </div>
        )}
      </div>
    </div>
  )
}
