import React from "react";
import { Link } from "react-router";

function SideleftBar() {
  return (
    <div className="vertical-menu">
      <div data-simplebar className="h-100 ">
        {/* <!--- Sidemenu --> */}
        <div id="sidebar-menu">
          {/* <!-- Left Menu Start --> */}
          <ul className="metismenu list-unstyled" id="side-menu">
            <li>
              <Link to="/dashboard" className="waves-effect">
                <i className="mdi mdi-file-document-box-outline"></i>
                <span>Dashboard</span>
              </Link>
            </li>
            <li>
              <Link to="/vendors" className="waves-effect">
                <i className="mdi mdi-receipt"></i>
                <span>Vendors</span>
              </Link>
            </li>
            <li>
              <Link to="/rfp" className="waves-effect">
                <i className="mdi mdi-flip-vertical"></i>
                <span>RFP Lists</span>
              </Link>
            </li>
            <li>
              <Link to="#" className="waves-effect">
                <i className="mdi mdi-apps"></i>
                <span>User Management</span>
              </Link>
            </li>

            <li>
              <Link to="#" className="waves-effect">
                <i className="mdi mdi-weather-night"></i>
                <span>Categories</span>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default SideleftBar;
