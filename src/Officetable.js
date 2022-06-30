import axios from "axios";
import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import Footer from "./Components/Footer";
import NavBar from "./Components/NavBar";
import Sidebar from "./Components/Sidebar";
import jwt_decode from "jwt-decode";

const Officetable = () => {
  const [data, setData] = useState([]);
  const [page] = useState();
  const [perPage] = useState();
  const [id, setId] = useState();
  const [code, setCode] = useState();
  const [shortcode, setShortcode] = useState();
  const [license, setLicense] = useState();
  const [address, setAddress] = useState();
  const [city, setCity] = useState();

  const navigate = useNavigate();

  const columns = [
    {
      name: "ID",
      selector: (row) => row.id,
      sortable: true,
    },
    {
      name: "Code",
      selector: (row) => row.code,
      sortable: true,
    },
    {
      name: "short_code",
      selector: (row) => row.short_code,
      sortable: true,
    },
    {
      name: "licence_no",
      selector: (row) => row.licence_no,
      sortable: true,
    },
    {
      name: "address",
      selector: (row) => row.address,
      sortable: true,
    },
    {
      name: "city",
      selector: (row) => row.city,
      sortable: true,
    },
    {
      name: "Edit office",
      selector: (row) => (
        <button
          className="edit_delete_btn"
          data-bs-toggle="modal"
          data-bs-target="#staticBackdrop"
          onClick={() => editPop(row)}
        >
          <i class="fa fa-pencil-square-o"></i>
        </button>
      ),
      sortable: true,
    },
    {
      name: "Delete Office",
      selector: (row) => (
        <button className="edit_delete_btn" onClick={() => deleteoffices(row)}>
          <i class="fa fa-trash"></i>
        </button>
      ),
      sortable: true,
    },
  ];

  const editPop = (row) => {
    editofficePopup();
    setId(row.id);
    setCode(row.code);
    setShortcode(row.short_code);
    setLicense(row.licence_no);
    setAddress(row.address);
    setCity(row.city);
  };

  const addoffice = () => {
    editofficePopup();
    setId("");
    setCode("");
    setShortcode("");
    setLicense("");
    setAddress("");
    setCity("");
  };

  const deleteoffices = (row) => {
    Swal.fire({
      title: "Are you sure you want to delete it?",
      text: "You won't be able to revert this!",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3f6db8",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteoffice(row);
        Swal.fire(
          "Deleted!",
          `Details of ID ${row.id} ${row.city} has been deleted.`,
          "success"
        );
      }
    });
  };

  const editofficePopup = () => {
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
                Add / Edit Office
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
                  <label className="form-label">Code</label>
                  <input
                    className="form-control"
                    type="number"
                    required
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                  />
                  <label className="form-label">Short Code</label>
                  <input
                    className="form-control"
                    type="number"
                    required
                    value={shortcode}
                    onChange={(e) => setShortcode(e.target.value)}
                  />

                  <label className="form-label">license</label>
                  <input
                    type="number"
                    required
                    className="form-control"
                    value={license}
                    onChange={(e) => setLicense(e.target.value)}
                  />
                  <label for="exampleInputEmail1" className="form-label">
                    Address
                  </label>
                  <input
                    type="text"
                    required
                    className="form-control"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                  />
                  <label className="form-label">City</label>
                  <input
                    type="text"
                    required
                    className="form-control"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                  />
                </div>

                <div className="d-flex justify-content-between w-50">
                  <button
                    type="button"
                    className=" signoutbtn"
                    data-bs-dismiss="modal"
                    onClick={() => editoffice()}
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



  // Get Office List
  const officelist = async () => {
    const items = localStorage.getItem("token");
    let token = "bearer " + items;
    await axios
      .post(
        `http://143.198.124.185/api/getOfficeList`,
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
      })
      .catch(function (err) {
        localStorage.removeItem("token");
        window.location.reload();
      });
  };

// Delete Admin

const deleteoffice = async (row) => {
    const items = localStorage.getItem("token");
    console.log(items);
    var decoded = jwt_decode(items);
    console.log(decoded);
    let token = "bearer " + items;

    const res = await axios.post(
      `http://143.198.124.185/api/deleteOffice`,
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
    console.log(result);
    if (result.st) {
        officelist();
    } else {
      console.log(result.msg);
    }
  };

  // Edit Admin

  const editoffice = async () => {
    const items = localStorage.getItem("token");
    console.log(items);
    var decoded = jwt_decode(items);
    console.log(decoded);

    let token = "bearer " + items;

    const result = await axios.post(
      "http://143.198.124.185/api/insertEditOffice",
      {
        uid: decoded.id,
        id: id,
        code: code,
        short_code: shortcode,
        licence_no: license,
        address: address,
        city: city,
      },
      {
        headers: {
          "content-type": "application/json",
          Authorization: token,
        },
      }
    );

    if (result) {
        officelist();

      if (id === null) {
        officelist();
        alert(result.data.msg);
      } else {
        alert(result.data.msg);
      }
    }
  };


  useEffect(() => {
    officelist();

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
          <div className="col-12">
            <div className="admintable">
              <div className="d-flex inputs  p-2 ">
                <button
                  className="signoutbtn"
                  data-bs-toggle="modal"
                  data-bs-target="#staticBackdrop"
                  onClick={addoffice}
                >
                  <i class="fa fa-user-plus pe-2"></i> Add Office
               
                </button>
              </div>
              <DataTable
                title={
                  <div>
                    <center>
                      <h2 className="mt-4">Office Details</h2>
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
      {editofficePopup()}
      <Footer />
    </>
  );
};

export default Officetable;
