const express = require("express");
const { CreateProduct, getAllProduct, productDetails, updateProduct, deleteProduct, getProductById, getHomeProducts, getProductDetails } = require("../Controllers/Product");
const { ProductValidator } = require("../Validations/ProductValidator");
const router = express.Router();
router.post('/product/create-product',ProductValidator, CreateProduct)
router.get('/product/get-all-products', getAllProduct)
router.get('/product/product-details/:id', productDetails)
router.put('/product/update-product/:id',ProductValidator, updateProduct)
router.delete('/product/delete-product/:id', deleteProduct)
router.get('/product/home-products/:page', getHomeProducts)
router.get('/product/:slug', getProductDetails)
module.exports = router;