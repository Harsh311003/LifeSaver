import React from "react";

const SignUpStep2 = ({
  activeStep,
  setActiveStep,
  userDetails,
  handleChange,
}) => {
  //after completeing step 2 move to step3
  const handleSubmit2 = (e) => {
    e.preventDefault();
    setActiveStep(activeStep + 1);
  };

  const { adhaar, dob } = userDetails;
  return (
    <>
      <h1 className="mb-4 text-white text-capitalize display-5 fw-bold h1">
        just few
        <br /> more details
      </h1>
      <form className="col-10 text-white" onSubmit={handleSubmit2}>
        {/* aadhar number */}
        <div className="form-group">
          <label for="adhaar">aadhar card number</label>
          <input
            type="tel"
            // regex:only number allowed length=12
            pattern="^[0-9]{12}$"
            className="form-control"
            value={adhaar}
            onChange={handleChange("adhaar")}
            id="adhaar"
            aria-describedby="adhaarhelp"
            placeholder="Enter adhaar no"
            required
            autoComplete="true"
            minLength="12"
            maxLength="12"
          />
          <small id="adhaarhelp" className="form-text text-muted">
            We'll never share your details with anyone else.
          </small>
        </div>
        {/* dob */}
        <div className="form-group my-3">
          <label for="dob">Date of Birth</label>
          <input
            type="date"
            className="form-control"
            value={dob}
            onChange={handleChange("dob")}
            id="dob"
            placeholder="enter date of birth"
            required
            autoComplete="true"
          />
        </div>

        {/* go to previous step */}
        <button
          className="btn btn-secondary w-100 mt-3"
          onClick={() => setActiveStep(activeStep - 1)}
        >
          previous
        </button>
        {/* go to next step */}
        <button type="submit" className="btn btn-primary w-100 mt-3">
          Next
        </button>
      </form>
    </>
  );
};

export default SignUpStep2;
