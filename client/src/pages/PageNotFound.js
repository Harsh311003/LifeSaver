import React from "react";
import { Link } from "react-router-dom";
import notFoundImg from "../img/pagenotfound.jpg";

const PageNotFound = () => {
  return (
    <div>
      <div className="row text-center">
        <img src={notFoundImg} alt="" className="img-fluid col-sm-7 mx-auto" />
      </div>
      <p className="text-center">
        looks like someone gave you the wrong link.go to{" "}
        <Link to="/">home</Link>
      </p>
    </div>
  );
};

export default PageNotFound;
