import { ReactNode } from 'react'

interface Props {
  children: ReactNode
}

export default function StickyFooter({ children }: Props) {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-[#eeeeee] box-border">
      {children}
    </div>
  )
}
