import React from 'react'
import { Link } from 'react-router-dom'
import airconnect from "../Assets/Airconnect Logo 1.png";

function Sidebar() {
  return (
    <>
          <div className="main-sidebar main-sidemenu main-sidebar-sticky side-menu">
        <Link to="/home">
          <img src={airconnect} />
        </Link>
        <div className="main-sidebar-body">
          <ul className="nav  hor-menu">
            <li className="nav-label">Admins</li>
            <li className="nav-item">
              <Link to="/home">
                <a className="nav-link">
                  <i className="fe fe-airplay"></i>
                  <span className="sidemenu-label">Dashboard</span>
                </a>
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/admintable">
                <a className="nav-link">
                  <i class="icon icon-people"></i>
                  <span className="sidemenu-label">Users</span>
                </a>
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/Officetable">
                <a className="nav-link">
                <i className="fe fe-box"></i>
                  <span className="sidemenu-label">Offices</span>
                </a>
              </Link>
            </li>

            <li className="nav-label">Masters</li>
            <li className="nav-item">
              <Link to="/airporttable">
                <a className="nav-link with-sub" href="">
                  <i className="fe fe-box"></i>
                  <span className="sidemenu-label">Airport</span>
                </a>
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/airplanetable">
                <a className="nav-link with-sub" href="">
                  <i class="icon icon-plane"></i>
                  <span className="sidemenu-label">Airplane</span>
                </a>
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/passenger">
                <a className="nav-link with-sub" href="">
                <i class="icon icon-people"></i>
                  <span className="sidemenu-label">Passengers</span>
                </a>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    
    
    </>
  )
}

export default Sidebar