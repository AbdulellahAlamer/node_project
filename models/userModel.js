const mongoose = require('mongoose');
const crypto = require('crypto');
const validator = require('validator'); // is a libary to check the inputs
const bcrypt = require('bcryptjs');
const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, 'you have to put your email'],
    unique: [true, 'you have to put your email'],
    lowercase: true,
    validate: [validator.isEmail, 'Please provide a valid email'],
  },

  name: {
    type: String,
    required: [true, 'you have to put your name'],
  },

  photo: {
    type: String,
  },
  role: {
    type: String,
    enum: ['user', 'guide', 'lead-guide', 'admin'],
    default: 'user',
  },

  password: {
    type: String,
    required: [true, 'you have to put password'],
    minlength: 8,
    select: false,
  },

  passwordConfirm: {
    type: String,
    required: [true, 'you have to put password'],
    validate: {
      validator: function (val) {
        return val === this.password;
      },
      message: 'Password does not match',
    },
  },
  passwordChangedAt: Date,
  passwordResetToken: String,
  passwordResetExpires: Date,
  active: {
    type: Boolean,
    default: true,
    select: false,
  },
  emailConfirm: {
    type: Boolean,
    default: true,
    select: false,
  },
});
// 1) if the password change : hash the new one
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  // hashing >> the more number(12) is be the more hashing prosess will be

  this.password = await bcrypt.hash(this.password, 12);
  this.passwordConfirm = undefined;
  next();
});
userSchema.pre('save', function (next) {
  if (!this.isModified('password') || this.isNew) return next();

  this.passwordChangedAt = Date.now() - 1000;
  next();
});
// 2) when using find, find only the active one (true)
userSchema.pre(/^find/, function (next) {
  // this points to the current query
  this.find({ active: { $ne: false } });
  next();
});

userSchema.methods.correctPassword = async function (candidatePassword, userPassword) {
  // check if the password is correct with the input
  return await bcrypt.compare(candidatePassword, userPassword);
};

userSchema.methods.changedPasswordAfter = function (JWTTimestamp) {
  if (this.passwordChangedAt) {
    const changedTimestamp = parseInt(this.passwordChangedAt.getTime() / 1000, 10);

    return JWTTimestamp < changedTimestamp;
  }

  // False means NOT changed
  return false;
};
userSchema.methods.createPasswordResetToken = function () {
  const resetToken = crypto.randomBytes(32).toString('hex');

  this.passwordResetToken = crypto.createHash('sha256').update(resetToken).digest('hex');

  // console.log({ resetToken }, this.passwordResetToken);

  this.passwordResetExpires = Date.now() + 10 * 60 * 1000;

  return resetToken;
};
const User = mongoose.model('User', userSchema);

module.exports = User;
