const express = require('express');
const app = express();
require("dotenv").config();
const port = process.env.PORT;
const cors = require("cors"); 
const routes = require('./routes/index');
const bodyParser = require('body-parser'); // Import body-parser
app.use(bodyParser.json()); // Parse JSON request body
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
const db = require('./database/dbconnection');
const User = require('./Models/UsersModel');
app.use(routes);

app.listen(port, (err) => {
    if (err) console.log(err)
    console.log('sever is running at port', port);
})