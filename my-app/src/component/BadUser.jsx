import React from "react";
import { serviceApi } from "../lib/ServiceApi";
import {useNavigate} from 'react-router-dom'
const BadUser = ({ id }) => {
  const navigate=useNavigate();
  async function createBadUsersList() {
    const raxac = JSON.parse(localStorage.getItem("deletedService"));
    if (!raxac) return;

    try {
      await serviceApi.CreateBadUsersList({
        service: raxac.title,
        started_time: raxac.start_time,
        delay_time: raxac.start_time, // ✅ match started_time, not a calculated offset
      });
      await serviceApi.deleteService(id);
      navigate(0);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <p>
      <button className="btn btn-warning p-2" onClick={createBadUsersList}>BadUser List</button>
    </p>
  );
};

export default BadUser;