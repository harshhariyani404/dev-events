import Link from "next/link";
import Image from "next/image";
interface Props{
    image:string;
    title:string;
}
const EventCard = ({ title, image }:Props) => {
  return (
    <div>
      <Link href={`/events`} id='event-card'>
        <Image src={image} alt={title} width={400}></Image>
        <p className="title">{title}</p>
      </Link>
    </div>
  );
}

export default EventCard;
