import axios from "axios";
import { logService as logger } from "../services";

axios.interceptors.response.use(null, (error) => {
  const expectedError =
    error.response &&
    error.response.status >= 400 &&
    error.response.status < 500;

  if (!expectedError) {
    console.log("Logging the error", error);
    logger.log(error);
    alert("An unexpected error occured.");
  }

  return Promise.reject(error);
});

const setAccessToken = (accessToken) => {
  axios.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;
};

const methods = {
  get: axios.get,
  post: axios.post,
  put: axios.put,
  patch: axios.patch,
  delete: axios.delete,
  setAccessToken,
};

export default methods;
