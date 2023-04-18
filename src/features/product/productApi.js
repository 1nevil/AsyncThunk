import axios from "axios";
// A  making an async request for data

// const Axios = axios.create({
//   baseURL: "http://localhost:3000/",
// });

export function reqProducts() {
  return axios.get("https://dummyjson.com/products");
}
