import React, { useEffect } from "react";
import Footer from "./Footer";
import NavBar from "./NavBar";
import DataTable from "react-data-table-component";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useState } from "react";

const Airplanetable = () => {

    
  const [data, setData] = useState([]);
  const [page, setPage] = useState();
  const [perPage, setPerPage] = useState();

  const navigate = useNavigate();

  const columns = [
    {
      name: "ID",
      selector: (row) => row.id,
      sortable: true,
    },
    {
      name: "Name",
      selector: (row) => row.name,
      sortable: true,
    },
    {
      name: "Plane No",
      selector: (row) => row.plane_no,
      sortable: true,
    },
    {
      name: "Capacity",
      selector: (row) => row.capacity,
      sortable: true,
    },
    {
      name: "Edit Admin",
      selector: (row) =><button className="edit_delete_btn">Edit</button>,
      sortable: true,
    },
    {
      name: "Delete Admin",
      selector: (row) =><button className="edit_delete_btn" onClick={() => deleteairplane(row)}>Delete</button>,
      sortable: true,
    },
  ];


  const fetchAirplaneData = async () => {
    const items = localStorage.getItem("token");
    console.log(items);
    let token = "bearer " + items;

    await axios
      .post(
        `http://143.198.124.185/api/master/airplaneList`,
        {
          page: page,
          per_page: perPage,
          search_term: "",
        },
        {
          headers: {
            Authorization: token,
          },
        }
      )
      .then(function (res) {
        setData(res.data.data);
        console.log(res);
      })
      .catch(function (err) {
        localStorage.removeItem("token");
        window.location.reload();
      });
  };
   
  // Delete Admin

  const deleteairplane = async (row) => {

    const items = localStorage.getItem("token");
    console.log(items);
    let token = "bearer " + items;
    alert(row.id);

    const res = await axios.post(
      `http://143.198.124.185/api/master/deleteAirplane`,
      {
        uid: 1,
        id: row.id,
      },
      {
        headers: {
          Authorization: token,
        },
      }
    );
    const result = await res.data
    if (result.st) {
      window.alert("Airplane has been deleted");
      fetchAirplaneData();
    }
    else{
      alert(result.msg)
    }

  };


  useEffect(()=>{
    fetchAirplaneData();
    if (!localStorage.getItem("token")) {
      navigate("/signin");
    }
  }, [page, perPage])
  

  return (
    <>
      <NavBar />
      <div className="admintable_container">
        <div className="admintable">
          <div className="d-flex inputs p-2 ">
            <p>Search:</p> <input type="text" className="ms-2"></input>
          </div>
          <DataTable title="Airplane Details" columns={columns} data={data} pagination />
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Airplanetable;
