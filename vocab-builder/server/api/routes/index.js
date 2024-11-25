const verify = require('../middlewares/verify');

module.exports = app => {
    // home route with the get method and a handler
    app.get("/", (req, res) => {
        try {
            res.status(200).json({
                status: "success",
                data: [],
                message: "Welcome to our API homepage!",
            });
        } catch (err) {
            res.status(500).json({
                status: "error",
                message: "Internal Server Error",
            });
        }
    });
    
    app.get("/user", verify.Verify, (req, res) => {
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
