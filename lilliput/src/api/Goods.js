import {noAuthClient,authClient} from "./AxiosConfig";

 function getTopSelling() {
    return authClient.get("/home/topSelling")
}

function getBroadcast() {
    return  noAuthClient.get("/home/broadcast")
}

function getProductById(id) {
    return authClient.get(`/goods/detail?id=${id}`)
}


function  getComments(goodsId){
     return noAuthClient.get(`/goods/comment?id=${goodsId}`)
}

function  addLike(commentId){
    return noAuthClient.post(`/goods/comment/like?commentId=${commentId}`)
}

function doSaveComment(commentText,goodsId){
     let obj = {
         comment:commentText,
         goodsId:goodsId
     }
     return authClient.post(`/goods/comment`,obj)
}



export {getTopSelling, getProductById, getBroadcast,getComments,addLike,doSaveComment}