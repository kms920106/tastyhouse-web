import Header, { HeaderCenter, HeaderLeft, HeaderTitle } from '../layouts/Header'
import { BackButton } from '../layouts/header-parts'
import ErrorMessage from './ErrorMessage'

interface Props {
  title: string
  message: string
}

export default function ErrorRenderSection({ title = 'ERROR', message }: Props) {
  return (
    <section className="flex flex-col min-h-screen">
      <Header variant="white" height={55}>
        <HeaderLeft>
          <BackButton />
        </HeaderLeft>
        <HeaderCenter>
          <HeaderTitle>{title}</HeaderTitle>
        </HeaderCenter>
      </Header>
      <div className="flex-1 flex items-center justify-center">
        <ErrorMessage message={message} />
      </div>
    </section>
  )
}
