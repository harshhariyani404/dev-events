import Exploarbtn from "./components/Exploarbtn";
import EventCard from "./components/EventCard";

const event = [
    {image:'../../public/images/event1.png', title:'Event 1'},
    {image:'../../public/images/event2.png', title:'Event 2'},
    {image:'../../public/images/event3.png', title:'Event 3'},
]

const page = () => {
  return (
    <section>
      <h1 className="text-3xl font-bold text-center mt-10">Welcome to Dev Event App</h1>
      <p className="text-center mt-4 text-gray-600">Hackethon, Meetups and Conforances all in one place</p>
      <Exploarbtn />
      <div className="mt-20 space-y-7">
        <h3>Featured Events</h3>
        <ul className="events">
          {event.map((item, index) => (
            <li key={index}>
              <EventCard title={item.title} image={item.image} />
            </li>
          ))}

        </ul>
      </div>
    </section>
  );
}

export default page;
