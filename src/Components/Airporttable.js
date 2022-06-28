import React, { useEffect } from "react";
import Footer from "./Footer";
import NavBar from "./NavBar";
import DataTable from "react-data-table-component";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useState } from "react";
import Sidebar from "./Sidebar";
import jwt_decode from "jwt-decode";
import Swal from "sweetalert2";

const Airporttable = () => {
  const [data, setData] = useState([]);
  const [page] = useState();
  const [perPage] = useState();
  const [id, setId] = useState();
  const [name, setName] = useState();
  const [code, setCode] = useState();
  const [terminal, setTerminal] = useState();

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
      name: "Edit Airport Details",
      selector: (row) => (
        <button
          className="edit_delete_btn"
          data-bs-toggle="modal"
          data-bs-target="#staticBackdrop"
          onClick={() => editairport(row)}
        >
            <i class="fa fa-pencil-square-o"></i>
        </button>
      ),
      sortable: true,
    },
    {
      name: "Delete Airport Details",
      selector: (row) => (
        <button className="edit_delete_btn" onClick={() => deleteairports(row)}>
           <i class="fa fa-trash"></i>
        </button>
      ),
      sortable: true,
    },
  ];

  const editairport = (row) => {
    editairportPopup();
    setName(row.name);
    setId(row.id);
    setCode(row.code);
    setTerminal(row.terminal);
  };

  const addAirport = (row) => {
    editairportPopup();
    setCode("");
    setName("");
    setId("");
    setTerminal("");

  }; 

  const deleteairports = (row)=>{
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3f6db8',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        deleteairport(row);
        Swal.fire(
          'Deleted!',
          `Details of  ${row.name} Airport has been deleted.`,
          'success'
        )
      }
    })
  }

  const editairportPopup = () => {
    return (
      <div
        className="modal fade"
        id="staticBackdrop"
        data-bs-backdrop="true"
        data-bs-keyboard="false"
        tabindex="-1"
        aria-labelledby="staticBackdropLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="staticBackdropLabel">
                Add / Edit Airport Details
              </h5>
            </div>
            <div className="modal-body">
              <form>
                <div className="mb-3">
                  <label className="form-label">ID</label>
                  <input
                    className="form-control"
                    value={id}
                    onChange={(e) => setId(e.target.value)}
                  />

                  <label className="form-label">Name</label>
                  <input
                    type="text"
                    className="form-control"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                  <label className="form-label">Code</label>
                  <input
                    className="form-control"
                    type="number"
                    required
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                  />
                  <label className="form-label">Terminal</label>
                  <input
                    type="number"
                    className="form-control"
                    required
                    value={terminal}
                    onChange={(e) => setTerminal(e.target.value)}
                  />
                </div>

                <div className="d-flex justify-content-between w-50">
                  <button
                    type="button"
                    className=" signoutbtn"
                    data-bs-dismiss="modal"
                    onClick={() => editairportdata()}
                  >
                    Submit
                  </button>
                  <button
                    type="button"
                    className="signoutbtn"
                    data-bs-dismiss="modal"
                  >
                    Close
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  };


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

  // Delete Admin

  const deleteairport = async (row) => {
    const items = localStorage.getItem("token");
    console.log(items);
    var decoded = jwt_decode(items);
    console.log(decoded);
    let token = "bearer " + items;

    const res = await axios.post(
      `http://143.198.124.185/api/master/deleteAirport`,
      {
        uid: decoded.id,
        id: row.id,
      },
      {
        headers: {
          Authorization: token,
        },
      }
    );
    const result = await res.data;
    if (result.st) {
      fetchAirportData();
    } else {
      alert(result.msg);
    }
  };

  
  // Edit Admin

  const editairportdata = async () => {
    const items = localStorage.getItem("token");
    console.log(items);
    var decoded = jwt_decode(items);
    console.log(decoded);
    let token = "bearer " + items;

    const result = await axios.post(
      "http://143.198.124.185/api/master/insertEditAirport",
      {
        uid: decoded.id,
        id: id,
        name: name,
        code: code,
        terminal: terminal,
      },
      {
        headers: {
          "content-type": "application/json",
          Authorization: token,
        },
      }
    );

    if (result) {
      fetchAirportData();
      alert(result.data.msg); 
      if(id===null){
      fetchAirportData();
      alert(result.data.msg)
    }
  }
  };

  useEffect(() => {
    fetchAirportData();
    if (!localStorage.getItem("token")) {
      navigate("/signin");
    }
  }, [page, perPage]);

  return (
    <>
       <div className="container-fluid">
        <div className="row"> 
      <NavBar />
      <Sidebar/>
      <div className="col-12 ">
        <div className="admintable">
          <div className="d-flex inputs p-2 ">
            <button
              className="signoutbtn"
              data-bs-toggle="modal"
              data-bs-target="#staticBackdrop"
              onClick={addAirport}
            >
               <i class="fa fa-user-plus pe-2"></i>  Add Airport details
            </button>
          </div>
          <DataTable
            title={<div><center><h2 className="mt-4">Airport Details</h2></center></div>}
            columns={columns}
            data={data}
            pagination
          />
        </div>
      </div>
      </div>
      </div>
      {editairportPopup()}
      <Footer />
    </>
  );
};

export default Airporttable;
