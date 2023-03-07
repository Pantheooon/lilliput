import {makeAutoObservable} from "mobx";


export class CartStore {

    products = {}

    constructor() {
        const carts = localStorage.getItem("cart")
        if (carts != null) {
            this.products = JSON.parse(carts)
        }
        makeAutoObservable(this)
    }


    getCartNum() {
        const len = Object.keys(this.products).length
        return len === 0 ? "" : len
    }


    addCart(data) {
        let product = this.products[data.id]
        if (product == null) {
            product = {
                ...data,
                num: 1
            }
        } else {
            product = {
                ...product,
                num: product.num + (data.num ? data.num : 1)
            }
        }
        this.products[data.id] = product
        localStorage.setItem("cart", JSON.stringify(this.products))
    }

    minusCart = function (productId) {


        delete this.products[productId]
        localStorage.setItem("cart", JSON.stringify(this.products))

    }

    totalPrice() {
        return Object.values(this.products).reduce((pre, cur, idx) => {
            return pre + cur.num * cur.price
        }, 0)

    }


}


