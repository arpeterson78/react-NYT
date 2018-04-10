const express = require("express");
const bodyParser = require("body-parser");
var mongojs = require('mongojs');
var morgan = require('morgan');
const mongoose = require('mongoose');
var db = require('./models');
var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost:/nyt";
mongoose.connect(MONGODB_URI);
mongoose.Promise = Promise;

const PORT = process.env.PORT || 3001;

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

app.use(bodyParser.json());

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept"
    );
    res.header("Access-Control-Allow-Methods", "POST, GET, OPTIONS, PUT, DELETE");
    next();
});

app.get("/articles", function (req, res) {

    db.Article.find({}, function (err, savedArticles) {
        if (err) throw err;
        res.json(savedArticles);
    });

});

app.post("/save-article", function (req, res) {
    let savedArticle = req.body;
    console.log(savedArticle)
    let article = new db.Article(savedArticle);
    article.save(function (error, response) {
        console.log("Your Article has been saved.");
        if (error) {
            console.error(error);
        } else {

            res.json(response)
        }
    })


});

app.delete("/delete-article/:id", function (req, res) {
    let id = req.params.id;
    db.Article.remove({ _id: id }, function (err) {
        if (err) {
            return err
        } else {
            res.json(id);
        }

    });
})

// Listen on port 3001
app.listen(PORT, function () {
    console.log('🌎 ==> Now listening on PORT %s! Visit http://localhost:%s in your browser!', PORT, PORT);
});