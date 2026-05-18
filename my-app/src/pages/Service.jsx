import React, { useEffect, useState } from "react";
import List from "../component/List";
import { serviceApi } from "../lib/ServiceApi";
import Fetch from "../component/Fetch";
import { useNavigate } from 'react-router-dom'
// Add this helper function
const formatDate = (dateStr) => {
  if (!dateStr) return "";
  return dateStr.replace("T", " ") + ":00";
};

const Service = () => {
  const [data, setData] = useState({
    service: "",
    start: "",
  });
const navigate=useNavigate();
  const [WorkerID, setWorkerId] = useState(null);
  const workersName = [
    { id: 1, name: "Edwin" },
    { id: 2, name: "Valeri" },
    { id: 3, name: "Trump" },
    { id: 4, name: "Musk" },
  ];
  function onChangeFunction(e) {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
  }

  async function onSubmitFunction(e) {
    e.preventDefault();
    try {
      const response = await serviceApi.createService(WorkerID, {
        title: data.service,
        start: formatDate(data.start),
      });
      navigate(0);
    } catch (error) {
      // This will now show you the exact Laravel validation errors
      console.log("Error response:", error.response?.data);
    }
  }

  return (
    <div className="h-100 d-flex justify-content-center align-items-center container">
      <div>
        <Fetch />
        <form
          onSubmit={onSubmitFunction}
          className="bg-light mt-2 p-5 rounded rounded-3"
        >
          <input
            type="datetime-local"
            className="text-bg-warning form-control w-100"
            name="start"
            onChange={onChangeFunction}
          />

          <br />

          <List value={data.service} onChange={onChangeFunction} />

          <br />
          <select
            className="text-bg-primary form-select"
            onChange={(e) => setWorkerId(e.target.value)}
          >
            <option>Select Worker</option>
            {workersName.map((w) => (
              <option key={w.id} value={w.id}>
                {w.name}
              </option>
            ))}
          </select>

          <br />
          <button className="btn btn-success">create service</button>
        </form>
      </div>
    </div>
  );
};

export default Service;
