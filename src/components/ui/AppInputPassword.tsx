import AppInput from './AppInput'

type AppInputPasswordProps = Omit<React.ComponentProps<typeof AppInput>, 'type'>

export default function AppInputPassword(props: AppInputPasswordProps) {
  return <AppInput type="password" {...props} />
}
