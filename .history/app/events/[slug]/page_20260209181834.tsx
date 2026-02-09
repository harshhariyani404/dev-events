import { notFound } from "next/navigation";
import Image from "next/image";
import BookEvent from "../../components/BookEvent";
import { IEvent } from "@/app/database/event.model";
import { getSimilarEventsBySlug } from "@/app/lib/actions/event.actions";
import EventCard from "@/app/components/EventCard";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL ?? (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 'http://localhost:3000');

const EventDetailItem = ({ icon, alt, label}: { icon: string; alt: string; label: string }) => (
  <div className="flex-row-gap-2 items-center">
    <Image src={icon} alt={alt} width={24} height={24} />
    <p>{label}</p>
  </div>
);

const EventAgenda = ({ agendaItems }: { agendaItems: string[] }) => {

  return (
    <div className="agenda">
      <h2>Agenda</h2>
      <ul>
        {agendaItems.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    </div>
  );
};

const EventTags = ({ tags }: { tags: string[] }) => (
  <div className="flex flex-row gap-1.5 flex-wrap">
    {tags.map((tag, index) => (
      <div className="pill" key={index}>{tag}</div>
    ))}
  </div>
);

const EventDetails = async ({ params }: { params: Promise<{ slug: string }> }) => {
  const { slug } = await params; // ← Add this

  const req = await fetch(new URL(`/api/events/${slug}`, BASE_URL), {
    cache: "no-store",
  });
  if (!req.ok) return notFound();

  // ✅ API returns the event directly
  const event = await req.json();

  if (!event) return notFound();

  const similarEvents: IEvent[] = await getSimilarEventsBySlug(slug);
  const participantCount = event.participantCount || 0;

  return (
    <section id="event">
      <div className="header">
        <h1>{event.title}</h1>
        <p>{event.description}</p>
      </div>
      <div className="details">
        {/* left side */}
        <div className="content">
          <Image src={event.image} alt={event.title} width={800} height={800} className="banner"></Image>
          <section className="felx-col-gap-2">
            <h2>Overview</h2>
            <p>{event.overview}</p>
          </section>
          <section className="flex flex-col gap-2">
            <h2>Event Details</h2>
            <EventDetailItem icon="/icons/calendar.svg" alt="Calendar Icon" label={event.date} />
            <EventDetailItem icon="/icons/clock.svg" alt="Clock Icon" label={event.time} />
            <EventDetailItem icon="/icons/pin.svg" alt="Location Icon" label={event.location} />
            <EventDetailItem icon="/icons/mode.svg" alt="mode Icon" label={event.mode} />
            <EventDetailItem icon="/icons/audience.svg" alt="audiance Icon" label={event.audience} />
          </section>

          <EventAgenda agendaItems={JSON.parse(event.agenda)} />

          <section className="felx-col-gap-2">
            <h2>About the Organizer</h2>
            <p>{event.organizer}</p>
          </section>

          <EventTags tags={JSON.parse(event.tags)} />
        </div>
        {/* right side */}
        <aside className="booking">
          <div className="signup-card">
            <h2>Book Your Spot</h2>
            {participantCount > 0 ? (
              <p>Join {participantCount} {participantCount === 1 ? 'person' : 'people'} who have already booked their spot!</p>
            ) : (
              <p className="sold-out">Be the first to book the spot</p>  
            )}

            <BookEvent eventId={event._id} slug={event.slug} />
          </div>
        </aside>

      </div>
      <div  className="felx w-full flex-col gap-4 pt-20">
        <h2>Similar Events</h2>
        <div className="events">
          {similarEvents.length > 0 && similarEvents.map((similarEvent : IEvent)=>(
            <EventCard {...similarEvent}/>
          )) }
        </div>
      </div>
    </section>
  );
};

export default EventDetails;
