import React, {useEffect, useState} from 'react';
import {getTopSelling} from "../../api/Goods";
import {GoodsList} from "../product/GoodsList";
import {observer} from "mobx-react";

const TopSelling = observer(()=>{
    let [topSelling,setTopSelling] = useState([])
    useEffect(()=>{
        async function  fetchTopSelling(){
            const res = await getTopSelling()
            setTopSelling(res.data)
        }

        fetchTopSelling()

    },[])



    const style = {
        "display": "flex",
        "flexWrap": "wrap",
        "justifyContent": "space-between"
    }
    return (
        <div className="base-content" style={style}>
            <GoodsList data={topSelling}/>
        </div>
    )
})


export {TopSelling}