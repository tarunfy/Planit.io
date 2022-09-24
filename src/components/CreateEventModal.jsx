import { useState, useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { EventContext } from "../contexts/EventContext";
import Box from "@mui/material/Box";
import AddIcon from "@mui/icons-material/Add";
import Modal from "@mui/material/Modal";
import DayContainer from "./DayContainer";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  height: "650px",
};

const days = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"];

export default function BasicModal() {
  const [open, setOpen] = useState(false);
  const [daysData, setDaysData] = useState({});
  const [eventName, setEventName] = useState("");
  const [eventDescription, setEventDescription] = useState("");
  const [eventDuration, setEventDuration] = useState("");
  const [meetLink, setMeetLink] = useState("");

  const { logout } = useContext(AuthContext);
  const { createEvent, isLoading } = useContext(EventContext);

  const handleOpen = () => setOpen(true);

  const handleClose = () => {
    setOpen(false);
    setEventDescription("");
    setEventDuration("");
    setEventName("");
    setMeetLink("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = {
      eventName,
      description: eventDescription,
      duration: eventDuration,
      daysData,
      meetLink,
      timeStamp: new Date(),
    };

    const res = await createEvent(data);

    if (res.error) {
      toast.error(res.error, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      return;
    }

    setOpen(false);
    setEventDescription("");
    setEventDuration("");
    setEventName("");
    setMeetLink("");
    setDaysData({});

    toast.success("Event has been created 🥳", {
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
    <div>
      <div className="flex items-center space-x-2">
        <button
          onClick={handleOpen}
          className="flex items-center bg-primary-500 px-4 py-2 text-white hover:shadow-md rounded-md focus:outline-none transition font-Outfit font-noraml"
        >
          Create <AddIcon />
        </button>
        <button
          onClick={logout}
          className="flex items-center bg-primary-500 px-4 py-2 text-white hover:shadow-md rounded-md focus:outline-none transition font-Outfit font-normal"
        >
          Logout
        </button>
      </div>
      <Modal
        open={open}
        onClose={handleClose}
        className={`${isLoading && "pointer-events-none"}`}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style} className="!overflow-y-scroll focus:!outline-none">
          <div className="mb-10">
            <h1 className="text-2xl font-Outfit font-normal text-center">
              One-on-One Event
            </h1>
            <p className="text-center underline text-lg font-Outfit font-light">
              Let an invitee pick a time to meet with you.
            </p>
          </div>

          <form className="space-y-5" onSubmit={handleSubmit}>
            <div className="flex flex-col items-start space-y-1 w-full">
              <label htmlFor="event-name" className="font-Outfit font-light">
                Event name
              </label>
              <input
                type="text"
                required
                value={eventName}
                onChange={(e) => setEventName(e.target.value)}
                autoComplete="off"
                id="event-name"
                className="focus:outline-none border p-3 placeholder:text-base font-Outfit font-normal rounded-md bg-slate-50 w-full"
              />
            </div>
            <div className="flex flex-col items-start space-y-1 w-full">
              <label htmlFor="meet-link" className="font-Outfit font-light">
                Meet link
              </label>
              <input
                type="text"
                required
                value={meetLink}
                onChange={(e) => setMeetLink(e.target.value)}
                autoComplete="off"
                id="meet-link"
                className="focus:outline-none border p-3 placeholder:text-base font-Outfit font-normal rounded-md bg-slate-50 w-full"
              />
            </div>
            <div className="flex flex-col items-start space-y-1 w-full">
              <label htmlFor="event-desc" className="font-Outfit font-light">
                Description
              </label>
              <textarea
                name="event-desc"
                id="event-desc"
                value={eventDescription}
                onChange={(e) => setEventDescription(e.target.value)}
                placeholder="Write a summary and any details your invitee should know about the event."
                className="focus:outline-none border p-3 placeholder:text-base font-Outfit font-normal rounded-md bg-slate-50 w-full"
                cols="2"
                rows="4"
              ></textarea>
            </div>
            <div className="flex flex-col space-y-2">
              <label
                htmlFor="event-duration"
                className="font-Outfit font-normal"
              >
                Duration
              </label>
              <div className="flex space-x-4 items-center justify-start">
                <div className="flex items-center space-x-2">
                  <input
                    type="radio"
                    onChange={(e) => setEventDuration(e.target.id)}
                    name="event-duration"
                    id="30-mins"
                  />
                  <label htmlFor="30-mins" className="font-Outfit font-light">
                    30 mins
                  </label>
                </div>
                <div className="flex items-center space-x-2">
                  <input
                    type="radio"
                    onChange={(e) => setEventDuration(e.target.id)}
                    name="event-duration"
                    id="60 mins"
                  />
                  <label htmlFor="60-mins" className="font-Outfit font-light">
                    60 mins
                  </label>
                </div>
              </div>
            </div>
            <div className="flex flex-col space-y-2">
              <label
                htmlFor="event-availability"
                className="font-Outfit font-normal mb-4"
              >
                How do you want to offer your availability for this event type?
              </label>
              <ul className="space-y-2 flex flex-col items-start">
                {days.map((day, index) => (
                  <DayContainer
                    key={index}
                    dayName={day}
                    setDaysData={setDaysData}
                  />
                ))}
              </ul>
            </div>
            <div className="w-full flex justify-end">
              <button
                disabled={
                  isLoading ||
                  !eventDescription ||
                  !eventName ||
                  !eventDuration ||
                  !meetLink
                }
                type="submit"
                className="bg-primary-500 disabled:cursor-not-allowed disabled:bg-primary-500/50 disabled:text-white/50 text-lg font-Outfit rounded-md font-normal px-4 py-2 text-white focus:outline-none"
              >
                Submit
              </button>
            </div>
          </form>
        </Box>
      </Modal>
      <ToastContainer />
    </div>
  );
}
