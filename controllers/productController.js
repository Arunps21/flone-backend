const cloudinary = require("cloudinary").v2;
const productModel = require("../models/productModel");

const addProduct = async (req, res) => {
  try {
    const {
      name,
      description,
      price,
      category,
      subCategory,
      sizes,
      bestSeller,
    } = req.body;

    if (!req.file) {
      return res.status(400).json({ status: 400, msg: "Image is required" });
    }

    const uploadResult = await cloudinary.uploader.upload(req.file.path);
    if (!uploadResult || !uploadResult.url) {
      return res.status(500).json({ status: 500, msg: "Image upload failed" });
    }

    const product = await productModel.create({
      name,
      description,
      price,
      image: uploadResult.url,
      category,
      subCategory,
      sizes,
      bestSeller,
    });

    res.status(201).json({
      status: 201,
      msg: "Product added successfully",
      product,
    });
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ status: 500, msg: "Failed to add product" });
  }
};

const viewProduct = async (req, res) => {
  try {
    let product = await productModel.find();
    product.length > 0 ? res.status(200).json({ status: 200, product }) : [];
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ status: 500, msg: "Failed to load products" });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const { id } = req.body;
    await productModel.findByIdAndDelete(id);
    res.status(200).json({ status: 200, msg: "Product deleted successfully" });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ status: 500, msg: "Failed to delete product" });
  }
};

module.exports = { addProduct, viewProduct, deleteProduct };
