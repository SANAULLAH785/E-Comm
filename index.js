const express = require('express');
const app = express();
require("dotenv").config();
const port = process.env.PORT;
const cors = require("cors"); 
const routes = require('./routes/index');
const bodyParser = require('body-parser'); // Import body-parser
const path = require("path")
app.use(bodyParser.json()); // Parse JSON request body
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
const db = require('./database/dbconnection');
const User = require('./Models/UsersModel');
app.use(routes);

app.get('/products',(req,res)=>{
  res.status(200);
})
app.use(express.static(path.join(__dirname, "./frontend/build")));
app.get("*", function (_, res) {
    res.sendFile(
      path.join(__dirname, "./client/build/index.html"),
      function (err) {
        res.status(500).send(err);
      }
    );
  });
  

app.listen(port, (err) => {
    if (err) console.log(err)
    console.log('sever is running at port', port);
})