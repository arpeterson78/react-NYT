import axios from "axios";

export default function getArticles(url) {
    return axios.get(url);
}