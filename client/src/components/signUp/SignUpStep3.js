import React from "react";

const SignUpStep3 = ({
  activeStep,
  setActiveStep,
  userDetails,
  handleChange,
  finalSubmit,
  loading,
  err,
  setErr,
}) => {
  //all the steps complete create user
  const handleSubmit3 = (e) => {
    e.preventDefault();
    //submit function on main signup.js page
    //this will register user
    finalSubmit();
  };
  const { phone, city, street, pincode, state } = userDetails;
  return (
    <>
      <h1 className="mb-4 text-white text-capitalize display-5 fw-bold h1">
        your
        <br /> contact details
      </h1>
      {/* error if any after submitting form */}
      {err && (
        <div class="alert alert-danger form-control" role="alert">
          {err}
        </div>
      )}

      <form className="col-10 text-white" onSubmit={handleSubmit3}>
        {/* phone no */}
        <div className="form-group">
          <label for="phone">phone no</label>
          <input
            type="tel"
            className="form-control"
            value={phone}
            onChange={handleChange("phone")}
            id="phone"
            aria-describedby="phonehelp"
            placeholder="Enter mobilie no"
            required
            minLength="10"
            maxLength="10"
            autoComplete="true"
          />
          <small id="phonehelp" className="form-text text-muted">
            do not add +91 or 0 in front.
          </small>
        </div>
        {/* addresss */}
        <div className="form-group my-3">
          <label for="address">Address:</label>
          {/* street */}
          <input
            type="text"
            className="form-control"
            id="address"
            value={street}
            onChange={handleChange("street")}
            placeholder="street"
            required
            autoComplete="true"
          />
          {/* city */}
          <div className="form-row">
            <div className="col">
              <input
                type="text"
                className="form-control"
                value={city}
                onChange={handleChange("city")}
                placeholder="city"
                required
                autoComplete="true"
              />
            </div>
            {/* pincode */}
            <div className="col">
              <input
                type="tel"
                value={pincode}
                pattern="^[0-9]{6}$"
                minLength="6"
                maxLength="6"
                onChange={handleChange("pincode")}
                className="form-control"
                placeholder="pincode"
                required
                autoComplete="true"
              />
            </div>
          </div>
          {/* state */}
          <input
            type="text"
            value={state}
            onChange={handleChange("state")}
            className="form-control"
            id="address"
            placeholder="state"
            required
            autoComplete="true"
          />
        </div>
        {/* go to previous step */}
        <button
          type="button"
          className="btn btn-secondary w-100 mt-3"
          onClick={() => {
            //on going to previous step remove the error showed
            //ex:email already exist then user go to previous step so do not
            //display this error now
            setErr(false);
            setActiveStep(activeStep - 1);
          }}
        >
          previous
        </button>

        {/* submit signup form */}
        <button type="submit" className="btn btn-success w-100 mt-3">
          {loading ? "creating..." : "create"}
        </button>
      </form>
    </>
  );
};

export default SignUpStep3;
