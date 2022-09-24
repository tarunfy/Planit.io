import { useEffect, useState } from "react";
import TimePicker from "./TimePicker";
import moment from "moment";

const DayContainer = ({ dayName, setDaysData }) => {
  const [from, setFrom] = useState("04:00");
  const [to, setTo] = useState("17:00");
  const [isAvailable, setIsAvailable] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const beginningTime = moment(to.toString(), "h:mma");
    const endTime = moment(from.toString(), "h:mma");
    if (from === to) {
      setError("Choose different time slots");
      return;
    } else if (beginningTime.isBefore(endTime)) {
      setError("Start time cannot be bigger than end time");
      return;
    } else {
      setError("");
      setDaysData((d) => ({
        ...d,
        [dayName]: isAvailable ? { from, to } : null,
      }));
    }
  }, [isAvailable, from, to]);

  return (
    <>
      <li className="li-availability">
        <div className="availability-input-wrapper">
          <input
            type="checkbox"
            name="day"
            id={dayName}
            checked={isAvailable}
            onChange={(e) => setIsAvailable(e.target.checked)}
            className="focus:outline-none"
          />
          <label htmlFor={dayName} className="availability-label">
            {dayName}
          </label>
        </div>
        {isAvailable ? (
          <TimePicker
            error={error}
            from={from}
            to={to}
            setFrom={setFrom}
            setTo={setTo}
          />
        ) : (
          <p className="text-sm font-Outfit font-light">Unavailable</p>
        )}
      </li>
    </>
  );
};

export default DayContainer;
