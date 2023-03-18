import React from "react";

export const LoginForm = ({
  userDetails,
  setUserDetails,
  handleSubmit,
  loading,
}) => {
  const { adhaar, password } = userDetails;
  return (
    <form className="col-10 text-white" onSubmit={handleSubmit}>
      <div className="form-group">
        <label for="adhaar">aadhar card number</label>
        <input
          type="tel"
          className="form-control"
          value={adhaar}
          pattern="^[0-9]{12}$"
          onChange={(e) =>
            setUserDetails({ ...userDetails, adhaar: e.target.value })
          }
          id="adhaar"
          aria-describedby="adhaarhelp"
          placeholder="Enter 12 digit adhaar no"
          required
          autoComplete="true"
          minLength="12"
          maxLength="12"
        />
        <small id="adhaarhelp" className="form-text text-muted">
          We'll never share your details with anyone else.
        </small>
      </div>
      <div className="form-group my-3">
        <label for="exampleInputPassword1">Password</label>
        <input
          type="password"
          className="form-control"
          value={password}
          id="exampleInputPassword1"
          placeholder="Password"
          onChange={(e) =>
            setUserDetails({ ...userDetails, password: e.target.value })
          }
        />
      </div>
      {/*TODO:create session storage for this
       <div className="form-group form-check">
        <input
          type="checkbox"
          className="form-check-input"
          id="exampleCheck1"
        />
        <label className="form-check-label" for="exampleCheck1">
          remember me
        </label>
      </div> */}
      <button type="submit" className="btn btn-primary w-100">
        {loading ? "logging you in...." : "login"}
      </button>
    </form>
  );
};
