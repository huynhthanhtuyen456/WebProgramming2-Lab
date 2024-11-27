var express = require('express');

app = express();
port = process.env.PORT || 3000;
mongoose = require('mongoose');
Task = require('./api/models/todoListModel'); // create model loading here
const bodyParser = require('body-parser');

// mongoose instance connection url
mongoose.Promise = global.Promise;
mongoose.connect('mongodb+srv://username:password@cluster0.jrgxr.mongodb.net/todoList');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const routes = require('./api/routes/todoListRoutes'); // importing routes
routes(app); // register the route

app.listen(port);
console.log("todo list RESTful API server started on: " + port);