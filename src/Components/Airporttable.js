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
    alert(row.id);

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
      window.alert("Airport details has been deleted");
      fetchAirportData();
    } else {
      alert(result.msg);
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
            {/* <p>Search:</p> <input type="text" className="ms-2"></input> */}
          </div>
          <DataTable
            title="Airport Details"
            columns={columns}
            data={data}
            pagination
          />
        </div>
      </div>

      <div
        class="modal fade"
        id="staticBackdrop"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabindex="-1"
        aria-labelledby="staticBackdropLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="staticBackdropLabel">
                Add / Edit Airport Details
              </h5>
            </div>
            <div class="modal-body">
              <form>
                <div class="mb-3">
                  <label class="form-label">ID</label>
                  <input class="form-control" />
                  <label class="form-label">Name</label>
                  <input class="form-control" />
                  <label class="form-label">Code</label>
                  <input class="form-control" />
                  <label class="form-label">Terminal</label>
                  <input class="form-control" />
                </div>
                <div className="d-flex justify-content-between w-50">
                  <button type="submit" class=" popupbtn">
                    Submit
                  </button>
                  <button
                    type="button"
                    class="popupbtn"
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
      <Footer />
    </>
  );
};

export default Airporttable;
