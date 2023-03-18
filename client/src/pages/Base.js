import React from "react";
import { Link } from "react-router-dom";

const Base = ({ title = "HealthyU", children }) => {
  document.title = title;
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
          {/* <ul className="navbar-nav"> */}
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link active" to="/">
                HealtyU
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/login">
                Login
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/signup">
                SignUp
              </Link>
            </li>
          </ul>
        </div>
      </nav>
      {children}
    </div>
  );
};

export default Base;
