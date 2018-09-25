var mongoose = require("mongoose");
var findOrCreate = require("mongoose-findorcreate");
const bcrypt = require("bcrypt");
const saltRounds = 10;

var Schema = mongoose.Schema;
let userSchema = new Schema({
  id: String,
  name: String,
  email: String,
  password: {
    type: String,
    set: function(newValue) {
      return bcrypt.hashSync(newValue, saltRounds);
    }
  },
  gender: String,
  image: String,
  jwtToken: String,
  googleId: String,
  googleAccessToken: String,
  googleRefreshToken: String,
  facebookId: String,
  facebookAccessToken: String,
  facebookRefreshToken: String,
  twitterId: String,
  twitterAccessToken: String,
  twitterRefreshToken: String
});
userSchema.plugin(findOrCreate);

UserSchema.methods.verifyPassword = function(password, callback) {
  if (bcrypt.compareSync(password, this.password)) {
    callback(null, this);
  } else {
    // Something bad happened with MongoDB. You shouldn't run into this often.
    callback(error, null);
  }
};

// set up a mongoose model
module.exports = mongoose.model("User", userSchema);
