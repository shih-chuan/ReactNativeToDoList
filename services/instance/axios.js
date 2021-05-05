import axios from 'axios';

const instance = axios.create({
    baseURL: "http://10.0.5.9:8080/",
    headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
    }
})

export default instance;