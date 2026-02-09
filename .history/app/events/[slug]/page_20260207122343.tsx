import { notFound } from "next/navigation";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

const EventDetails = async ({ params }: { params: { slug: string } }) => {
  const { slug } = params;

  const req = await fetch(`${BASE_URL}/api/events/${slug}`);
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
    </section>
  );
};

export default EventDetails;
