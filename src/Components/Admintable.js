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

  const navigate = useNavigate();


  const fetchAdminData = async (newPerPage) => {
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



  // const handlePageChange = page => {
  //   fetchAdminData(page);
  //   	};

      // const handlePerRowsChange = async (newPerPage, page) => {

      //   		const response = await axios.get(`https://reqres.in/api/users?page=${page}&per_page=${newPerPage}&delay=1`);
        
      //   		setData(response.data.data);
        
      //   		setLoading(false);
      //   	};
        



  useEffect(() => {
    fetchAdminData();
    if (!localStorage.getItem("token")) {
      navigate("/signin");
    }
    // const url ="http://143.198.124.185/api/getAdminList"
    // const data = {page:"",per_page:"",search_term:""}
    // const headers = {"Authorization":`Bearer ${token}`,"content-type":"application/json"}

    // axios.post({ url:url,headers:headers,body:data})
    // .then((result)=>{
    //  console.log(result)
    //

    //  const newData = result.data.map((res)=>{
    //     return{
    //         id:res.id,
    //         name:res.name,
    //         email:res.email,
    //         mobile:res.mobile,
    //         isblock:res.isblock
    //     }
    //  })
    //  setAdmindata(newData)
    //  console.log(admindata)
    // }).catch(error=>{
    //     console.log(error)
    // })
  }, [search, page, perPage]);

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
      selector: (row) => row.isblock ,
      sortable: true,
    },
    {
      name: "Action",
      selector: (row) => row.Edit ,
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
        <DataTable title="Users" columns={columns} data={data} pagination/>
      </div></div>
      {/* <div className="form_detail div">
        <div className="search_div w-100">
          <div className="d-flex inputs p-2 ">
            {" "}
            <p>Search:</p> <input type="text" className="ms-2"></input>
          </div>
        </div>
        <table className="table table-bordered mt-2" id="employeetable">
          <thead>
            <tr>
              <th scope="col">Id</th>
              <th scope="col">Name</th>
              <th scope="col">Email</th>
              <th scope="col">Mobile</th>
              <th scope="col">Password</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            {data.map((result) => {
              return (
                <tr>
                  <td>{result.id}</td>
                  <td>{result.name}</td>
                  <td>{result.email}</td>
                  <td>{result.mobile}</td>
                  <td>{result.password}</td>
                  <td className="edit_delete_btn">
                    <button>Edit</button> <button>Delete</button>{" "}
                    <button>Block</button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div> */}
      <Footer />
    </>
  );
};

export default Admintable;
