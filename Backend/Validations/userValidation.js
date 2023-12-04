const { body } = require("express-validator");
module.exports.userValidation =[
    body("name").not().isEmpty().trim().withMessage("name is required"),
    body("email").not().isEmpty().trim().withMessage("email is required"),
    body("password").not().isEmpty().trim().withMessage("password is required"),
    ]

    module.exports.loginValidation =[
        body("email").not().isEmpty().trim().withMessage("email is required"),
        body("password").not().isEmpty().trim().withMessage("password is required"),
        ]