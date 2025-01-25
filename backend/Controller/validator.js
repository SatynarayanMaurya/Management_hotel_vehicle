const {body} = require("express-validator")

exports.SignupValidator = [
    body("name","Name can't be empty").notEmpty(),
    body("email","Invalid Email").notEmpty().isEmail(),
    body("password","Password must be greater than 6 character").notEmpty().isLength({min:3}),
]

exports.loginValidator = [
    body("email","Invalid Email").notEmpty().isEmail(),
    body("password","Password must be greater than 6 character").notEmpty().isLength({min:3}),
]