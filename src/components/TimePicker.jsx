export default function BasicTimePicker({ from, to, setFrom, setTo, error }) {
  return (
    <div className="flex items-start flex-col">
      <div className="flex items-center justify-between space-x-4">
        <select
          name="time"
          id="from"
          value={from}
          onChange={(e) => setFrom(e.target.value)}
          className="px-4 py-2 border focus:outline-none"
        >
          <Opt />
        </select>

        <div className="w-2 h-[2px] bg-slate-600 rounded-full"></div>
        <select
          name="time"
          id="to"
          value={to}
          onChange={(e) => setTo(e.target.value)}
          className="px-4 py-2 border focus:outline-none"
        >
          <Opt />
        </select>
      </div>
      {error && <p className="text-sm text-red-500 text-center">{error}</p>}
    </div>
  );
}

const Opt = () => (
  <>
    <option value="12:00">12:00</option>
    <option value="01:00">01:00</option>
    <option value="02:00">02:00</option>
    <option value="03:00">03:00</option>
    <option value="04:00">04:00</option>
    <option value="05:00">05:00</option>
    <option value="06:00">06:00</option>
    <option value="07:00">07:00</option>
    <option value="08:00">08:00</option>
    <option value="09:00">09:00</option>
    <option value="10:00">10:00</option>
    <option value="11:00">11:00</option>
    <option value="12:00">12:00</option>
    <option value="13:00">13:00</option>
    <option value="14:00">14:00</option>
    <option value="15:00">15:00</option>
    <option value="16:00">16:00</option>
    <option value="17:00">17:00</option>
    <option value="18:00">18:00</option>
    <option value="19:00">19:00</option>
    <option value="20:00">20:00</option>
    <option value="21:00">21:00</option>
    <option value="22:00">22:00</option>
    <option value="23:00">23:00</option>
  </>
);
