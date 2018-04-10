import axios from "axios";

export default function getSaved() {
    return axios.get("/articles");
}


export function saveArticle(article) {
    return fetch("/save-article", {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(article)
    })
}

export function deleteArticle(id) {
    return fetch(`/delete-article/${id}`, {
        method: 'DELETE',
        headers: {
            'Accept': 'application.json',
            'Content-Type': 'application/json'
        }
    })
}