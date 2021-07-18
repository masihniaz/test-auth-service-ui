import decodeJwt from "jwt-decode";

const setAccessToken = (accessToken) => {
  const decodedJwt = decodeJwt(accessToken);
  localStorage.setItem("user", JSON.stringify(decodedJwt));
  localStorage.setItem("accessToken", accessToken);
};

const getAccessToken = () => {
  const accessToken = localStorage.getItem("accessToken");
  if (accessToken) return accessToken;
  return null;
};

const getUser = () => {
  const user = localStorage.getItem("user");
  if (user) return JSON.parse(user);
  return null;
};

const removeAccessToken = () => localStorage.removeItem("accessToken");

const removeUser = () => localStorage.removeItem("user");

const methods = {
  setAccessToken,
  getAccessToken,
  getUser,
  removeAccessToken,
  removeUser,
};

export default methods;
