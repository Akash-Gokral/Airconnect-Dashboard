import React from 'react'
import Footer from './Footer'
import NavBar from './NavBar'

const Airporttable = () => {
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
                                <th scope="col">Plane no</th>
                                <th scope="col">Capacity</th>
                                <th scope="col">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                       
                                    <tr>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
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

export default Airporttable