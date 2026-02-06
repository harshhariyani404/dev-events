import Link from "next/link";
import Image from "next/image";
interface Props{
    image:string;
    title:string;
    slug:string;
    location:string;
    date:string;
    time:string;
}
const EventCard = ({ title, image , slug, location, date, time }:Props) => {
  return (
    <div>
      <Link href={`/events/${slug}`} id='event-card'>
        <Image src={image} alt={title} width={400} height={300} className="poster"/>
        <p className="title">{title}</p>
        <div className="flex flex-row gap-2">
            <Image src="/icons/pin.svg" alt='location' width={14} height={14}/>    
        </div>



      </Link>
    </div>
  );
}

export default EventCard;
