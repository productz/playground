var mongoose = require("mongoose");
var findOrCreate = require("mongoose-findorcreate");
var Schema = mongoose.Schema;
let userSchema = new Schema({
  id: String,
  name: String,
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

// set up a mongoose model
module.exports = mongoose.model("User", userSchema);
