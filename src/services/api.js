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
  return http.get("/api/musiclist");
}

const getLyrics = (song) => {
  return http.get(`/music/lyrics/${song}.lrc`);
}

const server = {
  upload,
  getApi,
  getMusic,
  getLyrics
}

export default server;