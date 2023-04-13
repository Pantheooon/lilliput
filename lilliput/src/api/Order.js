import {authClient} from "./AxiosConfig";
function saveOrder(goodsList){
    return authClient.post(`/order/save`,goodsList)
}

function orderList(){
    return authClient.get(`/order/list`)
}

export {saveOrder,orderList}