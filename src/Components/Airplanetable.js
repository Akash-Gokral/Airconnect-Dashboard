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
  const [id, setId] = useState();
  const [name, setName] = useState();
  const [plane, setPlane] = useState();
  const [capacity, setCapacity] = useState();

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
      name: "Edit Airplane Details",
      selector: (row) => (
        <button
          className="edit_delete_btn"
          data-bs-toggle="modal"
          data-bs-target="#staticBackdrop"
          onClick={() => editairplane(row)}
        >
          Edit
        </button>
      ),
      sortable: true,
    },
    {
      name: "Delete Airplane Details",
      selector: (row) => (
        <button className="edit_delete_btn" onClick={() => deleteairplane(row)}>
          Delete
        </button>
      ),
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
    const result = await res.data;
    if (result.st) {
      window.alert("Airplane details has been deleted");
      fetchAirplaneData();
    } else {
      alert(result.msg);
    }
  };

  const editairplane = (row) => {
    editairplanePopup();
    setName(row.name);
    setId(row.id);
    setPlane(row.plane_no);
    setCapacity(row.capacity);
  };

  const editairplanePopup = () => {
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
                Add / Edit Airplane Details
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
                  <label className="form-label">Plane no</label>
                  <input
                    className="form-control"
                    value={plane}
                    onChange={(e) => setPlane(e.target.value)}
                  />
                  <label className="form-label">Capacity</label>
                  <input
                    type="number"
                    className="form-control"
                    value={capacity}
                    onChange={(e) => setCapacity(e.target.value)}
                  />
                </div>

                <div className="d-flex justify-content-between w-50">
                  <button
                    type="button"
                    className=" popupbtn"
                    onClick={() => editairplanedata()}
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

  const editairplanedata = async () => {
    const items = localStorage.getItem("token");
    console.log(items);
    let token = "bearer " + items;

    const result = await axios.post(
      "http://143.198.124.185/api/master/insertEditAirplane",
      {
        uid: 1,
        id: id,
        name: name,
        plane: plane,
        capacity: capacity,
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
      alert("updated");
      fetchAirplaneData();
    } else {
      alert("error");
    }
  };

  useEffect(() => {
    fetchAirplaneData();
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
              Add Airplane details
            </button>
          </div>
          <DataTable
            title="Airplane Details"
            columns={columns}
            data={data}
            pagination
          />
        </div>
      </div>
      {editairplanePopup()}

      <Footer />
    </>
  );
};

export default Airplanetable;
