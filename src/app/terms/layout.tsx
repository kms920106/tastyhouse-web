interface Props {
  children: React.ReactNode
}

export default function Layout({ children }: Props) {
  return <div className="min-h-screen bg-white">{children}</div>
}
