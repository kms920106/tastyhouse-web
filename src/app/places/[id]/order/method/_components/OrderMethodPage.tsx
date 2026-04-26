import OrderMethodContentFetcher from './OrderMethodContentFetcher'
import OrderMethodHeader from './OrderMethodHeader'

interface Props {
  placeId: number
}

export default function OrderMethodPage({ placeId }: Props) {
  return (
    <div className="flex flex-col min-h-screen">
      <OrderMethodHeader />
      <OrderMethodContentFetcher placeId={placeId} />
    </div>
  )
}
