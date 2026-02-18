'use client'

import { useRouter } from 'next/navigation'
import { MdRefresh } from 'react-icons/md'
import Header, { HeaderCenter, HeaderLeft, HeaderTitle } from '../layouts/Header'
import { BackButton } from '../layouts/header-parts'
import AppButton from './AppButton'
import ErrorMessage from './ErrorMessage'

interface ErrorStateSectionProps {
  message: string
}

export default function ErrorStateSection({ message }: ErrorStateSectionProps) {
  const router = useRouter()

  const handleRetry = () => {
    router.refresh()
  }

  return (
    <section className="flex flex-col min-h-screen">
      <Header variant="white" height={55}>
        <HeaderLeft>
          <BackButton />
        </HeaderLeft>
        <HeaderCenter>
          <HeaderTitle>ERROR</HeaderTitle>
        </HeaderCenter>
      </Header>
      <div className="flex-1 flex items-center justify-center">
        <ErrorMessage message={message} />
      </div>
      <div className="p-4">
        <AppButton onClick={handleRetry} className="bg-main w-full">
          <MdRefresh size={20} />
          다시 시도
        </AppButton>
      </div>
    </section>
  )
}
