'use client'

import KakaoMap from '@/components/home/KakaoMap'
import ReviewButton from '@/components/home/ReviewButton'
import SideBar from '@/components/home/SideBar'
import SideBarButton from '@/components/home/SideBarButton'
import { useState } from 'react'

export default function HomePage() {
  const [isOpen, setIsOpen] = useState(false)

  const togglePanel = () => setIsOpen((prev) => !prev)
  const closePanel = () => setIsOpen(false)

  return (
    <div className="relative min-h-screen">
      {!isOpen && <SideBarButton onClick={togglePanel} />}
      <SideBar isOpen={isOpen} closePanel={closePanel} />
      {isOpen && (
        <button
          aria-label="backdrop"
          onClick={closePanel}
          className="absolute inset-0 bg-black/30 z-30"
        />
      )}
      <ReviewButton />
      <KakaoMap />
    </div>
  )
}
