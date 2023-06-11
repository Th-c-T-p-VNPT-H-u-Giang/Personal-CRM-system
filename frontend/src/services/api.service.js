import axios from "axios";

const commonConfig = {
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
    // "Content-Type": "multipart/form-data",
  },
};
export default (baseURL) => {
  return axios.create({
    baseURL,
    ...commonConfig,
  });
};
