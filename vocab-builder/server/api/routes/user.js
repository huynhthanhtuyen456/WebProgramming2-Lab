const verify = require('../middlewares/verify');

module.exports = app => {
    app.get("/me", verify.Verify, (req, res) => {
        try {
            res.status(200).json({
                status: "success",
                message: "Welcome to the your Dashboard!",
            });
        } catch (err) {
            console.log(err)
            res.status(500).json({
                status: "error",
                message: "Internal Server Error",
            }); 
        }
    })  
 };
