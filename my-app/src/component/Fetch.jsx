import React, { useEffect, useState } from "react";
import { serviceApi } from "../lib/ServiceApi";
import { useNavigate } from "react-router-dom";
import BadUser from "./BadUser";

const Fetch = () => {
  const navigate = useNavigate();

  const [service, setService] = useState([]);

  async function DeleteServices(id) {
    try {
      const item = service.find((el) => el.id === id);

      localStorage.setItem("deletedService", JSON.stringify(item));
      

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
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    FetchServices();
  }, []);

  return (
    <div className="vstack gap-2">
      {service.map((el) => (
        <div className="d-flex gap-1" key={el.id}>
         <div className="text-bg-info p-2 rounded rounded-2">
           <span className="text-danger fw-bold fst-italic">
            {el.title} {"  "}
          </span>
          <span>{el.start_time}</span>
         </div>
         
           <button className="btn btn-danger p-1" onClick={() => DeleteServices(el.id)}>Delete From DB</button>
          <BadUser id={el.id}/>
         
        </div>
      ))}
    </div>
  );
};

export default Fetch;