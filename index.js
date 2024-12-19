const express = require("express")
const cors = require("cors")
const app = express()
require("dotenv").config()
const port = process.env.PORT || 9000
const db = require("./config/mongoConnection")
const {connectCloudinary} = require("./config/cloudinaryConfiguration")
const userRoutes = require("./routes/userRoutes")
const productRoutes = require("./routes/productRoutes") 
const adminRoutes = require("./routes/adminRoutes")

app.use(express.json())
app.use(cors())
app.use(express.urlencoded({extended:true}))
connectCloudinary()
app.use("/user",userRoutes)
app.use("/product",productRoutes)
app.use("/admin",adminRoutes)


app.listen(port,()=>{
    console.log(`Server run at http://localhost:${port}`)
})