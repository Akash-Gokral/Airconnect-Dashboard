import React from 'react'
import Footer from './Footer'
import NavBar from './NavBar'

const Admintable = () => {
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