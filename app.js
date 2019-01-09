/* Load modules */
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const Database = require("./database");

/*Creates database if does not exist*/
const database = new Database();
database.create();


/* Init server listening */
const port = process.argv[2] || 3000;
app.listen(port, function () {
    console.log("Server listening on port : " + port);
});

/* Express configuration */
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

/* Router configuration */
const REST_API_ROOT = '/api';
app.use(REST_API_ROOT, require('./routes/router'));

//For debugging start app with  sudo node --debug=9229 app.js
