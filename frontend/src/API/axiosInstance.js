import axios from "axios";

const axiosInstance = axios.create(
    {
    baseURL: 'http://127.0.0.1:8000/', // Replace with your Django backend URL
    withCredentials: true,
    headers: {
      'Content-Type': 'application/json',
      // You can add other default headers here, such as Authorization for JWT
    }
  });
  
  
  export default axiosInstance;