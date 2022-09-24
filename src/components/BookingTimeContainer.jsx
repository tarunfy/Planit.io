import moment from "moment";
import { useState } from "react";
import { useEffect } from "react";
import BookingDetailsModal from "./BookingDetailsModal";
import { db } from "../utils/dbConfig";
import { useParams } from "react-router";

const BookingTimeContainer = ({ date, daysData, data }) => {
  let oneDate = moment(date, "DD-MM-YYYY");
  let dayName = oneDate.format("dddd");
  const { eventId, userId } = useParams();

  const [timeslots, setTimeslots] = useState([]);

  useEffect(() => {
    createSlots();
  }, [date, timeslots]);

  const createSlots = async () => {
    const day = daysData[dayName.substring(0, 3).toLowerCase()];

    if (day !== null) {
      let initialTime = day.from;

      const [finHr, finMin] = day.to.split(":");
      const finalDateObj = new Date(new Date(date).setHours(finHr, finMin));

      const [hr, min] = initialTime.split(":");
      let dateObj = new Date(new Date(date).setHours(hr, min));

      let tsl = [];

      tsl.push(dateObj.toTimeString().substring(0, 5));

      while (moment(dateObj).isBefore(finalDateObj)) {
        dateObj = moment(dateObj).add(30, "m").toDate();
        tsl.push(dateObj.toTimeString().substring(0, 5));
      }

      tsl.pop();

      const snap = await db
        .collection("users")
        .doc(userId)
        .collection("events")
        .doc(eventId)
        .collection("bookings")
        .where("date", "==", oneDate.format("DD-MM-YYYY"))
        .get();

      const bookedTs = snap.docs.map((doc) => doc.data().ts);

      tsl = tsl.filter((ts) => !bookedTs.includes(ts));
      setTimeslots(tsl);
    } else {
      setTimeslots([]);
    }
  };

  return (
    <div className="transition-all flex items-center flex-col justify-center w-[40%] duration-300  overflow-y-scroll ease-in-out  space-y-5">
      <h1 className="text-xl text-center font-normal">{`${dayName},  ${date.getDate()}`}</h1>

      <div className="space-y-5 max-h-[500px]">
        {timeslots.length > 0 ? (
          timeslots.map((ts, index) => (
            <BookingDetailsModal
              key={index}
              date={oneDate}
              ts={ts}
              data={data}
            />
          ))
        ) : (
          <p className="text-bold text-center">Not Available</p>
        )}
      </div>
    </div>
  );
};

export default BookingTimeContainer;
