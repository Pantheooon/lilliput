const router = require('@koa/router')()
const user = require('./service/user')
const goods = require('./service/goods')
const order = require('./service/orderList')

/**
 * router register
 */
router.post("/user/signup",user.singup)
router.post("/user/login",user.login)
router.get("/user/profile/me",user.me)
router.get("/user/refreshToken",user.refreshToken)
router.get("/home/broadcast",goods.broadcast)
router.get("/home/topSelling",goods.topSelling)
router.get("/goods/detail",goods.detail)
router.get("/goods/comment",goods.comment)
router.post("/goods/comment/like",goods.like)
router.post("/goods/comment",goods.saveComment)
router.post("/order/save",order.saveOrder)
router.get("/order/list",order.orderList)




module.exports = router