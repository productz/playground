var mongoose = require("mongoose");
var Schema = mongoose.Schema;

// set up a mongoose model
let chatLogSchema = new Schema({
  username: String,
  translations: Object,
  text: String,
  date: Date,
  resource: { type: String, default: "chat-log" }
});
// chatLogSchema.plugin(autoIncrement.plugin, {
//   model: "ChatLog",
//   field: "chatId"
// });
module.exports = mongoose.model("ChatLog", chatLogSchema);
