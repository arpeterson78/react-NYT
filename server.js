const express = require("express");
const bodyParser = require("body-parser");
var mongojs = require('mongojs');
var morgan = require('morgan');
const mongoose = require('mongoose');
var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost:/nyt";
mongoose.connect(MONGODB_URI);
mongoose.Promise = Promise;

const PORT = process.env.PORT || 3001;

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

app.use(bodyParser.json());

var db = mongoose.connection;
db.on("error", function (error) {
    console.log("Mongoose Error: ", error);
})

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept"
    );
    res.header("Access-Control-Allow-Methods", "POST, GET, OPTIONS, PUT, DELETE");
    next();
});


app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.get("/articles", function (req, res) {
    // db.articles.find({}, function (error, articles) {
    //     res.json(articles);
    // })
    res.end();
});

app.post("/save-article", function (req, res) {
    res.end();
});

app.delete("/delete-article", function (req, res) {
    res.end();
})

// Listen on port 3001
app.listen(PORT, function () {
    console.log('🌎 ==> Now listening on PORT %s! Visit http://localhost:%s in your browser!', PORT, PORT);
});