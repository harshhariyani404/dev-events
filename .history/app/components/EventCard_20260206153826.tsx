import Link from "next/link"
import Image from "next/image"

interface Props {
  image: string
  title: string
}

const EventCard = ({ title, image }: Props) => {
  return (
    <Link href="/events" className="event-card">
      <Image
        src={image}
        alt={title}
        width={400}
        height={300}
        className="poster"
      />
      <p className="title">{title}</p>
    </Link>
  )
}

export default EventCard
