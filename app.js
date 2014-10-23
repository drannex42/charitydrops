/**
 * Module dependencies.
 */

var express = require('express');
var http = require('http');
var enforce = require('express-sslify');
var favicon = require('serve-favicon');



var cookieParser = require('cookie-parser');
var compress = require('compression');
var session = require('express-session');
var bodyParser = require('body-parser');
var logger = require('morgan');
var errorHandler = require('errorhandler');
var csrf = require('lusca').csrf();
var methodOverride = require('method-override');

var _ = require('lodash');
var MongoStore = require('connect-mongo')({ session: session });
var flash = require('express-flash');
var path = require('path');
var mongoose = require('mongoose');
var passport = require('passport');
var expressValidator = require('express-validator');
var connectAssets = require('connect-assets');

/**
 * Controllers (route handlers).
 */

var homeController = require('./controllers/home');
var userController = require('./controllers/user');

/**
 * API keys and Passport configuration.
 */

var secrets = require('./config/secrets');
var passportConf = require('./config/passport');

/**
 * Create Express server.
 */

var app = express();



// favicon

app.use(favicon(__dirname + '/public/raindrop-icon.png'));

    
/**
 * Connect to MongoDB.
 */

mongoose.connect(secrets.db);
mongoose.connection.on('error', function() {
  console.error('MongoDB Connection Error. Make sure MongoDB is running. = True, then you fucked up.');
});

var hour = 3600000;
var day = hour * 24;
var week = day * 7;

/**
 * CSRF whitelist.
 */

var csrfExclude = ['/url1', '/url2'];

/**
 * Express configuration.
 */

app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(compress());
app.use(connectAssets({
  paths: [path.join(__dirname, 'public/css'), path.join(__dirname, 'public/js')],
  helperContext: app.locals
}));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(expressValidator());
app.use(methodOverride());
app.use(cookieParser());
app.use(session({
  resave: true,
  saveUninitialized: true,
  secret: secrets.sessionSecret,
  store: new MongoStore({
    url: secrets.db,
    auto_reconnect: true
  })
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());
app.use(function(req, res, next) {
  // CSRF protection.
  if (_.contains(csrfExclude, req.path)) return next();
  csrf(req, res, next);
});
app.use(function(req, res, next) {
  // Make user object available in templates.
  res.locals.user = req.user;
  next();
});
app.use(function(req, res, next) {
  // Remember original destination before login.
  var path = req.path.split('/')[1];
  if (/auth|login|logout|signup|fonts|favicon/i.test(path)) {
    return next();
  }
  req.session.returnTo = req.path;
  next();
});
app.use(express.static(path.join(__dirname, 'public'), { maxAge: week }));


/**
 * Main routes.
 */



app.get('/', homeController.index);
app.get('/login', userController.getLogin);
app.post('/login', userController.postLogin);
app.get('/logout', userController.logout);
app.get('/forgot', userController.getForgot);
app.post('/forgot', userController.postForgot);
app.get('/reset/:token', userController.getReset);
app.post('/reset/:token', userController.postReset);
app.get('/signup', userController.getSignup);
app.post('/signup', userController.postSignup);
app.get('/account', passportConf.isAuthenticated, userController.getAccount);
app.post('/account/profile', passportConf.isAuthenticated, userController.postUpdateProfile);
app.post('/account/password', passportConf.isAuthenticated, userController.postUpdatePassword);
app.post('/account/delete', passportConf.isAuthenticated, userController.postDeleteAccount);
app.get('/account/unlink/:provider', passportConf.isAuthenticated, userController.getOauthUnlink);
app.get('/account', passportConf.isAuthenticated, userController.getAccount);


/* navbar dropdown */
app.get('/account/payment',  passportConf.isAuthenticated, function(req, res){
  res.render('account/payment', {
    title: 'Payment'  });
});

/* dashboard */
app.get('/dashboard', passportConf.isAuthenticated, function(req, res){
  res.render('dashboard/home', {
    title: 'Dashboard | ' });
 });


/* navbar */

app.get('/charities', function(req, res){
  res.render('home/charities', {
    title: 'Charities | '  });
});

app.get('/action', function(req, res){
  res.render('action/home', {
    title: 'Action Center | '  });
});



/* Footer Links */
app.get('/blog', function(req, res){
  res.render('home/blog', {
    title: 'Blog | ' }); });

app.get('/team', function(req, res){
  res.render('home/team', {
    title: 'Team | ' });
 });

app.get('/privacy', function(req, res){
  res.render('home/privacy', {
    title: 'Privacy Policy | ' });
 });


var User = require('./models/User');

/* Adding payment to db */
app.post('/charge', function(req, res){
    User.update({_id: req.user._id}, {
        tokens:{
            stripe: {
                token: req.body.stripeToken,
                tokenType: req.body.stripeTokenType,
                email: req.body.stripeEmail
            }
        }
    }, function(err, user) {
        if (err) console.log(err);
        console.log('Stripe details added successfully.');
        // Change this to render the you've done good page. <3
        // Good luck with this.
        res.render('account/payment', {
            title: 'Payment '
        });
    });
});


/**
 * OAuth sign-in routes.
 */

 app.get('/auth/facebook', passport.authenticate('facebook', { scope: ['email', 'user_location'] }));
    app.get('/auth/facebook/callback', passport.authenticate('facebook', { failureRedirect: '/login' }), function(req, res) {
      res.redirect(req.session.returnTo || '/dashboard');
    });
/**
    app.get('/auth/instagram', passport.authenticate('instagram'));
    app.get('/auth/instagram/callback', passport.authenticate('instagram', { failureRedirect: '/login' }), function(req, res) {
      res.redirect(req.session.returnTo || '/dashboard');
    });
    app.get('/auth/google', passport.authenticate('google', { scope: 'profile email' }));
    app.get('/auth/google/callback', passport.authenticate('google', { failureRedirect: '/login' }), function(req, res) {
      res.redirect(req.session.returnTo || '/dashboard');
    });
    app.get('/auth/twitter', passport.authenticate('twitter'));
    app.get('/auth/twitter/callback', passport.authenticate('twitter', { failureRedirect: '/login' }), function(req, res) {
      res.redirect(req.session.returnTo || '/dashboard');
    });
*/


/**
 * 500 Error Handler.
 */

app.use(errorHandler());

/**
 * Start Express server.
 */

app.listen(app.get('port'), function() {
  console.log('Hi! Your shit is located on port %d', app.get('port'), app.get('env'));
});

module.exports = app;
