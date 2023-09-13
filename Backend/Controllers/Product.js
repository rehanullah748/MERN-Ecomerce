const { validationResult } = require("express-validator");
const ProductModel = require("../Model/Product");

module.exports.CreateProduct = async (req, res) => {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
        console.log(req.body)
        try {
            const createdProduct = await ProductModel.create({ ...req.body })
            return res.status(200).json({ product: createdProduct, msg: "product created" })
        } catch (error) {
            console.log(error)
            return res.status(500).json({ error: error.message })
        }

    } else {
        return res.status(400).json({ error: errors.array() })
    }
}

module.exports.getAllProduct = async (req, res) => {
    try {
        const gotProducts = await ProductModel.find({})
        return res.status(200).json(gotProducts)
    } catch (error) {
        return res.status(400).json({ error: error.message })
    }
}

module.exports.productDetails = async (req, res) => {
    const { id } = req.params;
    try {
        const details = await ProductModel.findById(id)
        return res.status(200).json(details)

    } catch (error) {
        return res.status(400).json({ msg: error.message })
    }
}

module.exports.updateProduct = async (req, res) => {
    const { id } = req.params;
    try {
        const result = await ProductModel.findByIdAndUpdate({ _id: id })
        if (!result) {
            return res.status(404).json({ msg: "product not found" })
        } else {
            return res.status(200).json({ msg: "product updated" })
        }

    } catch (error) {
        return res.status(400).json({ error: error.message })
    }
}

module.exports.deleteProduct = async (req, res) => {
    const { id } = req.params;
    try {
        const result = await ProductModel.findByIdAndDelete({ _id: id })
        if (!result) {
            return res.status(404).json({ msg: "product not found" })
        } else {
            return res.status(200).json({ msg: "product Deleted" })
        }

    } catch (error) {
        return res.status(400).json({ error: error.message })
    }
}
