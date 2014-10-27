var express = require('express');

/**
 * GET /
 * Home page.
 */

var app = express();

exports.index = function(req, res) {
  res.render('home/index/home', {
    title: ''
  });
};

