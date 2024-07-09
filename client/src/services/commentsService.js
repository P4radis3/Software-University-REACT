import * as request from "../lib/request";
const baseUrl = "http://localhost:3030/data/comments";

export const getComments = async (bookId) => {
    const query = new URLSearchParams({ where: `bookId="${bookId}"` });

    try {
        const result = await request.get(`${baseUrl}?${query}`);
        return result;
    } catch (error) {
        console.log(error.message);
        throw error;
    };
};

export const addComment = async (bookId, content, username) => {
    const result = await request.post(baseUrl, { bookId, content, username });
    return result;
}