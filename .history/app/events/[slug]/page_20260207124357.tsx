import { notFound } from "next/navigation";
import Image from "next/image";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

const EventDetailItem = ({ icon, alt, label}: { icon: string; alt: string; label: string }) => (
  <div className="flex-row-gap-2 items-center">
    <Image src={icon} alt={alt} width={24} height={24} />
    <p>{label}</p>
  </div>
);

const EventDetails = async ({ params }: { params: Promise<{ slug: string }> }) => {
  const { slug } = await params; // ← Add this

  const req = await fetch(`${BASE_URL}/api/events/${slug}`, {
    cache: "no-store",
  });
  if (!req.ok) return notFound();

  // ✅ API returns the event directly
  const event = await req.json();

  if (!event) return notFound();

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
            <EventDetailItem icon="/icons/location.svg" alt="Location Icon" label={event.location} />
            <EventDetailItem icon="/icons/mode.svg" alt="mode Icon" label={event.mode} />
          </section>
        </div>
        {/* right side */}
        <aside className="booking">
          <p className="text-lg font-semibold">Book Event</p>
        </aside>

      </div>
    </section>
  );
};

export default EventDetails;
