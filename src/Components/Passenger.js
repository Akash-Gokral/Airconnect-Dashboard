import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import Footer from "./Footer";
import NavBar from "./NavBar";
import Sidebar from "./Sidebar";
import jwt_decode from "jwt-decode";
import axios from "axios";

const Passenger = () => {
  const [data, setData] = useState([]);
  const [page] = useState();
  const [perPage] = useState();
  const [id, setId] = useState();
  const [type, setType] = useState();
  const [code, setCode] = useState();
  const [agegroup, setAgegroup] = useState();
  const [description, setDescription] = useState();

  const navigate = useNavigate();

  const columns = [
    {
      name: "ID",
      selector: (row) => row.id,
      sortable: true,
    },
    {
      name: "Type",
      selector: (row) => row.type,
      sortable: true,
    },
    {
      name: "Code",
      selector: (row) => row.code,
      sortable: true,
    },
    {
      name: "Age Group",
      selector: (row) => row.age_group,
      sortable: true,
    },
    {
      name: "Description",
      selector: (row) => row.description,
      sortable: true,
    },
    {
      name: "Edit Passenger Details",
      selector: (row) => (
        <button
          className="edit_delete_btn"
          data-bs-toggle="modal"
          data-bs-target="#staticBackdrop"
          onClick={() => editpassengers(row)}
        >
          <i class="fa fa-pencil-square-o"></i>
        </button>
      ),
      sortable: true,
    },
    {
      name: "Delete Passenger Details",
      selector: (row) => (
        <button
          className="edit_delete_btn"
          onClick={() => deletepassengers(row)}
        >
          <i class="fa fa-trash"></i>
        </button>
      ),
      sortable: true,
    },
  ];

  const editpassengers = (row) => {
    editpassengerPopup();
    setId(row.id);
    setType(row.type);
    setCode(row.code);
    setAgegroup(row.age_group);
    setDescription(row.description);
  };

  const addpassenger = () => {
    editpassengerPopup();
    setId("");
    setType("");
    setCode("");
    setAgegroup("");
    setDescription("");
  };

  const deletepassengers = (row)=>{
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
        deletepassenger(row);
        Swal.fire(
          'Deleted!',
          `Details of ${row.type} code: ${row.code} has been deleted.`,
          'success'
        )
      }
    })
  }

  const editpassengerPopup = () => {
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
                Add / Edit Passenger Details
              </h5>
            </div>
            <div className="modal-body">
              <form>
                <div className="mb-3">
                  <label className="form-label">ID</label>
                  <input
                    className="form-control"
                    type="number"
                    value={id}
                    onChange={(e) => setId(e.target.value)}
                  />

                  <label className="form-label">Type</label>
                  <input
                    type="text"
                    className="form-control"
                    value={type}
                    required
                    onChange={(e) => setType(e.target.value)}
                  />
                  <label className="form-label">Code</label>
                  <input
                    className="form-control"
                    type="number"
                    value={code}
                    required
                    onChange={(e) => setCode(e.target.value)}
                  />
                  <label className="form-label">Age Group</label>
                  <input
                    type="text"
                    className="form-control"
                    value={agegroup}
                    required
                    onChange={(e) => setAgegroup(e.target.value)}
                  />
                    <label className="form-label">Description</label>
                  <input
                    type="text"
                    className="form-control"
                    value={description}
                    required
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </div>

                <div className="d-flex justify-content-between w-50">
                  <button
                    type="button"
                    className=" signoutbtn"
                    data-bs-dismiss="modal"
                    onClick={() => editpassengerdata()}
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

  const fetchpassengers = async () => {
    const items = localStorage.getItem("token");
    let token = "bearer " + items;
    await axios
      .post(
        `http://143.198.124.185/api/master/paxList`,
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
        // console.log(res);
      })
      .catch(function (err) {
        localStorage.removeItem("token");
        window.location.reload();
      });
  };

    // Delete Passenger

    const deletepassenger = async (row) => {
        const items = localStorage.getItem("token");
        console.log(items);
        var decoded = jwt_decode(items);
        console.log(decoded);
        let token = "bearer " + items;
    
        const res = await axios.post(
          `http://143.198.124.185/api/master/deletePax`,
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
            fetchpassengers();
        } else {
          alert(result.msg);
        }
      };

      
  // Edit Passenger

  const editpassengerdata = async () => {
    const items = localStorage.getItem("token");
    console.log(items);
    var decoded = jwt_decode(items);
    console.log(decoded);
    let token = "bearer " + items;

    const result = await axios.post(
      "http://143.198.124.185/api/master/insertEditPax",
      {
        uid: decoded.id,
        id: id,
        type: type,
        code: code,
        age_group: agegroup,
        description:description,
      },
      {
        headers: {
          "content-type": "application/json",
          Authorization: token,
        },
      }
    );

    if (result) {
        fetchpassengers();
      alert(result.data.msg);

       if(id===null){
        fetchpassengers();
        alert(result.data.msg)
      }
    }
  };

  useEffect(() => {
    fetchpassengers();
    if (!localStorage.getItem("token")) {
      navigate("/signin"); 
    }
  }, [page, perPage]);


  return (
    <>
      <div className="container-fluid">
        <div className="row">
          <NavBar />
          <Sidebar />
          <div className="col-12 admintable_container">
            <div className="admintable">
              <div className="d-flex inputs p-2 ">
                <button
                  className="signoutbtn"
                  data-bs-toggle="modal"
                  data-bs-target="#staticBackdrop"
                  onClick={addpassenger}
                >
                  <i class="fa fa-user-plus pe-2"></i> Add Passenger details
                </button>
              </div>
              <DataTable
                title={
                  <div>
                    <center>
                      <h2 className="mt-4">Passengers Details</h2>
                    </center>
                  </div>
                }
                columns={columns}
                data={data}
                pagination
              />
            </div>
          </div>
        </div>
      </div>
      {editpassengerPopup()}

      <Footer />
    </>
  );
};

export default Passenger;
