import {observer} from "mobx-react";
import {getTopSellings} from "../../api/Products";
import {Carousel, Image} from 'antd';
import './product.css'
import '../../index.css'
import React, {useContext, useState} from "react";
import {storeContext} from "../../stores/RootStore";
import {Link, Outlet} from "react-router-dom";

const ProductDetail = observer(() => {
    const cartStore = useContext(storeContext).cartStore
    let pro = getTopSellings().slice(0, 4)
    let [defaultNum, setDefaultNum] = useState(1)

    const addToCartFromDetail = () => {

        const data = pro[0]
        data.num = defaultNum
        cartStore.addCart(data)

    }
    const style = {
        "display": "flex",
        "flexWrap": "wrap",
        "justifyContent": "space-between"
    }
    return (
        <div className="base-content">
            <div className="product-detail">
                <div className={"product-detail-img"}>
                    {/*<Image*/}
                    {/*    width={400}*/}
                    {/*    src="https://pantheon-blog.oss-cn-beijing.aliyuncs.com/18119.png"*/}
                    {/*/>*/}
                    <Carousel autoplay>
                        <div>
                            <Image width={400}  src="https://pantheon-blog.oss-cn-beijing.aliyuncs.com/18119_2.png"/>
                        </div>
                        <div>
                            <Image width={400}  src="https://pantheon-blog.oss-cn-beijing.aliyuncs.com/18119_3.png"/>
                        </div>
                        <div>
                            <Image width={400}  src="https://pantheon-blog.oss-cn-beijing.aliyuncs.com/18119.png"/>
                        </div>
                    </Carousel>
                </div>
                <div className="product-detail-content">
                    <div style={{width: "400px"}}>
                        <div>
                            <span style={{fontSize: "26px", fontStyle: "bold", lineHeight: "1.2", color: "#282828"}}>Charcoal – Face Wash</span>
                        </div>
                        <div>
                            <span style={{fontSize: "20px", lineHeight: "1", color: "#dc9814"}}>Rs. 1,875.00</span>
                        </div>
                        <div style={{marginTop: "20px"}}>
                        <span style={{fontSize: "16px", lineHeight: "1.8", color: "#77777"}}>An affordable range of men skin, and hair production,
rich in natural active ingredients to help, fight, Defend, and Protect,</span>
                        </div>
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
                                <span className="product-detail-add-to-cart-button-p" onClick={addToCartFromDetail}>Add to cart</span>
                            </div>

                        </div>
                    </div>


                </div>
            </div>
            <div className={"product-detail-content-describe"}>
                <nav>
                    <ul>
                        <li>
                            <Link to="/product/2/describe">详细参数</Link>
                        </li>
                        <li>
                            <Link to="/product/2/comment">评价</Link>
                        </li>
                        <li>
                            <Link to="/product/2/extra">价格说明</Link>
                        </li>
                    </ul>
                </nav>
                <Outlet/>
            </div>
        </div>
    )
})

function Describe(){
    return (<div><Image src="https://pantheon-blog.oss-cn-beijing.aliyuncs.com/18119_detail.png"/></div>)
}

function Extra(){
    return (<div><Image src={"https://pantheon-blog.oss-cn-beijing.aliyuncs.com/43e2954feb6d1b108438481f1d5b0bd3.png"}/></div>)
}
function Comment() {
    return (
        <div></div>
    )
}

export {ProductDetail,Describe,Extra,Comment}