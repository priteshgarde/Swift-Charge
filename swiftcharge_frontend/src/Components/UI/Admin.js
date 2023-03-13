import axios from "axios";
import React, { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const Admin = () => {
  const [stationDetails, setstationDetails] = useState();
  const navigate = useNavigate();
  useEffect(() => {
    async function fetchData() {
      const user = JSON.parse(localStorage.getItem("user"));

      if (!user || user?.role.id != 1) {
        console.log("redirecting" + user);
        navigate("/");
        return;
      }
      const { data } = await axios.get("http://localhost:8080/stationRequests");
      console.log(data);
      setstationDetails(data);
    }
    fetchData();
  }, []);

  const approveStation = async (e, id, index) => {
    try {
      await axios.get(`http://localhost:8080/approveStation/${id}`);
      const newArr = [...stationDetails];
      newArr[index].approved = true;
      setstationDetails(newArr);
    } catch (error) {
      console.log(error.response.data);
    }
  };
  return (
    <Table striped bordered hover variant="dark">
      <thead>
        <tr className="text-center">
          <th>Sr No</th>
          <th>Station Name</th>
          <th>Station Reg No</th>
          {/* <th>User Id</th> */}
          <th>Latittude</th>
          <th>Longitude</th>
          <th>Decision</th>
        </tr>
      </thead>

      {stationDetails?.map((item, index) => (
        <tbody key={item.id} id={index}>
          <tr className="text-center">
            <td>{item.id}</td>
            <td>{item.stationName}</td>
            <td>{item.registrationNumber}</td>
            {/* <td>{item.userId}</td> */}
            <td>{item.latitude}</td>
            <td>{item.longitude}</td>
            <td>
              {item.approved ? (
                <h3 className="text-success"> Approved </h3>
              ) : (
                <button
                  className="btn btn-primary m-1"
                  onClick={(e) => approveStation(e, item.id, index)}
                >
                  Approve
                </button>
              )}
            </td>
          </tr>
        </tbody>
      ))}
    </Table>
  );
};

export default Admin;
