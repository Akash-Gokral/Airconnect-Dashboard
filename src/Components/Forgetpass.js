import React from 'react'
import {Link } from 'react-router-dom'
import airconnect from "../Assets/Airconnect Logo 1.png"
import "../Components/styles/signin.css"

const Forgetpass = () => {
  return (
    <>
    
		<div className="page main-signin-wrapper">

<div className="row text-center ps-0 pe-0 ms-0 me-0">
    <div className=" col-xl-3 col-lg-5 col-md-5 d-block mx-auto">
        <div className="text-center mb-2">
        <Link to="/">	
                <img src={airconnect} className="header-brand-img" alt="logo"/>
                <img src={airconnect} className="header-brand-img theme-logos" alt="logo"/>
    </Link>
        </div>
        <div className="card custom-card">
            <div className="card-body pd-45">
                <h4 className="text-center">Reset Your Password</h4>

                <form>	
                    <div className="form-group text-start">
                        <label>Email</label>
                        <input className="form-control" placeholder="Enter your email" type="text"/>
                    </div>
                    <h6 className='text-center'>OR</h6><hr/>
                    <div className="form-group text-start">
                        <label>Mobile No</label>
                        <input className="form-control" placeholder="Enter your mobile no" type="text"/>
                    </div>
                    <div className="form-group text-start">
                        <label>OTP</label>
                        <input className="form-control" placeholder="Enter your OTP" type="password"/>
                    </div>
                    <Link to="/"><a className="btn ripple sign-in-btn btn-block">Submit</a></Link>
                </form>
                <div className="mt-3 text-center">
								<p className="mb-1">	<Link to="/signin">	Signin to Your account     </Link></p>
							</div>
            </div>
        </div>
    </div>
</div>


</div>
    
    </>
  )
}

export default Forgetpass