import React from "react";
import {authClient, noAuthClient} from "./AxiosConfig";


async function login(userName, password) {
   return  noAuthClient.post("/user/login", {
        username: userName,
        password: password
    })
}

async function signUp(userName, password) {
    return await noAuthClient.post("/user/signup", {
        username: userName,
        password: password
    })
}


async function profileMe(userStore) {
    const token = localStorage.getItem("token")
    if (token === null) {
        return
    }
    authClient.get("/user/profile/me").then(r => {
        if (r === undefined || r.data === undefined || r.data === null) return
        userStore.setUser(r.data)
    })
}



export {login, signUp, profileMe}