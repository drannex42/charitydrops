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

app.get('/team', function(req, res){
  res.render('home/team', {
    title: 'Team | ' });
 });

app.get('/privacy', function(req, res){
  res.render('home/privacy', {
    title: 'Privacy Policy | ' });
 });