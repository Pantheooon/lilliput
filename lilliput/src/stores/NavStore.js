import {makeAutoObservable} from "mobx";

export default class NavStore {


    login = false

    cart = false

    order = false

    signUp = false

    constructor() {
        makeAutoObservable(this)
    }


    openLogin() {
        this.login = true
    }

    closeLogin() {
        this.login = false
    }

    openCart() {
        this.cart = true
    }

    closeCart() {
        this.cart = false
    }

    openOrder() {
        this.order = true
    }

    closeOrder() {
        this.order = false
    }

    openSignUp() {
       this.signUp = true
    }
    closeSignUp(){
        this.signUp = false
    }
}
