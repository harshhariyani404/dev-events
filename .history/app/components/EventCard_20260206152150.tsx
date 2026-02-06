import Link from "next/link";
interface Props{
    image:string;
    title:string;
}
const EventCard = ({ title, image }:Props) => {
  return (
    <div>
      <Link href={`/events`} id='event-card'></Link>
    </div>
  );
}

export default EventCard;
