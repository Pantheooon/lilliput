const axios = require("axios");
module.exports = {
    axios: {
        user: axios.create({
            baseURL: 'http://localhost:8091/user',
            timeout: 3000,
            headers: {
                'Content-Type': 'application/json',
            }
        }),
        goods: axios.create({
            baseURL: 'http://localhost:8092/goods',
            timeout: 3000,
            headers: {
                'Content-Type': 'application/json',
            }
        }),
        order: axios.create({
            baseURL: 'http://localhost:8093/order',
            timeout: 3000,
            headers: {
                'Content-Type': 'application/json',
            }
        })
    }
    ,
    authUrl: ["[POST]/goods/comment", "[GET]/user/profile/me","[GET]/order/list"]
}
