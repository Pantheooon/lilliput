const log4js = require("koa-log4");
const log = log4js.getLogger('app')
const goods = require('../config/config').axios.goods
const jwt = require("koa-jwt");
const {me} = require("./user");



async function broadcast(ctx){
    log.info("--------")
    let res = await goods.get("/broadcast")
    ctx.body = res.data
    ctx.status = res.status
    return res
}



async function topSelling(ctx) {
    let res = await goods.get('/topSelling')
    ctx.body = res.data
    ctx.status = res.status
    return res

}


async function detail(ctx){
    let id = ctx.request.query.id
    let res = await goods.get(`/detail/${id}`)

    let commentNum =   (await goods.get(`/comment/num/${id}`)).data

    let detail = res.data
    detail.commentNum = commentNum

    ctx.body = detail
    ctx.status = res.status
    return res
}

async function comment(ctx){
    let id = ctx.request.query.id
    let res = await goods.get(`/comments/${id}`)
    ctx.body = res.data
    ctx.status = res.status
    return res
}

async function like(ctx){
    let commentId = ctx.request.query.commentId
    let res = await goods.post(`/comment/like/${commentId}`)
    ctx.body = res.data
    ctx.status = res.status
    return res
}

async function saveComment(ctx){
    let comment = ctx.request.body
    await me(ctx)
    comment.userId = ctx.body.userId
    let res = await goods.post(`/comment/save`,comment)
    ctx.body = res.data
    ctx.status = res.status
    return res
}
module.exports = {
    broadcast,topSelling,detail,comment,like,saveComment
}