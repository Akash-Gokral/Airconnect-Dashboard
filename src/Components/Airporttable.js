import React, { useEffect } from "react";
import Footer from "./Footer";
import NavBar from "./NavBar";
import DataTable from "react-data-table-component";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useState } from "react";

const Airporttable = () => {

    
  const [data, setData] = useState([]);
  const [page, setPage] = useState();
  const [perPage, setPerPage] = useState();

  const navigate = useNavigate();



  const fetchAirportData = async () => {
    const items = localStorage.getItem("token");
    console.log(items);
    let token = "bearer " + items;

    await axios
      .post(
        `http://143.198.124.185/api/master/airportList`,
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

   const deleteadmin =()=>{

   }


  
  useEffect(()=>{
    fetchAirportData();
    if (!localStorage.getItem("token")) {
      navigate("/signin");
    }
  }, [page, perPage])


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
          name: "Code",
          selector: (row) => row.code,
          sortable: true,
        },
        {
          name: "Terminal",
          selector: (row) => row.terminal,
          sortable: true,
        },
        {
          name: "Edit Admin",
          selector: (row) =><button className="edit_delete_btn">Edit</button>,
          sortable: true,
        },
        {
          name: "Delete Admin",
          selector: (row) =><button className="edit_delete_btn">Delete</button>,
          sortable: true,
        },
      ];
    

  return (
    <>
      <NavBar />
      <div className="admintable_container">
        <div className="admintable">
          <div className="d-flex inputs p-2 ">
            <p>Search:</p> <input type="text" className="ms-2"></input>
          </div>
          <DataTable title="Airport Details" columns={columns} data={data} pagination />
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Airporttable;
