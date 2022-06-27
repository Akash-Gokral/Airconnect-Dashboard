import React from "react";
import {useNavigate } from "react-router-dom";


const NavBar = () => {
  const navigate = useNavigate();

  const signout = () => {
    localStorage.removeItem("token");
    navigate("/signin");
  };

  return (
    <>
      <div className="main-header side-header sticky">
        <div className="container-fluid main-container">
          <div className="main-header-left sidemenu ">
            <a className="main-header-menu-icon" href="" id="mainSidebarToggle">
              <span></span>
            </a>
          </div>

          <div className="main-header-right">
            <button onClick={signout} className="signoutbtn ">
              Signout<i className="icon icon-share-alt ps-2"></i>
            </button>
            <button
              className="navbar-toggler navresponsive-toggler d-lg-none ms-auto collapsed"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarSupportedContent-4"
              aria-controls="navbarSupportedContent-4"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              {" "}
              <span className="navbar-toggler-icon fe fe-more-vertical "></span>
            </button>
            <div className="navbar navbar-expand-lg navbar-collapse responsive-navbar p-0">
              <div
                className="collapse navbar-collapse"
                id="navbarSupportedContent-4"
              >
                <ul className="nav nav-item header-icons navbar-nav-right ms-auto">
                  <div className="dropdown  d-flex">
                    <a className="nav-link icon theme-layout nav-link-bg layout-setting">
                      <span className="dark-layout">
                        <i className="fe fe-moon"></i>
                      </span>
                      <span className="light-layout">
                        <i className="fe fe-sun"></i>
                      </span>
                    </a>
                  </div>

                  <li className="dropdown header-search">
                    <a className="nav-link icon header-search">
                      <i className="fe fe-search"></i>
                    </a>
                    <div className="dropdown-menu">
                      <div className="main-form-search p-2">
                        <input
                          className="form-control"
                          placeholder="Search"
                          type="search"
                        />
                        <button className="btn">
                          <i className="fe fe-search"></i>
                        </button>
                      </div>
                    </div>
                  </li>
                  <li className="dropdown">
                    <a className="nav-link icon full-screen-link">
                      <i className="fe fe-maximize fullscreen-button"></i>
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>


    </>
  );
};

export default NavBar;
