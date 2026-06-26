require('dotenv').config()
const dns = require("dns")
const app = require("./src/app")

// Change DNS
dns.setServers(["1.1.1.1", "8.8.8.8"]);

const connectToDB = require("./src/config/database")

connectToDB()

app.listen(3000,()=>{
    console.log("Server Running Successfully on Port 3000")
})