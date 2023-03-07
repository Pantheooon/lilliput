import {makeAutoObservable} from "mobx";

export default class UserStore{


    user = {}


    constructor() {
       makeAutoObservable(this)
    }

    setUser(user){
        this.user = user
    }

    getUser(){
        return this.user
    }
}



