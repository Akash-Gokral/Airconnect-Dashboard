import axios from "axios";
import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { useNavigate } from "react-router-dom";
import Footer from "./Footer";
import NavBar from "./NavBar";

const Admintable = () => {
  const [data, setData] = useState([]);
  const [page] = useState();
  const [perPage] = useState();
  const [email, setEmail] = useState();
  const [name, setName] = useState();
  const [id, setId] = useState();
  const [mobile, setMobile] = useState();
  const [password, setPassword] = useState();
  const [block,setBlock] = useState('Active')

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
      name: "Email",
      selector: (row) => row.email,
      sortable: true,
    },
    {
      name: "Mobile",
      selector: (row) => row.mobile,
      sortable: true,
    },
    {
      name: "Block",
      selector: (row) => (<button className="edit_delete_btn" onClick={() => blockadmin(row)}>
     <i class="fa fa-user-times"></i>
    </button> ), 
      sortable: true,
    },
    {
      name: "Status",
      selector: (row) => row.isblock, 
      sortable: true,
    },  
    {
      name: "Edit Admin",
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
      name: "Delete Admin",
      selector: (row) => (
        <button className="edit_delete_btn" onClick={() => deleteadmin(row)}>
          <i class="fa fa-trash"></i>
        </button>
      ),
      sortable: true,
    },
  ];

  
  const editPop = (row) => {
    editadminPopup();
    setEmail(row.email);
    setName(row.name);
    setId(row.id);
    setMobile(row.mobile);
  };

  const addAdmin = () => {
    editadminPopup();
    setEmail("");
    setName("");
    setId("");
    setMobile("");
  };

  const editadminPopup = () => {
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
                Add / Edit Admin
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
                    required
                    className="form-control"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                  <label for="exampleInputEmail1" className="form-label">
                    Email
                  </label>
                  <input
                    type="email"
                    required
                    className="form-control"
                    id="exampleInputEmail1"
                    aria-describedby="emailHelp"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <label className="form-label">Mobile</label>
                  <input
                    type="number"
                    required
                    className="form-control"
                    value={mobile}
                    onChange={(e) => setMobile(e.target.value)}
                  />
                  <label className="form-label">Password</label>
                  <input
                    type="password"
                    required
                    className="form-control"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>

                <div className="d-flex justify-content-between w-50">
                  <button
                    type="button"
                    className=" signoutbtn"
                    data-bs-dismiss="modal"
                    onClick={() => editadmin()}
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


  // Get Admin user
  const fetchAdminData = async () => {
    const items = localStorage.getItem("token");
    console.log(items);
    let token = "bearer " + items;

    await axios
      .post(
        `http://143.198.124.185/api/getAdminList`,
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

  const deleteadmin = async (row) => {
    const items = localStorage.getItem("token");
    console.log(items);
    let token = "bearer " + items;

    const res = await axios.post(
      `http://143.198.124.185/api/deleteAdmin`,
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
      window.alert(`User ${row.name} has been deleted`);
      fetchAdminData();
    } else {
      alert(result.msg);
    }
  };

  // Edit Admin

  const editadmin = async () => {
    const items = localStorage.getItem("token");
    console.log(items);
    let token = "bearer " + items;

    const result = await axios.post(
      "http://143.198.124.185/api/insertEditAdmin",
      {
        uid: 1,
        id: id,
        name: name,
        email: email,
        mobile: mobile,
        password: password,
      },
      {
        headers: {
          "content-type": "application/json",
          Authorization: token,
        },
      }
    );

    if (result) {
      fetchAdminData();

      if (id === null) {
        fetchAdminData();
        alert(result.data.msg);
      }
      else{
        alert(result.data.msg)
      }
    }
  };

  // Block Admin

  const blockadmin = async (row) => {
    const items = localStorage.getItem("token");
    let token = "bearer " + items;

    const result = await axios.post(
      "http://143.198.124.185/api/blockAdmin",
      {
        uid: 1,
        id: row.id,
      },
      {
        headers: {
          "content-type": "application/json",
          Authorization: token,
        },
      }
    );
      if(result){
        console.log(result);
        if(result.data.st == true){
        alert(`User ${row.name} has been Blocked`)
        fetchAdminData();
        }
        else{
          alert(result.data.msg)
        }
      }

    
  };

  useEffect(() => {
    fetchAdminData();
    if (!localStorage.getItem("token")) {
      navigate("/signin");
    }
  }, [page, perPage]);
  return (
    <>
      <NavBar />
      <div className="col-12 admintable_container">
        <div className="admintable">
          <div className="d-flex inputs  p-2 ">
            <button
              className="signoutbtn"
              data-bs-toggle="modal"
              data-bs-target="#staticBackdrop"
              onClick={addAdmin}
            >
              <i class="fa fa-user-plus pe-2"></i> Add Admin
            </button>
          </div>
          <DataTable
            title="Admin Details"
            columns={columns}
            data={data}
            pagination
          />
        </div>
      </div>

      {editadminPopup()}

      <Footer />
    </>
  );
};

export default Admintable;
