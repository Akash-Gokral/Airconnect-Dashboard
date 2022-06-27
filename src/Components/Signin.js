import React, { useState } from 'react'
import {Link,useNavigate} from 'react-router-dom'
import airconnect from "../Assets/Airconnect Logo 1.png"
import "../Components/styles/signin.css"
import axios from 'axios'

const Signin = () => {

const [mobile,setMobile] = useState("")
const [password,setPassword] = useState("")

const navigate = useNavigate();

	const submit=(e)=>{
		e.preventDefault();
         console.warn(mobile,password);
		
	     axios.post("http://143.198.124.185/api/login",{
			username:mobile,
			password:password,
		}
		).then(result=>{
			console.log(result.data)
			if(result.data.st == false){
				alert(result.data.msg)
			}else{
				localStorage.setItem("token",result.data.token )
				navigate("/home")
				alert(result.data.msg)
			}
		
		}).catch(error=>{
			console.log(error)	
			
		}) 
	}





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
							<h4 className="text-center">Signin to Your Account</h4>
							<form>	
								<div className="form-group text-start">
									<label>Mobile no</label>
									<input className="form-control" value={mobile} placeholder="Enter your mobile no" type="number" onChange={(e)=>{setMobile(e.target.value)}}/>
								</div>
								<div className="form-group text-start">
									<label>Password</label>
									<input className="form-control" value={password} placeholder="Enter your password" type="password"
									 onChange={(e)=>{setPassword(e.target.value)}}/>
								</div>
							<div className='signin_div'><button className="btn signin_btn" onClick={submit}>Sign In</button>	</div>
							</form>
							<div className="mt-3 text-center">
								<p className="mb-1"><Link to="/signin/password">Forgot password?</Link></p>
							</div>
						</div>
					</div>
				</div>
			</div>
		

		</div>
    
    </>
  )
}

export default Signin;