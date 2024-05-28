import { httpLocal } from "../http-common";

const upload = (file, onUploadProgress) => {
  let formData = new FormData();
  formData.append("file", file);
  return httpLocal.post("/upload", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
    onUploadProgress,
  });
};

const getApi = () => {
  return httpLocal.get("/api");
}

const getMusic = () => {
  return httpLocal.get("/api/musiclist");
}

const getLyrics = (song) => {
  return httpLocal.get(`/music/lyrics/${song}.lrc`);
}

const server = {
  upload,
  getApi,
  getMusic,
  getLyrics
}

export default server;