import React from "react";
import { serviceApi } from "../lib/ServiceApi";

const BadUser = ({ id }) => {
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