import { API } from "../../config/backend";
export const login = (userCred) => {
  return fetch(`${API}/auth/login`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    //sending user credentials in body
    body: JSON.stringify(userCred),
  })
    .then((res) => res.json())
    .catch((err) => console.log(err));
};
