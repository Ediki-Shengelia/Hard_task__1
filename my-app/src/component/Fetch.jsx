import React, { useEffect, useState } from "react";
import { serviceApi } from "../lib/ServiceApi";
import {useNavigate} from 'react-router-dom'
const Fetch = () => {
    const navigate=useNavigate();
  const [service, setService] = useState([]);
  async function DeleteServices(id) {
    try {
      await serviceApi.deleteService(id);
      navigate(0);
    } catch (error) {
      console.log(error);
    }
  }
  async function FetchServices() {
    try {
      const response = await serviceApi.getServices();
      setService(response.data);
         localStorage.setItem('bad_user_service',response.data.service);
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    FetchServices();
  }, []);
  return (
    <div>
      {service.map((el) => (
        <p key={el.id}>
          <span style={{ color: "red" }}>
            {el.title} {"  "}
          </span>
          <span>{el.start_time}</span>
          <button onClick={() => DeleteServices(el.id)}>Delete From DB</button>
        </p>
      ))}
    </div>
  );
};

export default Fetch;
