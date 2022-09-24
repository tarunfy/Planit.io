import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import ViewEventModal from "./ViewEventModal";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link } from "react-router-dom";

const EventCard = ({ event }) => {
  const { currentUser } = useContext(AuthContext);

  const handleCopy = (e) => {
    navigator.clipboard.writeText(e.target.id);
    toast.success("Link copied 👍", {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  return (
    <div className="bg-white relative border-t-4 border-t-primary-600 w-full p-5 rounded-md shadow-md flex justify-center  items-center flex-col space-y-2">
      <div className="w-full mb-10 space-y-2">
        <h1 className="font-Outfit font-extrabold text-3xl text-secondary-700">
          {event?.eventName}
        </h1>

        <p className="font-Outfit break-words font-normal  text-lg text-secondary-500 truncate">
          {event?.description}
        </p>
        <p className="font-Outfit font-noraml text-base text-secondary-400">
          {event?.duration}
        </p>
      </div>
      <div className="flex absolute bottom-2 px-5 justify-between items-center w-full">
        <p
          onClick={(e) => handleCopy(e)}
          id={`http://localhost:3000/booking/${currentUser.userId}/${event.eventId}`}
          className="text-sm font-medium text-blue-600 cursor-pointer"
        >
          Copy link
        </p>
        <div className="space-x-2 flex items-center">
          <Link
            to={`/bookings/${event.eventId}`}
            className=" border-primary-500 bg-transparent text-black hover:text-white hover:bg-primary-500 border-[1px]  text-base font-Outfit font-normal px-4 py-2 focus:outline-none flex items-center transition-colors rounded-sm duration-300 ease-in-out"
          >
            Bookings
          </Link>
          <ViewEventModal event={event} />
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default EventCard;
