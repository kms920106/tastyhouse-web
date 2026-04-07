import AppInput from './AppInput'

type AppInputEmailProps = Omit<React.ComponentProps<typeof AppInput>, 'type'>

export default function AppInputEmail(props: AppInputEmailProps) {
  return <AppInput type="email" autoComplete="email" inputMode="email" {...props} />
}
