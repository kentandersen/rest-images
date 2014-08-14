#!/usr/bin/env node
var path = require("path");
var glob = require("glob");
var express = require("express");
var fetch = require("./fetch");
var topics = require("./topics");

var app = express();

app.use("/images", express.static(path.join(__dirname, "images")));

// jsonp api
app.get('/', function(req, res) {

    var topic = topics.getRandom();
    var promise = fetch.image(topic);

    promise.then(function(promise) {
        res.json(promise);
    });

});

app.get('/:query', function(req, res) {

    var promise = fetch.image(req.params.query);

    promise.then(function(promise) {
        res.json(promise);
    });

});


// if on port is set, use port.
var port = process.env.PORT || 1339;
app.listen(port);

console.log("app started of port " +  port);