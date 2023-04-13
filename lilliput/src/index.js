import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import {Header} from "./pages/header/Header";
import {HashRouter, Route, Routes} from "react-router-dom";
import BroadCast from "./pages/broadcast/BroadCast";
import {TopSelling} from "./pages/topselling/TopSelling";
import {rootStore, storeContext} from "./stores/RootStore";
import {Describe, Comment, GoodsDetail, Extra} from "./pages/product/GoodsDetail";

const root = ReactDOM.createRoot(document.getElementById('root'));


root.render(
    <storeContext.Provider value={rootStore}>
        <HashRouter>
            <Header/>
            <AppRoutes/>
            <Footer/>
        </HashRouter>
    </storeContext.Provider>
);


function AppRoutes() {
    return (
        <Routes path="/" element={<Home/>}>
            <Route index element={<Home/>}/>
            <Route path="product/:id" element={<GoodsDetail/>}>
                <Route index element={<Describe/>}/>
                <Route path="describe" element={<Describe/>}/>
                <Route path="comment" element={<Comment/>}/>
                <Route path="extra" element={<Extra/>}/>
            </Route>
        </Routes>

    );
}



function Home() {
    return (
        <div>
            <BroadCast/>
            <TopSelling/>
        </div>
    );
}


function Footer() {
    return (
        <div className="base-content">
            <hr/>
            <div className="footer">Copyright © 2023 LILLIPUT. All Rights Reserved.</div>
        </div>
    )
}