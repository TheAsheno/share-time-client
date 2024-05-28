import axios from "axios";

const httpLocal = axios.create({
  baseURL: "http://localhost:3001",
  headers: {
    "Content-type": "application/json"
  }
});

const httpRemote = axios.create({
  baseURL: "http://118.126.95.144:3001",
  headers: {
    "Content-type": "application/json"
  }
});

export { httpLocal, httpRemote };