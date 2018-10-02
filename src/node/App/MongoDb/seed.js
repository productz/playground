import houses from "./seeds/houses";
import users from "./seeds/users";
import userModel from "./MongoDb/models/user";
import chatLogModel from "./MongoDb/models/chat-log";
import houseModel from "./MongoDb/models/house";

houses.map(house => {
  let h = new houseModel(house);
  h.save(err => {
    if (err) {
      console.error(err);
    }
    console.log("saved");
  });
});
