import React, { useEffect } from "react";
import "./styles/maincontent.css";
import { useNavigate } from "react-router-dom";

const MainContent = () => {
  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/signin");
    }
  }, []);

  return (
    <>
      <div className="container-fluid">
        <div className="row">
          <div className="dashboard"> 
            <h2>Welcome To Dashboard</h2>
            </div>
        </div>
      </div>
    </>
  );
};

export default MainContent;
