import { ReactNode } from 'react'

interface Props {
  children: ReactNode
}

export default function FixedBottomSection({ children }: Props) {
  return (
    <section className="fixed bottom-0 left-0 right-0 bg-white border-t border-[#eeeeee] box-border">
      {children}
    </section>
  )
}
