// axiosInstance.js
import axios from 'axios';

// const BACKEND_URL="http://localhost:5000";
const BACKEND_URL="https://expense-backend-07ul.onrender.com";

// Create an Axios instance
const axiosInstance = axios.create({
  baseURL: BACKEND_URL, // Replace with your backend URL
  withCredentials: true, // Allows sending cookies with requests
  headers: {
    'Content-Type': 'application/json',
  },
});

export default axiosInstance;