import Exploarbtn from "./components/Exploarbtn";
import EventCard from "./components/EventCard";
import { IEvent } from "./database/event.model";
// import { events } from "./lib/constants";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

const page = async () => {
  const res = await fetch(`${BASE_URL}/api/events`)
  const events = await res.json();
  return (
    <section>
      <h1 className="text-3xl font-bold text-center mt-10">Welcome to Dev Event App</h1>
      <p className="text-center mt-4 text-gray-600">Hackethon, Meetups and Conforances all in one place</p>
      <Exploarbtn />
      <div className="mt-20 space-y-7">
        <h3>Featured Events</h3>
        <ul className="events">
          {events.map((event: IEvent) => (
            <div key={event.title}>
              <EventCard {...event} />
            </div>
          ))}

        </ul>
      </div>
    </section>
  );
}

export default page;
