const router = require('@koa/router')()
const user = require('./service/user')


/**
 * router register
 */
router.post("/user/signup",user.singup)
router.post("/user/login",user.login)
router.get("/user/profile/me",user.me)
router.get("/user/refreshToken",user.refreshToken)







module.exports = router