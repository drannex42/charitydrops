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
    created:  {type: Date, default: Date},
  },

  charities: {
/**
 * 0 = False
 * 1 = True
 */
    charitydrops: { type: String, default: '0' },
    unicef: { type: String, default: '0' },
    waterorg: { type: String, default: '0' },
    plannedparenthood: { type: String, default: '0' },
    hrc: { type: String, default: '0' },
    wwf: { type: String, default: '0' },
    stjude: { type: String, default: '0' },
    redcross: { type: String, default: '0' },
    breastcancer: { type: String, default: '0' },
      
    donatecheck: { type: String, default: '0' },
  },

  bundles: {
/**
 * 0 = False
 * 1 = True
 */
    one: { type: String, default: '0' },
    two: { type: String, default: '0' },
    three: { type: String, default: '0' },
    four: { type: String, default: '0' },
  },


  charlinks: {
    charitydrops: { type: String, default: 'https://charitydrops.org/' },
    unicef: { type: String, default: 'https://uncef.charitydrops.org/' },
    waterorg: { type: String, default: 'https://water.charitydrops.org/' },
    plannedparenthood: { type: String, default: 'https://plannedparenthood.charitydrops.org/' },
    hrc: { type: String, default: 'https://hrc.charitydrops.org//' },
    wwf: { type: String, default: 'https://wwf.charitydrops.org/' },
    stjude: { type: String, default: 'https://stjude.charitydrops.org/' },
    redcross: { type: String, default: 'https://redcross.charitydrops.org/' },
    breastcancer: { type: String, default: 'https://breastcancer.charitydrops.org/' },
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

userSchema.methods.findAndModify = function (query, sort, doc, options, callback) {
  return this.collection.findAndModify(query, sort, doc, options, callback);
};


module.exports = mongoose.model('User', userSchema);
