#!/usr/bin/env node
var path = require("path");
var glob = require("glob");
var express = require("express");

var app = express();

glob(path.join("images", "*.+(jpg|png)"), function(error, matches) {

    app.use("/images", express.static(path.join(__dirname, "images")));

    // jsonp api
    app.get('/', function(req, res) {
        var baseUrl = "http://" + req.headers.host + "/";
        res.jsonp({
            images: matches.map(function(image) {
                return baseUrl + image;
            })
        });
    });


});
// if on port is set, use port.
var port = process.env.PORT || 1339;
app.listen(port);

console.log("app started of port " +  port);