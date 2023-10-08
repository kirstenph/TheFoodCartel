const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
// const passportLocalMongoose = require('passport-local-mongoose')

const userSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  email: {
    type: String,
    required: true,
    unique: true,
  },
  passwordHash: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ['customer', 'staff', 'admin'],
    default: 'customer',
  },
  image: {
    url: String,
    filename: String
  },
});

// userSchema.plugin(passportLocalMongoose,
//   { usernameField: 'email' })



userSchema.virtual('password')
  .set(function (password) {
    this.passwordHash = bcrypt.hashSync(password, 10);
  });

userSchema.methods.setPassword = function (password) {
  this.passwordHash = bcrypt.hashSync(password, 10);
};

userSchema.methods.isValidPassword = function (password) {
  return bcrypt.compareSync(password, this.passwordHash);
};

const User = mongoose.model('User', userSchema);

module.exports = User;
