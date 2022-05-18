import axios from "axios";

const axiosInstance = () => {
  const defaultOptions = {
    baseURL: "https://api.geoapify.com/v1",
    headers: {
      "Content-Type": "application/json",
    },
  };

  let instance = axios.create(defaultOptions);

  return instance;
};

export default axiosInstance();
