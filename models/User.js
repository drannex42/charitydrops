var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');
var crypto = require('crypto');

var userSchema = new mongoose.Schema({
  email: { type: String, unique: true, lowercase: true },
  password: String,

  facebook: String,
  twitter: String,
  google: String,
  github: String,
  instagram: String,
  linkedin: String,
  tokens: Array,

  profile: {
    name: { type: String, default: '' },
    gender: { type: String, default: '' },
    location: { type: String, default: '' },
    website: { type: String, default: '' },
    picture: { type: String, default: '' },
    user_id: { type: Number, index: { unique: true } },
  },

  resetPasswordToken: String,
  resetPasswordExpires: Date
});


/**
 * Hash the password for security.
 * "Pre" is a Mongoose middleware that executes before each user.save() call.
 */

userSchema.pre('save', function(next) {
  var user = this;

  if (!user.isModified('password')) return next();

  bcrypt.genSalt(5, function(err, salt) {
    if (err) return next(err);

    bcrypt.hash(user.password, salt, null, function(err, hash) {
      if (err) return next(err);
      user.password = hash;
      next();
    });
  });
});

/**
 * Validate user's password.
 * Used by Passport-Local Strategy for password validation.
 */

userSchema.methods.comparePassword = function(candidatePassword, cb) {
  bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
    if (err) return cb(err);
    cb(null, isMatch);
  });
};


module.exports = mongoose.model('User', userSchema);
