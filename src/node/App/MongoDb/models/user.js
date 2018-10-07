var mongoose = require("mongoose");
var findOrCreate = require("mongoose-findorcreate");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const permissionsSchema = require("./permissions");

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
  googleProfile: Object,
  facebookId: String,
  facebookAccessToken: String,
  facebookRefreshToken: String,
  facebookProfile: Object,
  twitterId: String,
  twitterAccessToken: String,
  twitterRefreshToken: String,
  twitterProfile: Object,
  acl: Array,
  hasSeenTutorial: { type: Boolean, default: false },
  hasConfirmedEmail: { type: Boolean, default: false },
  settings: Object,
  isAdmin: { type: Boolean, default: false },
  permissions: [{ type: Schema.Types.ObjectId, ref: "Permissions" }],
  resource: { type: String, default: "user" }
});
userSchema.plugin(findOrCreate);

userSchema.methods.verifyPassword = function(password) {
  if (bcrypt.compareSync(password, this.password)) {
    return this;
  }
  return false;
};

// set up a mongoose model
module.exports = mongoose.model("User", userSchema);
