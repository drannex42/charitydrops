var _ = require('lodash');
var async = require('async');
var crypto = require('crypto');
var nodemailer = require('nodemailer');
var passport = require('passport');
var User = require('../models/User');
var secrets = require('../config/secrets');

//  GET /charities

exports.getCharities = function(req, res) {
  res.render('charities/charities', {
    title: 'Charities | '
  });
};

// GET /charities/manage

exports.getManageCharities = function(req, res) {
  res.render('charities/manage', {
    title: 'Manage Charities | '
  });
};


// POST /charities

exports.postCharities = function(req, res, next) {
  User.findById(req.user.id, function(err, user) {
    if (err) return next(err);
    user.charities.donatecheck = req.body.donatecheck || '';
    user.charities.hrc = req.body.hrc || '';
    user.charities.wwf = req.body.wwf || '';

    user.save(function(err) {
      if (err) return next(err);
      req.flash('success', { msg: 'Charity information updated.' });
      res.redirect('/charities');
    });
  });
};

//  POST /charities/manage


exports.postManageCharities = function(req, res, next) {
  User.findById(req.user.id, function(err, user) {
    if (err) return next(err);
    user.charities.donatecheck = req.body.donatecheck || '';
    user.charities.hrc = req.body.hrc || '';
    user.charities.wwf = req.body.wwf || '';

    user.save(function(err) {
      if (err) return next(err);
      req.flash('success', { msg: 'Charity information updated.' });
      res.redirect('/charities/manage');
    });
  });
};

