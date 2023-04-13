const {me} = require("./user");
const order = require('../config/config').axios.order
const goods = require('../config/config').axios.goods

async function saveOrder(ctx) {

    await me(ctx)

    const body = {
        goods:ctx.request.body,
        userId:ctx.body.userId
    }

    let res = await order.post(`/save`,body)
    ctx.body = res.data
    ctx.status = res.status
    return res


}


async function orderList(ctx){
    await me(ctx)
    let res = await order.get(`/list?userId=${ctx.body.userId}`)
    if (!res) {
        ctx.status = 200
        ctx.body = []
    }
    let goodsIds = res.data.map(it=>it.goodsId)
    let gds = await goods.post(`/list`,goodsIds)
    const map = gds.data.reduce((acc, cur) => {
        acc.set(cur.id, cur);
        return acc;
    }, new Map());

    let ans = []
    res.data.forEach((it)=>{
        it.goods = map.get(it.goodsId)
        ans.push(it)
    })

    ctx.status = 200
    ctx.body = ans
    return res
}

module.exports={
    saveOrder, orderList
}