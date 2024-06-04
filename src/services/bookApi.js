import http from "../http-common";

const getBookList = () => {
    return http.get("/book/booklist");
}

const bookServer = {
    getBookList
}

export default bookServer;