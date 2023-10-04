const express = require("express")
const connect = require("./config/DataBase")
const productRoutes = require("./routes/productRoutes")
var cors = require("cors");
require("dotenv").config();
const app = express();
const port = 8000;
connect();
app.use(express.json())
app.use(cors())
app.use('/api', productRoutes)
app.listen(port, ()=> {
    console.log(`server is listening to to port: ${port}`)
})