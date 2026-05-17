const List = ({ value, onChange }) => {
  const now = new Date();
  const services = [
    { title: "Engine service", timeForDone: "2 days", totalPrice: 500.0, start: new Date(now.getTime() + 2 * 24 * 60 * 60 * 1000) },
    { title: "Fuel service", timeForDone: "1 hour", totalPrice: 50.0, start: new Date(now.getTime() + 1 * 60 * 60 * 1000) },
    { title: "Item service", timeForDone: "125 mins", totalPrice: 80.0, start: new Date(now.getTime() + 125 * 60 * 1000) },
    { title: "Electrical", timeForDone: "24h 30mins", totalPrice: 300.0, start: new Date(now.getTime() + (24 * 60 + 30) * 60 * 1000) },
  ];

  const selected = services.find((s) => s.title === value);

  return (
    <div>
      <select name="service" value={value} onChange={onChange}>
        <option value="">-- Select a service --</option>
        {services.map((s) => (
          <option key={s.title} value={s.title}>
            {s.title} — {s.timeForDone}
          </option>
        ))}
      </select>

      {selected && (
        <div>
          <p>Title: {selected.title}</p>
          <p>Duration: {selected.timeForDone}</p>
          <p>Price: ${selected.totalPrice.toFixed(2)}</p>
          <p>Starts: {selected.start.toLocaleString()}</p>
        </div>
      )}
    </div>
  );
};

export default List;