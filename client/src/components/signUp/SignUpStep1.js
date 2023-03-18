import React from "react";

const SignUpStep1 = ({
  activeStep,
  setActiveStep,
  userDetails,
  handleChange,
}) => {
  //on submit of step1 move to step2
  const handleSubmit1 = (e) => {
    e.preventDefault();
    setActiveStep(activeStep + 1);
  };

  const { name, email, password } = userDetails;

  return (
    <>
      <h1 className="mb-4 text-white text-capitalize display-5 fw-bold h1">
        no worries,
        <br /> we got you covered
      </h1>
      <form className="col-10 text-white" onSubmit={handleSubmit1}>
        {/* full name */}
        <div className="form-group mb-3">
          <label for="name">Full name</label>
          <input
            type="text"
            className="form-control"
            id="name"
            value={name}
            placeholder="Enter full name"
            onChange={handleChange("name")}
            required
            autoComplete="true"
          />
          {/* email */}
        </div>
        <div className="form-group">
          <label for="exampleInputEmail1">Email address</label>
          <input
            type="email"
            className="form-control"
            id="exampleInputEmail1"
            value={email}
            onChange={handleChange("email")}
            aria-describedby="emailHelp"
            placeholder="Enter email"
            required
            autoComplete="true"
          />
          <small id="emailHelp" className="form-text text-muted">
            We'll never share your email with anyone else.
          </small>
        </div>
        {/* password */}
        <div className="form-group my-3">
          <label for="exampleInputPassword1">Password</label>
          <input
            type="password"
            // regex: minlen:8 ,must(lower),must(upper),must(num),must(special)
            pattern="^(?=.{8,})(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[@#!]).*$"
            className="form-control"
            value={password}
            onChange={handleChange("password")}
            id="exampleInputPassword1"
            placeholder="Password"
            required
            autoComplete="true"
          />
          <small id="emailHelp" className="form-text text-muted">
            contain atleast 1 uppercase,1 number,1 special character[@,#,!] and
            min length 8
          </small>
        </div>
        {/* go to next step */}
        <button type="submit" className="btn btn-primary w-100 mt-3">
          Next
        </button>
      </form>
    </>
  );
};

export default SignUpStep1;
