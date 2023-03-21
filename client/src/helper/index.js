//set auth token in local storage
export const setAuthTokenInLocalStorage = (token, cb) => {
  if (typeof window !== undefined) {
    window.localStorage.setItem("jwt", token);
    cb();
  }
};

//check auth token in local storage
export const hasAuthTokenInLocalStorage = () => {
  if (typeof window !== undefined) {
    if (window.localStorage.getItem("jwt")) return localStorage.getItem("jwt");
    else return false;
  }
  return false;
};
