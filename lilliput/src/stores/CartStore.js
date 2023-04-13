import {makeAutoObservable} from "mobx";


export class CartStore {

    goods = {


    }

    constructor() {
        const carts = localStorage.getItem("cart")
        if (carts != null) {
            this.goods = JSON.parse(carts)
        }
        makeAutoObservable(this)
    }


    getCartNum() {
        const len = Object.keys(this.goods).length
        return len === 0 ? "" : len
    }


    getGoods(){
        return this.goods
    }

    addCart(data) {
        let product = this.goods[data.id]
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
        this.goods[data.id] = product
        localStorage.setItem("cart", JSON.stringify(this.goods))
    }

    increase(productId){
        let product = this.goods[productId]
        product.num = product.num + 1
        localStorage.setItem("cart",JSON.stringify(this.goods))
    }

    decrease(productId){
        let product = this.goods[productId]
        if (product.num === 1) return
        product.num = product.num - 1
        localStorage.setItem("cart",JSON.stringify(this.goods))
    }

   price(productId){
        let product = this.goods[productId]
        if (!product) return
        return product.num * product.price

    }

    minusCart = function (productId) {
        delete this.goods[productId]
        localStorage.setItem("cart", JSON.stringify(this.products))

    }

    totalPrice() {
        return Object.values(this.goods).reduce((pre, cur, idx) => {
            return pre + cur.num * cur.price
        }, 0)

    }

    clear(){
        localStorage.removeItem("cart")
        this.goods = {}
    }


}


