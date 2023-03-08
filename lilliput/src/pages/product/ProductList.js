import {Link} from "react-router-dom";
import React, {useContext} from "react";
import './product.css'
import {storeContext} from "../../stores/RootStore";
import {Modal} from "antd";

function ProductList(props) {
    let products = props.data
    const cartStore = useContext(storeContext).cartStore
    const addToCart = (data) => {
        cartStore.addCart(data)
        Modal.success({
            content: (
                <div>
                    <p>添加成功</p>
                </div>
            ),
        });
    }
    return (
        products.map((data, idx) => {
            return (
                <div className="product-list" key={data.id}>
                    <Link to={`/product/${data.id}`}>
                        <img src={data.pic}
                             className="product-list-img"/>
                    </Link>
                    <div className="product-list-detail">
                        <span>{data.name}</span><i
                        className="iconfont icon-gouwuchetianjia product-list-icon pointer"
                        onClick={() => {
                            addToCart(data)
                        }}/><br/>
                        <span>Rs. {data.price}</span><br/>
                    </div>
                </div>
            )
        })
    )
}


export {ProductList}