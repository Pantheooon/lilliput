const axios = require("axios");
module.exports = {
    axios: {
       user:axios.create({
           baseURL: 'http://localhost:8091/user',
           timeout: 3000,
           headers:{
               'Content-Type': 'application/json',
           }
       })
    }
}
