const express = require("express")
const productRoutes = express.Router()
const upload = require("../middlewares/multer")
const { addProduct, viewProduct, deleteProduct } = require("../controllers/productController")
const {isAdmin} = require("../middlewares/isAdmin")

productRoutes.route("/add").post(upload.single("image"),isAdmin,addProduct)
productRoutes.route("/view").get(viewProduct)
productRoutes.route("/delete").post(isAdmin,deleteProduct)
module.exports = productRoutes