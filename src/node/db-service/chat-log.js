var mongoose = require("mongoose");
var Schema = mongoose.Schema;

// set up a mongoose model
module.exports = mongoose.model(
  "ChatLog",
  new Schema({
    data: String,
    name: String,
    date: Date
  })
);
