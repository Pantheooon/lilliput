import {Link} from "react-router-dom";
import React, {useContext} from "react";
import './goods.css'
import {storeContext} from "../../stores/RootStore";
import {Image, Modal} from "antd";

function GoodsList(props) {
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
                             className={'product-list-img'}/>
                    </Link>
                    <div className="product-list-detail">
                        <span>产品：{data.name}</span><i
                        className="iconfont icon-gouwuchetianjia product-list-icon pointer"
                        onClick={() => {
                            addToCart(data)
                        }}/><br/>
                        <span>售价： {data.price}</span><br/>
                        <span>剩余库存： {data.inventory}</span><br/>
                    </div>
                </div>
            )
        })
    )
}


export {GoodsList}