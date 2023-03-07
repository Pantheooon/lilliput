import React from 'react';
import {getTopSellings} from "../../api/Products";
import {ProductList} from "../product/ProductList";
export function TopSelling() {
    const products = getTopSellings()
    const style = {
        "display": "flex",
        "flexWrap": "wrap",
        "justifyContent": "space-between"
    }
    return (
        <div className="base-content" style={style}>
            <ProductList data={products}/>
        </div>
    )

}

