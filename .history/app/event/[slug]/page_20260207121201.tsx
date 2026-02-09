import {notFound} from "next/navigation";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

const EventDetails = async ({params}: {params: Promise<{slug: string}>}) => {
    const {slug} = await params;
    const req = await fetch(`${BASE_URL}/api/events/${slug}`);
    const {event:{title, image , location, date, time, description, overview, mode, agenda,}} = await req.json();

    if(!description) return notFound();
  return (
    <section id='event'>
        <div className="header">
            <h1>Event Description</h1>
            <p>{description}</p>
        </div>
    </section>
  );
}

export default EventDetails;
