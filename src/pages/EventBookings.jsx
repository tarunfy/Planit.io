import { useContext, useEffect } from "react";
import { EventContext } from "../contexts/EventContext";
import { useParams } from "react-router-dom";
import EventBookingsTable from "../components/EventBookingsTable";

const EventBookings = () => {
  const { fetchEventBookings, eventBookings } = useContext(EventContext);
  const { eventId } = useParams();

  useEffect(() => {
    const getBookings = async () => {
      await fetchEventBookings(eventId);
    };

    getBookings();
  }, []);

  if (!eventBookings) {
    return <div></div>;
  }

  return (
    <div className="h-screen max-w-[1000px] mx-auto py-10 space-y-5">
      <h1 className="text-4xl font-Outfit font-semibold">
        All Bookings ({eventBookings.length})
      </h1>
      {<EventBookingsTable eventBookings={eventBookings} />}
    </div>
  );
};

export default EventBookings;
