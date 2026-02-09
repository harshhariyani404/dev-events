import { notFound } from "next/navigation";
import Image from "next/image";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

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
