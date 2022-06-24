import axios from "axios";
import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { useNavigate } from "react-router-dom";
import Footer from "./Footer";
import NavBar from "./NavBar";

const Admintable = () => {
  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState();
  const [perPage, setPerPage] = useState();
  const [deleteUser, setDeleteUser] = useState(false);

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
      name: "isBlock",
      selector: (row) => row.isblock,
      sortable: true,
    },
    {
      name: "Edit Admin",
      selector: (row) => <button className="edit_delete_btn" >Edit</button>,
      sortable: true,
    },
    {
      name: "Delete Admin",
      selector: (row) => (
        <button className="edit_delete_btn" onClick={() => deleteadmin(row)}>
          Delete
        </button>
      ),
      sortable: true,
    },
  ];

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
    alert(row.id);

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
    const result = await res.data
    if (result.st) {
      window.alert("User has been deleted");
      fetchAdminData();
    }
    else{
      alert(result.msg)
    }

  };



  useEffect(() => {
    fetchAdminData();
    if (!localStorage.getItem("token")) {
      navigate("/signin");
    }
  }, [search, page, perPage]);
  return (
    <>
      <NavBar />
      <div className="admintable_container">
        <div className="admintable">
          <div className="d-flex inputs p-2 ">
            <p>Search:</p> <input type="text" className="ms-2"></input>
          </div>
          <DataTable
            title="Admin Details"
            columns={columns}
            data={data}
            pagination
          />
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Admintable;
