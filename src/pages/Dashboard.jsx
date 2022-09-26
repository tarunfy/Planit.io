import { useContext } from "react";
import { EventContext } from "../contexts/EventContext";
import EventCard from "../components/EventCard";
import CreateEventModal from "../components/CreateEventModal";
import { AuthContext } from "../contexts/AuthContext";
import LogoutIcon from "@mui/icons-material/Logout";

const Dashboard = () => {
  const { events } = useContext(EventContext);
  const { logout } = useContext(AuthContext);
  return (
    <>
      <div className="px-16 py-20">
        <div className="flex justify-between items-center mb-20">
          <h1 className="font-Lexend font-semibold tracking-tighter text-gray-800 text-5xl">
            Your meetings ({events?.length})
          </h1>
          <div className="flex items-center justify-between space-x-4">
            <CreateEventModal />
            <button
              onClick={logout}
              className="flex items-center border-primary border text-primary  px-4 py-2 rounded-lg hover:scale-95 duration-300 focus:outline-none transition font-Lexend font-light"
            >
              <LogoutIcon />
              Logout
            </button>
          </div>
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
