require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

global.Vocab = require('./api/models/vocabModel');
const routes = require('./api/routes/vocabRoutes');

mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGDB_URL);

const port = process.env.PORT || 3000;
const app = express();

const corsOptions = {
    origin: '*',
    optionsSuccessStatus: 200,
  };
app.use(cors(corsOptions));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

routes(app);
app.listen(port);
app.use((req, res) => { 
    res.status(404).send({ url: `${req.originalUrl} not found`});
});
console.log(`Server started on port ${port}`);