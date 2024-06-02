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

const userServer = {
    upload,
    getApi
}

export default userServer;