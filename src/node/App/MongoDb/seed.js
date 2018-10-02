const houses = require("./seeds/houses");
const users = require("./seeds/users");
const userModel = require("./models/user");
const chatLogModel = require("./models/chat-log");
const houseModel = require("./models/house");
const mongoose = require("mongoose");
const config = require("config");

const connection = mongoose.connect(
  `mongodb://localhost:27017`,
  function(err) {
    if (err) return console.error(err);
    console.log("connected to db");
  }
); // connect to database

houseModel.remove({ isASeed: true }).exec(err => {
  if (err) {
    console.error(err);
  }
  console.log("removed!");
});
houses.map(house => {
  let h = new houseModel(house);
  h.save(err => {
    if (err) {
      console.error(err);
    }
    console.log("saved");
  });
});

return;
