import { notFound } from "next/navigation";

type EventDetailsProps = {
  params: {
    slug: string;
  };
};

const EventDetails = async ({ params }: EventDetailsProps) => {
  const { slug } = params;

  const res = await fetch(`/api/events/${slug}`, {
    cache: "no-store",
  });

  if (!res.ok) {
    return notFound();
  }

  const event = await res.json();

  if (!event || !event.description) {
    return notFound();
  }

  const {
    title,
    description,
    image,
    location,
    date,
    time,
    overview,
    mode,
    agenda,
  } = event;

  return (
    <section id="event">
      <div className="header">
        <h1>{title}</h1>
        <p>{description}</p>
      </div>
    </section>
  );
};

export default EventDetails;
