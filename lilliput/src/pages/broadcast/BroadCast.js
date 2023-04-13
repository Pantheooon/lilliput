import React, {useEffect, useState} from 'react';
import {Carousel, Image} from 'antd';
import './broadcast.css'
import {getBroadcast} from "../../api/Goods";
import {observer} from "mobx-react";



const BroadCast = observer(()=>{
    let [broadcast, setBroadcast] = useState([])
    useEffect(() => {
        getBroadcast().then(r=>{
            setBroadcast(r.data)
        })
    }, [])

    return (
        <div className="base-content broadcast">
            <Carousel autoplay>
                {
                    broadcast.map((data, index) => {
                        return (
                            <div key={data.id}>
                                <Image className="broadcast-img" preview={false}
                                       src={data.broadCastPic} alt={data.name} onClick={()=>{ window.location.hash = `/product/${data.goodsId}`}}/>
                            </div>
                        )
                    })
                }
            </Carousel>
        </div>
    )
})

export default BroadCast