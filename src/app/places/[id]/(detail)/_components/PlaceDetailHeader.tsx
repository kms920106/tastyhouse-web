interface Props {
  name: string
}

export default function PlaceDetailHeader({ name }: Props) {
  return <h1 className="text-[17px] leading-[17px]">{name}</h1>
}
