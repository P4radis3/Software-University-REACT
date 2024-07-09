import * as request from "../lib/request";
const baseURL = "http://localhost:3030/data/books";

export const getBooks = async () => {
    const result = await request.get(baseURL);
    return result;
}

export const getBooksForUser = async (_ownerId) => {
    const query = new URLSearchParams({ where: `_ownerId="${_ownerId}"` });
    const result = await request.get(`${baseURL}?${query}`)
    return result;
}

export const getOneBook = async (booksId) => {
    const result = await request.get(`${baseURL}/${booksId}`);
    return result;
}

export const createBook = async (data) => {
    const result = await request.post(`${baseURL}`, data);
    return result;
}

export const editBook = async (booksId, data) => {
    const result = await request.put(`${baseURL}/${booksId}`, data);
    return result;
}

export const deleteBook = async (booksId) => { await request.del(`${baseURL}/${booksId}`); }