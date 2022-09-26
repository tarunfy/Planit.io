import { useState } from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { useRef } from "react";
import { db } from "../utils/dbConfig";
import { useParams, useHistory } from "react-router";
import nProgress from "nprogress";
import "react-toastify/dist/ReactToastify.css";
import moment from "moment";
import Progress from "./Progress";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};

const loadRazorpay = () => {
  return new Promise((resolve) => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";

    script.onload = () => {
      resolve(true);
    };
    script.onerror = () => {
      resolve(false);
    };
    document.body.appendChild(script);
  });
};

const BookingDetailsModal = ({ ts, date, data }) => {
  const { eventId, userId } = useParams();
  const nameRef = useRef();
  const emailRef = useRef();

  const history = useHistory();

  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const handleOpen = () => setOpen(true);

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = async (e) => {
    e?.preventDefault();
    const name = nameRef.current.value;
    const email = emailRef.current.value;
    nProgress.start();

    setIsLoading(true);
    try {
      await db
        .collection("users")
        .doc(userId)
        .collection("events")
        .doc(eventId)
        .collection("bookings")
        .add({ ts, date: date.format("DD-MM-YYYY"), name, email });

      await fetch("/api/sender", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user_name: data.name,
          user_email: data.email,
          meet_link: data.meetLink,
          meet_date: date.format("DD-MM-YYYY"),
          meet_time: ts,
          reply_to: email,
          data,
        }),
      });

      //debugger;

      await fetch("/api/sender", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user_name: name,
          user_email: email,
          meet_link: data.meetLink,
          meet_date: date.format("DD-MM-YYYY"),
          meet_time: ts,
          reply_to: data.email,
          data,
        }),
      });
    } catch (err) {
      console.log(err.message);
    }

    setIsLoading(false);
    nProgress.done();
    history.push("/booking/successfull");
    handleClose();
  };

  const displayRazorpay = async (e) => {
    e.preventDefault();
    const res = await loadRazorpay();
    if (!res) {
      alert("Razorpay SDK failed to load");
      return;
    }

    let options = {
      key: process.env.REACT_APP_RAZORPAY_TEST_API_KEY,
      amount: `${data.price * 100}`,
      currency: "INR",
      name: "Meeting",
      description: `Meeting with ${data.name}`,
      image:
        "https://firebasestorage.googleapis.com/v0/b/planit-fe5a6.appspot.com/o/logo.svg?alt=media&token=002eb75f-b600-456d-b26c-ae9d1d8f2fd2",
      prefill: {
        name: data.name,
        email: data.email,
      },
      handler: function (response) {
        handleSubmit();
      },
    };

    const paymentObject = new window.Razorpay(options);

    paymentObject.open();
  };

  return (
    <div>
      <button
        onClick={handleOpen}
        className={`w-full  px-[5.5rem] py-4 text-2xl border border-primary text-primary-500 rounded-md hover:bg-primary  hover:text-white transition-all duration-300 ease-in-out`}
      >
        {ts}
      </button>

      <Modal
        open={open}
        onClose={handleClose}
        className={`${isLoading && "pointer-events-none"}`}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={style}
          className="!overflow-y-scroll focus:!outline-none w-full max-w-lg"
        >
          <div className="mb-4 space-y-3">
            <h1 className="font-semibold font-Lexend text-2xl">
              Let's book a meeting
            </h1>
            <p className="font-Lexend font-light text-base max-w-sm">
              You're about to book a meeting with{" "}
              <span className="font-medium">{data.name}</span> on{" "}
              <span className="font-medium">
                {moment(date).format("DD-MM-YYYY")}
              </span>{" "}
              at <span className="font-medium">{ts}</span>
            </p>
          </div>

          <form
            className="space-y-5"
            onSubmit={data.price == 0 ? handleSubmit : displayRazorpay}
          >
            <div className="flex flex-col items-start space-y-1 w-full">
              <label htmlFor="full_name" className="font-Lexend font-light">
                Full name
              </label>
              <input
                type="text"
                ref={nameRef}
                required
                autoComplete="off"
                id="full_name"
                className="focus:outline-none border p-3 placeholder:text-base font-Lexend font-normal rounded-md bg-slate-50 w-full"
              />
            </div>
            <div className="flex flex-col items-start space-y-1 w-full">
              <label htmlFor="email" className="font-Lexend font-light">
                Email address
              </label>
              <input
                ref={emailRef}
                type="email"
                required
                autoComplete="off"
                id="email"
                className="focus:outline-none border p-3 placeholder:text-base font-Lexend font-normal rounded-md bg-slate-50 w-full"
              />
            </div>
            <button
              disabled={isLoading}
              type="submit"
              className="px-6 disabled:cursor-not-allowed disabled:bg-primary/50 disabled:text-gray-400 py-2 text-lg font-Lexend font-semibold bg-primary text-white rounded-md flex items-center space-x-3"
            >
              {data.price === 0 ? "Submit" : "Make payment"}{" "}
              {isLoading && <Progress />}
            </button>
          </form>
        </Box>
      </Modal>
    </div>
  );
};

export default BookingDetailsModal;
