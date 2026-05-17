import React, { useState } from "react";
import List from "../component/List";
import { serviceApi } from "../lib/ServiceApi";

// Add this helper function
const formatDate = (dateStr) => {
  if (!dateStr) return "";
  return dateStr.replace("T", " ") + ":00";
};

const Service = () => {
  const [data, setData] = useState({
    service: "",
    start: "",

    price: 30,
  });

  function onChangeFunction(e) {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
  }

  async function onSubmitFunction(e) {
    e.preventDefault();
    try {
      const response = await serviceApi.createService({
        title: data.service,
        start: formatDate(data.start), // "2026-05-16 17:01:00"

        price: Number(data.price),
      });
      setMessage(response.data.message); // ✅ "Service saved! Cost: $90.00"
    } catch (error) {
      // This will now show you the exact Laravel validation errors
      console.log("Error response:", error.response?.data);
    }
  }

  return (
    <div>
      <form onSubmit={onSubmitFunction}>
        <input type="datetime-local" name="start" onChange={onChangeFunction} />

        <br />

        <List value={data.service} onChange={onChangeFunction} />

        <br />

        <label htmlFor="priceId">Price</label>

        <input
          id="priceId"
          type="number"
          name="price"
          value={data.price}
          onChange={onChangeFunction}
        />

        <br />

        <button>create service</button>
      </form>
    </div>
  );
};

export default Service;
