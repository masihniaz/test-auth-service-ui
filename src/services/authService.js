import http from "./httpService";
import helper from "../utils/helper";

const login = async (id, password) => {
  return http.post("/api/login", {
    username: id,
    password,
  });
};

const signup = async (user) => {
  return http.post("/api/signup", user);
};

const logout = () => {
  helper.removeAccessToken();
  helper.removeUser();
};

const getAllPermissions = (permissionIds) => {
  return http.get("/api/permissions");
};

const checkPermissions = (userId, permissionIds) => {
  return http.post(`/api/users/${userId}/permissions`, {
    permissionIds,
  });
};

http.setAccessToken(helper.getAccessToken());

const methods = {
  login,
  signup,
  logout,
  getAllPermissions,
  checkPermissions,
};

export default methods;
