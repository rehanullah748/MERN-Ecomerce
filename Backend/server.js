const express = require("express")
const connect = require("./config/DataBase")
const productRoutes = require("./routes/productRoutes")
const userRoutes = require("./routes/userRoutes")
var cors = require("cors");
const cookieParser = require("cookie-parser");
require("dotenv").config();
const app = express();
const port = 8000;
app.use(cookieParser());
app.use(cors({credentials:true, origin:"http://localhost:3000"}))
connect();
app.use(express.json())
app.use('/api', productRoutes)
app.use('/api', userRoutes)
app.listen(port, ()=> {
    console.log(`server is listening to port: ${port}`)
})


