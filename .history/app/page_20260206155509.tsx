import Exploarbtn from "./components/Exploarbtn";
import EventCard from "./components/EventCard";

const events = [
    {image:'/images/event1.png', title:'Event 1'},
    {image:'/images/event2.png', title:'Event 2'},

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
          {events.map((event) => (
            
              <EventCard {...event} />
            
          ))}

        </ul>
      </div>
    </section>
  );
}

export default page;
