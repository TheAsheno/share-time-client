import http from "../http-common";

const sendMessage = (data) => {
    return http.post("/board/message", data, {
        headers: {
            "Content-Type": "application/json"
        },
    });
};

const boardServer = {
    sendMessage,
}

export default boardServer;