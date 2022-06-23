import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Footer from './Footer'
import NavBar from './NavBar'

const Admintable = () => {

    const [admindata,setAdmindata] = useState({
        id:"",
        name:"",
        email:"",
        mobile:"",
        isblock:""
    })

useEffect(()=>{
    axios.post("http://143.198.124.185/api/getAdminList",{ headers:{"content-type":"application/json"}})
    .then((result)=>{
     alert(JSON.stringify(result))
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
    }).catch(error=>{
        console.log(error)
    })
},[])


  return (
    <>
    <NavBar/>
      <div className="form_detail div">
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
                                <th scope="col">Password</th>
                                <th scope="col" >Action</th>
                            </tr>
                        </thead>
                        <tbody>
                   
                                     <tr>
                                        <td>1</td>
                                        <td>Rohan</td>
                                        <td>rohanvaja01@gmail.com</td>
                                        <td>9879266238</td>
                                        <td>123</td>
                                        <td className='edit_delete_btn'>
                                            <button>Edit</button>  <button >Delete</button>  <button >Block</button>

                                        </td>
                                    </tr>
                  
                                  
                     

                        </tbody>
                    </table>
                </div>
                <Footer/> 
    </>
  )
}

export default Admintable