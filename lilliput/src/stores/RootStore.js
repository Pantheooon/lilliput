import {CartStore} from "./CartStore";
import {createContext} from "react";
import NavStore from "./NavStore";
import UserStore from "./UserStore";

class RootStore{


    cartStore;

    navStore;

    userStore;

    constructor() {
        this.cartStore = new CartStore()
        this.navStore = new NavStore()
        this.userStore = new UserStore()
    }
}

const rootStore = new RootStore();
const storeContext = createContext(null)



export  {
    rootStore,storeContext
}