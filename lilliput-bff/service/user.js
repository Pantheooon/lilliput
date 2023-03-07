const log4js = require("koa-log4");
const log = log4js.getLogger('app')
const user = require('../config/config').axios.user
async function singup(ctx) {
    log.info("signup start")
    let res = (await user.post('/signup', ctx.request.body))
    ctx.body = res.data
    ctx.status = res.status
    return res
}


async function login(ctx) {
    try {
        let res = (await user.post('/login', ctx.request.body))
        ctx.body = res.data
        ctx.status = res.status
        return res
    } catch (err) {
        if (err.response.status == 404) {
            ctx.status = 404
            ctx.body = "username or password is incorrect"
        }else {
            throw err
        }
    }
}


async function me(ctx) {
    let token = ctx.request.headers.authorization
    if (!token) {
        ctx.status = 401
        return
    }
    let res = (await user.get('/profile/me', {
        headers: {
            Authorization: token
        }
    }))
    ctx.status = res.status
    ctx.body = res.data
}


async function refreshToken(ctx){
    let token = ctx.request.headers.authorization
    if (!token) {
        ctx.status = 401
        return
    }

    let res = (await user.get('/refreshToken', {
        headers: {
            Authorization: token
        }
    }))
    ctx.status = res.status
    ctx.body = res.data

}


module.exports = {
    singup, login, me,refreshToken
}