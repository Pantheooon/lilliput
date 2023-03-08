import './header.css'
import React, {useContext, useMemo, useState} from 'react';
import * as antd from 'antd';
import {Button, Input, Select} from 'antd';
import {LockOutlined, UserOutlined} from "@ant-design/icons";
import Modal from "antd/es/modal/Modal";
import {storeContext} from "../../stores/RootStore";
import {observer} from "mobx-react";
import {login, profileMe, signUp} from "../../api/User"

export const Header = observer(() => {
    //https://ares.lk/
    profileMe(useContext(storeContext).userStore)

    return (
        <div>
            <HeaderNav/>
            <LoginModel/>
            <CartModel/>
            <SignUpModel/>
        </div>

    )


})


const HeaderNav = observer(() => {
    let user = useContext(storeContext).userStore.getUser()
    let navStore = useContext(storeContext).navStore
    let cartStore = useContext(storeContext).cartStore
    return (
        <div className="header base-content">
            <div className="header-logo pointer">LILLIPUT</div>
            <div className="header-right">
                <div className="header-right-me pointer">
                    {
                        (() => {
                            if (user === null || user === undefined || user.userName === null || user.userName === undefined) {
                                return (<div>
                                    <i onClick={() => navStore.openLogin()}>登录</i>
                                    <i onClick={() => navStore.openSignUp()}>|注册</i>
                                </div>)
                            } else {
                                return (<div><i>{user.userName}</i></div>)
                            }
                        })()
                    }

                </div>
                <div className="header-right-cart pointer"><i
                    className={"iconfont icon-31gouwuche icon-25"} onClick={() => navStore.openCart()}><span
                    className="header-right-cart-num">{cartStore.getCartNum()}</span></i></div>
                <div className="header-right-order pointer">
                    <i className={"iconfont icon-quanbudingdan icon-25"}/>
                </div>
            </div>
        </div>
    )
})


const CartModel = observer(() => {
    let carts = useContext(storeContext).cartStore
    let navStore = useContext(storeContext).navStore
    return (<div className="cart" style={{visibility: navStore.cart ? "visible" : "hidden"}}>
        <div className="cart-top" style={{height: "70px"}}>
            <i className={"cart-top_close"} onClick={() => {
                navStore.closeCart()
            }}>关闭</i>
        </div>
        <hr width="400px" className={"cart-item-hr"}/>
        <div className="cart-items">
            {

                Object.keys(carts.products).map((id, idx) => {
                    const product = carts.products[id]
                    return (
                        <div key={id}>
                            <div className={"cart-item"}>
                                <div className="car_item-left">
                                    <img src={product.pic}
                                         className="cart-item_img"/>
                                </div>
                                <div className={"cart-item_right"}>
                                    <div className={"cart-item_right_close"} onClick={() => {
                                        carts.minusCart(id)
                                    }}>
                                        <i className={"iconfont icon-guanbi"} style={{fontSize: "10px"}}/>
                                    </div>
                                    <span>{product.name}</span><br/>
                                    <div className="cart-item-bottom">
                                        <span>数量 </span>
                                        <i className={"iconfont icon-xiangzuo"} onClick={()=>{carts.decrease(id)}}/>
                                        <strong style={{fontSize: "17px"}}>{product.num}</strong>
                                        <i className={"iconfont icon-xiangyou1"} onClick={()=>{carts.increase(id)}}/>
                                        <span className="cart-item-price">价格: {carts.price(id)}</span>
                                    </div>

                                </div>
                            </div>
                            <hr width="400px" className={"cart-item-hr"}/>

                        </div>
                    )
                })
            }
        </div>


        <div className="cart-bottom">
            <div>
                <span style={{float: "right"}}>总价: {carts.totalPrice()}</span>
            </div>
            <div style={{float: "right", marginTop: "20px"}}>
                <Button type="default" onClick={() => {
                    checkout()
                }}>下单</Button>
            </div>

        </div>

    </div>)
})


function checkout() {
}

const SignUpModel = observer(() => {
    const [confirmLoading, setConfirmLoading] = useState(false);
    let userStore = useContext(storeContext).userStore
    const [loginData, setLoginData] = useState({
        "userName": "",
        "password": ""
    })
    const clearData = () => {
        setLoginData({
            "userName": "",
            "password": ""
        })
    }
    let navStore = useContext(storeContext).navStore
    const handleOk = () => {
        signUp(loginData.userName, loginData.password)
            .then((r) => {
                if (r.data.success) {
                    localStorage.setItem("token", r.data.token)
                    antd.Modal.success({
                        content: (
                            <div>
                                <p>sign up success</p>
                            </div>
                        ),
                    });
                    profileMe(userStore)
                } else {
                    antd.Modal.error({
                        content: (
                            <div>
                                <p>sign up failed:{r.data.errorMsg}</p>
                            </div>
                        ),
                    });
                }
                clearData()

            })

        setConfirmLoading(true);
        setTimeout(() => {
            navStore.closeSignUp()
            setConfirmLoading(false);
        }, 2000);
    };

    const handleCancel = () => {
        clearData()
        navStore.closeSignUp()
    };
    return (<div>
        <Modal
            footer={
                [
                    <Button key="submit" type="primary" onClick={handleOk}>
                        提交
                    </Button>
                ]
            }
            title="注册"
            onOk={handleOk}
            open={navStore.signUp}
            confirmLoading={confirmLoading}
            okText="注册"
            onCancel={handleCancel}>
            <Input size="large" placeholder="用户名" prefix={<UserOutlined/>} value={loginData.userName}
                   onChange={(e) => {
                       setLoginData({
                           ...loginData,
                           userName: e.target.value
                       })
                   }}/>
            <div style={{height: "50px"}}></div>
            <Input size="large" placeholder="密码" prefix={<LockOutlined/>} value={loginData.password}
                   onChange={(e) => {
                       setLoginData({
                           ...loginData,
                           password: e.target.value
                       })
                   }}/>
        </Modal>
    </div>)

})


const LoginModel = observer(() => {
    const [confirmLoading, setConfirmLoading] = useState(false);
    const [loginData, setLoginData] = useState({
        "userName": "",
        "password": ""
    })
    let navStore = useContext(storeContext).navStore
    let userStore = useContext(storeContext).userStore
    const handleOk = () => {
        login(loginData.userName, loginData.password).then(r=>{
            if (r.status === 200){
                localStorage.setItem("token",r.data)
                profileMe(userStore)
            }
        })
        setConfirmLoading(true);
        setTimeout(() => {
            navStore.closeLogin()
            setConfirmLoading(false);
        }, 2000);
    };

    const handleCancel = () => {
        setLoginData({
            "userName": "",
            "password": ""
        })
        navStore.closeLogin()
    };
    return (<div>
        <Modal
            footer={
                [
                    <Button key="submit" type="primary" onClick={handleOk}>
                        提交
                    </Button>
                ]
            }
            title="登录"
            onOk={handleOk}
            open={navStore.login}
            confirmLoading={confirmLoading}
            okText="login"
            onCancel={handleCancel}>

            <Input size="large" placeholder="name" prefix={<UserOutlined/>} value={loginData.userName}
                   onChange={(e) => {
                       setLoginData({
                           ...loginData,
                           userName: e.target.value
                       })
                   }}/>
            <div style={{height: "50px"}}></div>
            <Input size="large" placeholder="password" prefix={<LockOutlined/>} value={loginData.password}
                   onChange={(e) => {
                       setLoginData({
                           ...loginData,
                           password: e.target.value
                       })
                   }}/>

        </Modal>
    </div>)

})




