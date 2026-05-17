// ServiceList.jsx
import React from "react";

const List = ({ value, onChange }) => {
  const now = new Date();
  const services = [
    {
      title: "Engine service",
      start: new Date(now.getTime() + 2 * 24 * 60 * 60 * 1000),

      timeForDone: "2 days",
    },
    {
      title: "Fuel service",
      start: new Date(now.getTime() + 1 * 60 * 60 * 1000),
      timeForDone: "1 hour",
    },
    {
      title: "Item service",
      start: new Date(now.getTime() + 125 * 60 * 1000),
      timeForDone: "125 mins",
    },
    {
      title: "Electrical",
      start: new Date(now.getTime() + (24 * 60 + 30) * 60 * 1000),
      timeForDone: "24h 30mins",
    },
  ];

  const selectedService = services.find((s) => s.title === value);

  return (
    <div>
      <select name="service" value={value} onChange={onChange}>
        <option value="">-- Select a service --</option>

        {services.map((el) => (
          <option key={el.title} value={el.title}>
            {el.title} — {el.timeForDone}
          </option>
        ))}
      </select>

      {selectedService && (
        <div>
          <p>Title: {selectedService.title}</p>
          <p>Duration: {selectedService.timeForDone} hours</p>
          <p>Starts: {selectedService.start.toLocaleString()}</p>
        </div>
      )}
    </div>
  );
};

export default List;
