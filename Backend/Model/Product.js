const mongoose = require('mongoose');
const ProductSchema = mongoose.Schema({
    title: {
        required: true,
        type: String,
    },
    price: {
        required: true,
        type: String,
    },
    image: {
        required: false,
        type: String
    },
    category: {
        required: true,
        type: String
    },
    description: {
        required: true,
        type: String
    },
    quantities: {
        required: true,
        type: String
    },
    sizes: {
        required: false,
        type: Map,
        enums: ['sm','xs','md','lg', 'xl']
    },
    colors: {
        required: false,
        type: [Map]
    },
    discount: {
        type: String,
        required: true
    },
    stock: {
        required: false,
        type: String
    }
}, {
    timestamps: true
});
const ProductModel = mongoose.model('product', ProductSchema)
module.exports = ProductModel