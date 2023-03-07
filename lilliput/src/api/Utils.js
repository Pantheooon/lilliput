import {Modal} from "antd";
import React from "react";

function getUser() {
    return localStorage.getItem("user")
}

function setUser(user) {
    localStorage.setItem("user", user)
}

function getCart() {
    let cartsStr =  localStorage.getItem("carts")
    if (cartsStr == null) return []
    let carts = JSON.parse(cartsStr)
    return Object.values(carts)
}

function addCart(data) {
    let carts = localStorage.getItem("carts")
    if (carts == null) carts = {}
    else carts = JSON.parse(carts)
    let item = carts[data.id]
    if (item == null) item = {num: 1, product: data}
    else item = {...item, num: item.num + 1}
    carts[data.id] = item
    localStorage.setItem("carts", JSON.stringify(carts))
}

export {getUser, setUser,getCart,addCart}