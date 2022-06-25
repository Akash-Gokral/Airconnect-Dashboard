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
      name: "Edit Admin",
      selector: (row) => (
        <button
          className="edit_delete_btn"
          data-bs-toggle="modal"
          data-bs-target="#staticBackdrop"
          onClick={() => editairport(row)}
        >
          Edit
        </button>
      ),
      sortable: true,
    },
    {
      name: "Delete Admin",
      selector: (row) => (
        <button className="edit_delete_btn" onClick={() => deleteairport(row)}>
          Delete
        </button>
      ),
      sortable: true,
    },
  ];

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
    let token = "bearer " + items;

    const res = await axios.post(
      `http://143.198.124.185/api/master/deleteAirport`,
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
    const result = await res.data;
    if (result.st) {
      window.alert(`Details of ${row.name} has been deleted`);
      fetchAirportData();
    } else {
      alert(result.msg);
    }
  };

  const editairport = (row) => {
    editairportPopup();
    setName(row.name);
    setId(row.id);
    setCode(row.code);
    setTerminal(row.terminal);
  };

  const editairportPopup = () => {
    return (
      <div
        className="modal fade"
        id="staticBackdrop"
        data-bs-backdrop="static"
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
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                  <label className="form-label">Code</label>
                  <input
                    className="form-control"
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                  />
                  <label className="form-label">Terminal</label>
                  <input
                    type="number"
                    className="form-control"
                    value={terminal}
                    onChange={(e) => setTerminal(e.target.value)}
                  />
                </div>

                <div className="d-flex justify-content-between w-50">
                  <button
                    type="button"
                    className=" popupbtn"
                    data-bs-dismiss="modal"
                    onClick={() => editairportdata()}
                  >
                    Submit
                  </button>
                  <button
                    type="button"
                    className="popupbtn"
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

  // Edit Admin

  const editairportdata = async () => {
    const items = localStorage.getItem("token");
    console.log(items);
    let token = "bearer " + items;

    const result = await axios.post(
      "http://143.198.124.185/api/master/insertEditAirport",
      {
        uid: 1,
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
      console.log(result);
      alert("Details has been updated");
      fetchAirportData();
    } else {
      alert("error");
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
      <NavBar />
      <div className="admintable_container">
        <div className="admintable">
          <div className="d-flex inputs p-2 ">
            <button
              className="popupbtn"
              data-bs-toggle="modal"
              data-bs-target="#staticBackdrop"
            >
              Add Airport details
            </button>
          </div>
          <DataTable
            title="Airport Details"
            columns={columns}
            data={data}
            pagination
          />
        </div>
      </div>
      {editairportPopup()}
      <Footer />
    </>
  );
};

export default Airporttable;
