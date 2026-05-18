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
      <select className="text-dark bg-info form-select" name="service" value={value} onChange={onChange}>
        <option value="">-- Select a service --</option>
        {services.map((s) => (
          <option key={s.title} value={s.title}>
            {s.title} — {s.timeForDone}
          </option>
        ))}
      </select>

      {selected && (
        <div className="text-bg-secondary p-2 rounded rounded-2 mt-2">
          <p className="h1"><span className="text-danger ">Title:</span> {selected.title}</p>
          <p><span className="text-danger h3">Duration:</span> {selected.timeForDone}</p>
          <p><span className="text-danger h3">Price:</span> ${selected.totalPrice.toFixed(2)}</p>
          <p><span className="text-danger h3">Starts:</span> {selected.start.toLocaleString()}</p>
        </div>
      )}
    </div>
  );
};

export default List;