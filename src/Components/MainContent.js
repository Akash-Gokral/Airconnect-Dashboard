import React, { useEffect } from 'react'
import "./styles/maincontent.css"
import { useNavigate } from 'react-router-dom'

const MainContent = () => {

    const navigate=useNavigate();


useEffect(()=>{
    if(!localStorage.getItem("token")){
        navigate("/signin")
    }

},[])



  return (
    <>


             <div className="div">
             <h2 className=""> Welcome To Dashboard</h2>
             </div>
          
          {/* <div className="form_detail div">
                    <div className="search_div w-100">
                        <div className="d-flex inputs p-2 ">   <p >Search:</p> <input type="text" className="ms-2" ></input></div>
                    </div>
                    <table className="table table-bordered mt-2" id="employeetable">
                        <thead>
                            <tr>
                                <th scope="col">Id</th>
                                <th scope="col">Name</th>
                                <th scope="col">Email</th>
                                <th scope="col">Mobile</th>
                                <th scope="col" >Action</th>
                            </tr>
                        </thead>
                        <tbody>
                       
                                    <tr>
                                        <td>1</td>
                                        <td>Rohan</td>
                                        <td>rohanvaja01@gmail.com</td>
                                        <td>9879266238</td>
                                        <td className='edit_delete_btn'>
                                            <button>Edit</button>  <button >Delete</button>  <button >Block</button>

                                        </td>
                                    </tr>
                     

                        </tbody>
                    </table>
                </div> */}


    </>
  )
}

export default MainContent