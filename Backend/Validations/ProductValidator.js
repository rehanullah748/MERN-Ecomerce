const { body } = require("express-validator");
module.exports.ProductValidator = [
    body("title").not().isEmpty().trim().withMessage("name is required"),
    body("price").not().isEmpty().trim().withMessage("price is required"),
    body("category").not().isEmpty().trim().withMessage("category is required"),
    body("description").not().isEmpty().trim().withMessage("description is required"),
    body("discount").not().isEmpty().trim().withMessage("discount is required"),
    body("stock").not().isEmpty().trim().withMessage("stock is required"),
]