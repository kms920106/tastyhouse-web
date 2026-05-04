'use client'

import { useEffect, useState } from 'react'

type ToastMessage = {
  id: number
  message: string
}

let toastId = 0
let addToastFn: ((message: string) => void) | null = null

export const toast = (message: string) => {
  if (addToastFn) {
    addToastFn(message)
  }
}

export function AppToaster() {
  const [toasts, setToasts] = useState<ToastMessage[]>([])

  useEffect(() => {
    addToastFn = (message: string) => {
      const id = ++toastId
      setToasts((prev) => [...prev, { id, message }])
      setTimeout(() => {
        setToasts((prev) => prev.filter((t) => t.id !== id))
      }, 2000)
    }
    return () => {
      addToastFn = null
    }
  }, [])

  if (toasts.length === 0) return null

  return (
    <div className="fixed inset-0 flex items-center justify-center pointer-events-none z-[9999]">
      {toasts.map((t) => (
        <div
          key={t.id}
          className="w-[73vw] px-4 py-3 text-white bg-[#000000] text-sm text-center whitespace-pre-line rounded-[2.5px] pointer-events-auto opacity-80"
        >
          {t.message}
        </div>
      ))}
    </div>
  )
}
