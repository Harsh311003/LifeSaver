import { API } from "../config/backend";
const authProvider = {
  login: ({ username, password }) => {
    return fetch(`${API}/auth/admin/login`, {
      method: "post",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) throw new Error(data.error);
        else {
          localStorage.setItem("token", data.token);
        }
      });
  },
  checkAuth: () => {
    return localStorage.getItem("token")
      ? fetch(`${API}/auth/admin/isAdmin`, {
          method: "post",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.error) throw new Error(data.error);
          })
      : Promise.reject();
  },
  logout: () => {
    localStorage.removeItem("token");
    return Promise.resolve();
  },
  checkError: (error) => {
    const status = error.status;
    if (status === 422 || status === 401 || status === 403) {
      localStorage.removeItem("token");
      return Promise.reject();
    }
    return Promise.resolve();
  },
  getPermissions: () => Promise.resolve(),
};

export default authProvider;
