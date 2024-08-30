import axios from "axios";
const baseURL = "http://localhost:3000/api/v1";

const API = Object.create(null);

API.fetchData = async (query) => {
  const url = `${baseURL}/${query}`;
  const response = await axios.get(url);
  return response;
};

API.postData = async (collection, body) => {
  const url = `${baseURL}/${collection}`;
  const request = await axios.post(url, body);
  return request;
};

API.updateData = async(collection, id, body) => {
  const url = `${baseURL}/${collection}/${id}`;
  const request = await axios.put(url, body);
  return request;
}

API.deleteData = async(collection, id) => {
  const url = `${baseURL}/${collection}/${id}`;
  const request = await axios.delete(url);
  return request;
}

export default API;
