import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import jwt_decode from "jwt-decode";
import axios from 'axios';
import NavBar from './NavBar';
import Sidebar from './Sidebar';
import DataTable from 'react-data-table-component';
import Footer from './Footer';

const Pilot = () => {

    const [data, setData] = useState([]);
    const [page] = useState();
    const [perPage] = useState();
    const [id, setId] = useState();
    const [name, setName] = useState();
    const [mobile, setMobile] = useState();
    const [altmobile, setAltmobile] = useState();
    const [email, setEmail] = useState();
    const [address, setAddress] = useState();
    const [licenceno, setLicenseno] = useState();
    const [licencedoc, setLicensedoc] = useState();
    const [govdoc, setGovtdoc] = useState();

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
          name: "Mobile",
          selector: (row) => row.mobile,
          sortable: true,
        },
        {
          name: "Alt Mobile",
          selector: (row) => row.alt_mobile,
          sortable: true,
        },
        {
          name: "Email",
          selector: (row) => row.email,
          sortable: true,
        },
        {
          name: "Address",
          selector: (row) => row.address,
          sortable: true,
        },
        {
          name: "License No",
          selector: (row) => row.licence_no,
          sortable: true,
        },
        {
          name: "License Doc",
          selector: (row) => row.licence_doc,
          sortable: true,
        },
        {
          name: "Gov doc",
          selector: (row) => row.gov_doc,
          sortable: true,
        },
        {
          name: "Edit Pilot Details",
          selector: (row) => (
            <button
              className="edit_delete_btn"
              data-bs-toggle="modal"
              data-bs-target="#staticBackdrop"
              onClick={() => editpilots(row)}
            >
              <i class="fa fa-pencil-square-o"></i>
            </button>
          ),
          sortable: true,
        },
        {
          name: "Delete Pilot Details",
          selector: (row) => (
            <button
              className="edit_delete_btn"
              onClick={() => deletepilots(row)}
            >
              <i class="fa fa-trash"></i>
            </button>
          ),
          sortable: true,
        },
      ];

      const editpilots = (row) => {
        editpilotPopup();
        setId(row.id);
        setName(row.name);
        setMobile(row.mobile);
        setAltmobile(row.alt_mobile);
        setEmail(row.email);
        setAddress(row.address);
        setLicenseno(row.licence_no);
        setLicensedoc(row.licence_doc);
        setGovtdoc(row.gov_doc);
      };
    
      const addpilot = () => {
        editpilotPopup();
        setId("");
        setName("");
        setMobile("");
        setAltmobile("");
        setEmail("");
        setAddress("");
        setLicenseno("");
        setLicensedoc("");
        setGovtdoc("");
      };

      const deletepilots = (row)=>{
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
            deletepilot(row);
            Swal.fire(
              'Deleted!',
              `Details of ${row.name} of ${row.address} has been deleted.`,
              'success'
            )
          }
        })
      }

      const editpilotPopup = () => {
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
                    Add / Edit Pilot Details
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
    
                      <label className="form-label">Name</label>
                      <input
                        type="text"
                        className="form-control"
                        value={name}
                        required
                        onChange={(e) => setName(e.target.value)}
                      />
                      <label className="form-label">Mobile</label>
                      <input
                        className="form-control"
                        type="number"
                        value={mobile}
                        required
                        onChange={(e) => setMobile(e.target.value)}
                      />
                      <label className="form-label">Alt Mobile</label>
                      <input
                        type="number"
                        className="form-control"
                        value={altmobile}
                        required
                        onChange={(e) => setAltmobile(e.target.value)}
                      />
                        <label className="form-label">Email</label>
                      <input
                        type="email"
                        id="exampleInputEmail1"
                        aria-describedby="emailHelp"
                        className="form-control"
                        value={email}
                        required
                        onChange={(e) => setEmail(e.target.value)}
                      />
                        <label className="form-label">Address</label>
                      <input
                        type="text"
                        className="form-control"
                        value={address}
                        required
                        onChange={(e) => setAddress(e.target.value)}
                      />
                           <label className="form-label">Licence No</label>
                      <input
                        type="number"
                        className="form-control"
                        value={licenceno}
                        required
                        onChange={(e) => setLicenseno(e.target.value)}
                      />
                           <label className="form-label">Licence Doc</label>
                      <input
                        type="file"
                        className="form-control"
                        value={licencedoc}
                        required
                        onChange={(e) => setLicensedoc(e.target.value)}
                      />
                             <label className="form-label">Govt Doc</label>
                      <input
                        type="file"
                        className="form-control"
                        value={govdoc}
                        required
                        onChange={(e) => setGovtdoc(e.target.value)}
                      />
                    </div>
    
                    <div className="d-flex justify-content-between w-50">
                      <button
                        type="button"
                        className=" signoutbtn"
                        data-bs-dismiss="modal"
                        onClick={() => editpilotdata()}
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

      const fetchpilots = async () => {
        const items = localStorage.getItem("token");
        let token = "bearer " + items;
        await axios
          .post(
            `http://143.198.124.185/api/master/pilotList`,
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
    
        // Delete Pilot
    
        const deletepilot = async (row) => {
            const items = localStorage.getItem("token");
            console.log(items);
            var decoded = jwt_decode(items);
            console.log(decoded);
            let token = "bearer " + items;
        
            const res = await axios.post(
              `http://143.198.124.185/api/master/deletePilot`,
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
                fetchpilots();
            } else {
              alert(result.msg);
            }
          };
    
          
      // Edit Pilot
    
      const editpilotdata = async () => {
        const items = localStorage.getItem("token");
        console.log(items);
        var decoded = jwt_decode(items);
        console.log(decoded);
        let token = "bearer " + items;
    
        const result = await axios.post(
          "http://143.198.124.185/api/master/insertEditPilot",
          {
            uid: decoded.id,
            id: id,
            name: name,
            mobile: mobile,
            alt_mobile: altmobile,
            email:email,
            address:address,
            licence_no:licenceno,
            licence_doc:licencedoc,
            gov_doc:govdoc,
          },
          {
            headers: {
              "content-type": "application/json",
              Authorization: token,
            },
          }
        );
    
        if (result) {
            fetchpilots();
          alert(result.data.msg);
    
           if(id===null){
            fetchpilots();
            alert(result.data.msg)
          }
        }
      };
    
      useEffect(() => {
        fetchpilots();
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
                  onClick={addpilot}
                >
                  <i class="fa fa-user-plus pe-2"></i> Add Pilot details
                </button>
              </div>
              <DataTable
                title={
                  <div>
                    <center>
                      <h2 className="mt-4">Pilot Details</h2>
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
      {editpilotPopup()}

      <Footer />
    
    </>
  )
}

export default Pilot