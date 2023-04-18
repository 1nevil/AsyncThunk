import axios from "axios";
// A  making an async request for data

// const Axios = axios.create({
//   baseURL: "http://localhost:3000/",
// });

export function fetchItems() {
  return axios.get("http://localhost:8080/cart");
}

export function addItem(item) {
  console.log(item);
  return axios.post("http://localhost:8080/cart", item);
}

export function updateItem(id, itemUpdate) {
  return axios.patch(`http://localhost:8080/cart/${id}`, itemUpdate);
}

export function deleteItem(id) {
  return axios.delete(`http://localhost:8080/cart/${id}`);
}
