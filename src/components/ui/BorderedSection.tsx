import { ReactNode } from 'react'

interface Props {
  children: ReactNode
}

export default function BorderedSection({ children }: Props) {
  return (
    <section className="bg-white border-y border-[#eeeeee] box-border">
      {children}
    </section>
  )
}
