import {observer} from "mobx-react";
import {addLike, doSaveComment, getComments, getProductById} from "../../api/Goods";
import * as antd from 'antd';
import {Button, Image, Input, Modal} from 'antd';
import './goods.css'
import '../../index.css'
import React, {useContext, useEffect, useState} from "react";
import {storeContext} from "../../stores/RootStore";
import {Link, Outlet, useParams} from "react-router-dom";

const {TextArea} = Input;
const GoodsDetail = observer(() => {

    let {id} = useParams()


    let [product, setProduct] = useState({})
    useEffect(() => {
        getProductById(id).then(r => {
            setProduct(r.data)
        })
    }, [])


    const cartStore = useContext(storeContext).cartStore
    let [defaultNum, setDefaultNum] = useState(1)

    const addToCartFromDetail = () => {
        const data = product
        data.num = defaultNum
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
        <div className="base-content">
            <div className="product-detail">
                <div className={"product-detail-img"}>
                    <Image width={400} src={product.pic}/>
                </div>
                <div className="product-detail-content">
                    <div style={{width: "400px"}}>
                        <div>
                            <span style={{
                                fontSize: "26px",
                                fontStyle: "bold",
                                lineHeight: "1.2",
                                color: "#282828"
                            }}>{product.name}</span>
                        </div>
                        <div>
                            <span
                                style={{fontSize: "20px", lineHeight: "1", color: "#dc9814"}}>{product.price} 元</span>
                        </div>
                        <div style={{marginTop: "20px"}}>
                            {/* {product.hot} */}
                            <div dangerouslySetInnerHTML={{__html: product.hot}}/>
                            {
                                (() => {
                                    if (product.gift) {
                                        return (<>
                                            <hr/>
                                            <div className={"product-detail-content-zp"}><span>赠品</span></div>
                                            <span>{product.gift}</span></>)
                                    }
                                })()
                            }

                        </div>
                        <span style={{marginTop: "10px", color: "red"}}>剩余库存： {product.inventory}</span><br/>
                        <div className="product-detail-add-to-cart">
                            <div className={"product-detail-add-to-cart-quantity"}>
                                <div className={"product-detail-add-to-cart-quantity-operate"}>
                                    <i className={"iconfont icon-xiangzuo"}
                                       onClick={() => setDefaultNum(defaultNum - 1 <= 0 ? 1 : defaultNum - 1)}/>
                                    <strong style={{fontSize: "17px"}}>{defaultNum}</strong>
                                    <i className={"iconfont icon-xiangyou1"}
                                       onClick={() => setDefaultNum(defaultNum + 1)}/>
                                </div>

                            </div>
                            <div className={"product-detail-add-to-cart-button"}>
                                <span className="product-detail-add-to-cart-button-p"
                                      onClick={addToCartFromDetail}>加入购物车</span>
                            </div>

                        </div>
                    </div>


                </div>
            </div>
            <div className={"product-detail-content-describe"}>
                <nav>
                    <ul>
                        <li>
                            <Link to={`/product/${id}/describe`}>详细参数</Link>
                        </li>
                        <li>
                            <Link to={`/product/${id}/comment`}>评价<span
                                className={"product-detail-comment-num"}>{product.commentNum}</span></Link>
                        </li>
                        <li>
                            <Link to={`/product/${id}/extra`}>价格说明</Link>
                        </li>
                    </ul>
                </nav>
                <Outlet/>
            </div>
        </div>
    )
})

function Describe() {
    let {id} = useParams()
    let [product, setProduct] = useState({})
    useEffect(() => {
        getProductById(id).then(r => {
            setProduct(r.data)
        })
    }, [])
    return (<div><Image src={product.detail}/></div>)
}

function Extra() {
    return (<div><Image src={"https://pantheon-blog.oss-cn-beijing.aliyuncs.com/43e2954feb6d1b108438481f1d5b0bd3.png"}/>
    </div>)
}

function Comment() {
    let [comments, setComment] = useState([])

    let {id} = useParams()
    useEffect(() => {
        getComments(id).then(r => {
            setComment(r.data)
        })
    }, [])


    let like = (data) => {
        data.likeNum = data.likeNum + 1
        setComment([...comments])
        addLike(data.comment.id)
    }

    let [commentText, setCommentText] = useState("")


    let saveComment = () => {
        doSaveComment(commentText, id).then(r => {
            antd.Modal.success({
                content: (
                    <div>
                        <p>感谢您的评价！</p>
                    </div>
                ),
                onOk: () => window.location.reload()
            });

        })
    }


    let map = comments.map((data, idx) => {
            return (
                <div className={"product-detail-comment"} key={data.comment.id}>
                    <div>
                        <div>{data.userName}</div>
                        <div style={{fontSize: "8px"}}>{data.comment.createTime}</div>
                        <div>{data.comment.comment}</div>
                        <div onClick={() => like(data)}><i
                            className={"iconfont icon-like pointer"}>{data.likeNum === 0 ? '' : data.likeNum}</i>
                        </div>
                    </div>
                </div>
            )
        }
    );
    if (localStorage.getItem("token")){
        map.push(
            (() => {
                return (
                    <div style={{marginTop: "20px", position: "relative", height: "170px"}} className={"product-detail-comment"} key={`comment_${id}`}>
                        <div>
                            <TextArea rows={4} onChange={(e) => setCommentText(e.target.value)}/>
                        </div>
                        <div style={{marginTop: "5px", position: "absolute", right: "0px"}}>
                            <Button type="primary" onClick={() => saveComment()}>评价</Button>
                        </div>
                    </div>
                )
            })()
        )
    }
    return map
}

export {GoodsDetail, Describe, Extra, Comment}