import Link from "next/link";
import Image from "next/image";
interface Props{
    image:string;
    title:string;
}
const EventCard = ({ title, image }:Props) => {
  return (
    <div>
      <Link href="" id="event-card">
        <Image src={image} alt={title} width={400} height={300} className="poster"/>
        <p className="title">{title}</p>
      </Link>
    </div>
  );
}

export default EventCard;
