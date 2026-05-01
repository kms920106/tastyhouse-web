import PlaceInfoDetailFetcher from './PlaceInfoDetailFetcher'

interface Props {
  placeId: number
}

export default function PlaceInfoSection({ placeId }: Props) {
  return (
    <section className="px-[15px] py-5 bg-white">
      <PlaceInfoDetailFetcher placeId={placeId} />
    </section>
  )
}
