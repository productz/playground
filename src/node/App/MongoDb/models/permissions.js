var mongoose = require("mongoose");
var Schema = mongoose.Schema;

// set up a mongoose model
let permissionsSchema = new Schema({
  key: String,
  users: [{ type: Schema.Types.ObjectId, ref: "User" }]
});
module.exports = mongoose.model("Permissions", permissionsSchema);
