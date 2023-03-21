import React, { useState } from "react";
import bgImg from "../img/img1.jpg";
import Overlay from "../components/general/Overlay";
import Base from "./Base";
import { Link, Redirect } from "react-router-dom";

const DocHome = () => {
  const [pid, setPid] = useState(null);
  const [err, setErr] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO:
    setSuccess(true);
    //api to set this patient into doc's history
    //and redirect to doc dashboard page
    //if show error for if patent does not exist
    //
  };

  return (
    <Base title="DocHome">
      <div
        style={{ position: "relative", background: "#333", height: "100vh" }}
      >
        <div
          className="row justify-content-center align-items-center bg-info"
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            top: "0",
            backgroundImage: `url(${bgImg})`,
            backgroundSize: "cover",
            backgroundPosition: "center bottom",
          }}
        >
          {/* if success redirect to dashboard */}
          {success && <Redirect to="/doc/dashboard" />}

          {/* overlay */}
          <Overlay color="#333" opacity="0.4" />

          {/* inside content */}
          <div className="col-sm-8 text-white" style={{ zIndex: "2" }}>
            <h1 className="display-2">We beleive in you!</h1>

            {/* if patient not found or any other error occurs */}
            {err && (
              <div class="alert alert-danger form-control" role="alert">
                {err}
              </div>
            )}

            {/*search by patient id form  */}
            <form
              class="d-flex flex-column flex-md-row"
              onSubmit={handleSubmit}
            >
              <input
                className="form-control me-2 text-capitalize"
                type="search"
                pattern="^[0-9]{12}$"
                placeholder="enter patient's 12 digit aadhar id"
                aria-label="Search"
                value={pid}
                minLength="12"
                maxLength="12"
                onChange={(e) => setPid(e.target.value)}
                style={{ height: "60px" }}
                required
              />
              {/* submit btn */}
              <button className="btn btn-success" type="submit">
                view
              </button>
            </form>
            <Link to="/doc/dashboard" className="btn btn-dark mt-4 offset-4">
              go to dashboard
            </Link>
          </div>
        </div>
      </div>
    </Base>
  );
};

export default DocHome;
