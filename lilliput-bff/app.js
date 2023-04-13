const log4js = require('koa-log4')
const log = log4js.getLogger('app')
const Koa = require('koa')
const router = require('./router')
const app = new Koa()
const config = require('./config/config')
const {koaBody} = require('koa-body');
const axios = require('axios')
const {AxiosError} = require("axios");
const user = require("./service/user");
const goods = require("./service/goods");
const {authUrl} = require("./config/config");
const {verifyToken} = require("./service/user");

app.use(koaBody())


app.use(async (ctx, next) => {
    const start = Date.now()
    await next()
    const ms = Date.now() - start
    ctx.set('X-Response-Time', `${ms}ms`)
})

app.use(async (ctx, next) => {
    try {
        let u = `[${ctx.request.method}]${ctx.request.url}`
        if (authUrl.find(it=>it === u)){
            let res = await verifyToken(ctx.header.authorization)
            if(res.status === 401) {
                ctx.status = 401
                return
            }
        }
        await next()
    } catch (err) {
        if (err instanceof AxiosError) {
            ctx.status = err.response.status || 500
        } else {
            ctx.status = err.statusCode || err.status || 500
        }
        ctx.body = err.message

    }
})
app.use(router.routes())
module.exports = app