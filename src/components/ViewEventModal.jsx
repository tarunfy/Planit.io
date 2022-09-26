import { useState } from "react";
import Box from "@mui/material/Box";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import Modal from "@mui/material/Modal";
import TrendingFlatRoundedIcon from "@mui/icons-material/TrendingFlatRounded";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import CalendarMonthRoundedIcon from "@mui/icons-material/CalendarMonthRounded";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  boxShadow: 24,
};

export default function BasicModal({ event }) {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
      <button
        onClick={handleOpen}
        className=" border-primary bg-transparent text-slate-700 hover:text-white hover:bg-primary border-[1px]  text-sm font-Lexend font-light px-3 py-2 focus:outline-none flex items-center transition-colors rounded-md duration-300 ease-in-out"
      >
        View details
      </button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div className="font-Lexend space-y-4 w-[700px] text-secondary-800">
            <div className="flex items-center p-4 border-b justify-between w-full">
              <h1 className="text-3xl font-Mediem capitalize">
                {event?.eventName}
              </h1>
              <div className="flex items-center justify-between space-x-5">
                <div className="flex items-center text-secondary-400 justify-center">
                  <AccessTimeIcon className="mr-2 text-lg" />
                  <p className="font-light text-normal">{event?.duration}</p>
                </div>
                <div>
                  <p className="text-gray-600 font-light">
                    {" "}
                    <CurrencyRupeeIcon className="!text-lg text-green-600" />
                    {event.price > 0 ? event.price : "FREE"}
                  </p>
                </div>
              </div>
            </div>
            <div className="space-y-5 px-4">
              <div className="space-y-1">
                <h3 className="text-xl">Description</h3>
                <p className="text-base font-light">{event?.description}</p>
              </div>
              <div>
                <p className="text-xl font-normal">
                  Here is your meeting link <TrendingFlatRoundedIcon />
                  <a
                    href={event?.meetLink}
                    target="_blank"
                    className="font-light text-base text-blue-600"
                  >
                    {" "}
                    {event?.meetLink}
                  </a>
                </p>
              </div>
            </div>

            <div className="space-y-2 p-5 border-t">
              <h4 className="text-xl font-normal flex items-center">
                TimeSlots <CalendarMonthRoundedIcon className="!ml-2" />
              </h4>
              {Object.keys(event.daysData).map((key, index) => (
                <div key={index} className="flex items-center">
                  <div className="w-10">
                    <h3 className="text-base font-light capitalize">{key}</h3>
                  </div>
                  {event.daysData[key] !== null ? (
                    <div className="flex font-light items-center w-full justify-end text-right">
                      <p>{event.daysData[key].from}</p>
                      <span className="mx-4">-</span>
                      <p>{event.daysData[key].to}</p>
                    </div>
                  ) : (
                    <div className="flex font-light items-center w-full justify-end text-right">
                      Unavailable
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </Box>
      </Modal>
    </div>
  );
}
