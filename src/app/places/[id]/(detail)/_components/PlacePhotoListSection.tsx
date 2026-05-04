import PlacePhotoListFetcher from './PlacePhotoListFetcher'

interface Props {
  placeId: number
}

export default function PlacePhotoListSection({ placeId }: Props) {
  return (
    <section className="px-[15px] pb-5">
      <PlacePhotoListFetcher placeId={placeId} />
    </section>
  )
}
