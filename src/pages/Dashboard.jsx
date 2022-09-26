import { useContext } from "react";
import { EventContext } from "../contexts/EventContext";
import EventCard from "../components/EventCard";
import CreateEventModal from "../components/CreateEventModal";

const Dashboard = () => {
  const { events } = useContext(EventContext);

  return (
    <>
      <div className="px-16 py-20">
        <div className="flex justify-between items-center mb-20">
          <h1 className="font-Lexend font-semibold tracking-tighter text-gray-800 text-5xl">
            Your meetings ({events.length})
          </h1>
          <CreateEventModal />
        </div>
        <div className="w-full grid grid-cols-2 gap-x-20 gap-y-8">
          {events &&
            events.map((event) => (
              <EventCard event={event} key={event.eventId} />
            ))}
        </div>
      </div>
    </>
  );
};

export default Dashboard;
