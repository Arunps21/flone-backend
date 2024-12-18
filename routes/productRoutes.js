const express = require("express")
const productRoutes = express.Router()
const upload = require("../middlewares/multer")
const { addProduct, viewProduct, deleteProduct } = require("../controllers/productController")

productRoutes.route("/add").post(upload.single("image"),addProduct)
productRoutes.route("/view").get(viewProduct)
productRoutes.route("/delete").post(deleteProduct)
module.exports = productRoutes