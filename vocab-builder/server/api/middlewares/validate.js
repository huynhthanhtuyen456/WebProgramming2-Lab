const validationResult = require('express-validator');

exports.Validate = (req, res, next) => {
    const errors = validationResult.validationResult(req);
    if (!errors.isEmpty()) {
        let error = {};
        errors.array().map((err) => (error[err.param] = err.msg));
        return res.status(422).json({ error });
    }
    next();
};