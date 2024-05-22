import http from "../http-common";

const upload = (file, onUploadProgress) => {
  let formData = new FormData();
  formData.append("file", file);
  return http.post("/upload", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
    onUploadProgress,
  });
};

const getApi = () => {
  return http.get("/api");
}

const getMusic = () => {
  return http.get("/api/music");
}

const server = {
  upload,
  getApi,
  getMusic
}

export default server;