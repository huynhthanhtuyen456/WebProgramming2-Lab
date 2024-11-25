const auth = require('../controllers/authController');
const validator = require('../middlewares/validate');
const checkor = require('express-validator');

module.exports = app => {
    // Register route -- POST request
    app.post(
        "/register",
        checkor.check("email")
            .isEmail()
            .withMessage("Enter a valid email address")
            .normalizeEmail(),
        checkor.check("first_name")
            .not()
            .isEmpty()
            .withMessage("You first name is required")
            .trim()
            .escape(),
        checkor.check("last_name")
            .not()
            .isEmpty()
            .withMessage("You last name is required")
            .trim()
            .escape(),
        checkor.check("password")
            .notEmpty()
            .isLength({ min: 8 })
            .withMessage("Must be at least 8 chars long"),
        validator.Validate,
        auth.Register
    );

    // Login route == POST request
    app.post(
        "/login",
        checkor.check("email")
            .isEmail()
            .withMessage("Enter a valid email address")
            .normalizeEmail(),
        checkor.check("password").not().isEmpty(),
        validator.Validate,
        auth.Login
    );
};