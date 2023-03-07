import axios from "axios";

const authClient = axios.create({
    baseURL: "/api",
    timeout: 3000,
});

authClient.interceptors.request.use(config => {
    config.headers['Content-Type'] = 'application/json'
    config.headers.setAuthorization('Bearer ' + localStorage.getItem("token"))
    return config;
}, error => {
    console.log(error)
    return Promise.reject(error);
});


authClient.interceptors.response.use(function (response) {
    console.log(response);
    return response;
}, function (error) {
    if (401 === error.response.status) {
        localStorage.removeItem("token")
    }
    return Promise.reject(error);
});


const noAuthClient = axios.create({
    baseURL: "/api",
    timeout: 3000,
});


export {authClient, noAuthClient}