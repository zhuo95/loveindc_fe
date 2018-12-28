import axios from 'axios';

axios.defaults.headers = {
    "Content-Type": "application/x-www-form-urlencoded"
};

export default axios.create({
    baseURL:"http://localhost:9093",
    timeout: 5000,
    withCredentials: true
});