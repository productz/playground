import mongoose from "mongoose";

const MongoDb = ({ app, config, onInit, onError, onDisconnect }) => {
  //run seeds
  const connection = mongoose.connect(
    `${config.get("db.host")}:${config.get("db.port")}`,
    function(err) {
      if (err) return onError(err);
      console.log("connected to db");
    }
  ); // connect to database
  const schemas = {};
  //extract resource and format mongodb schema
  Object.keys(connection.models).map(modelName => {
    let pathObject = connection.models[modelName].schema.paths;
    schemas[modelName] = pathObject;
  });
  onInit(connection.models, schemas);

  mongoose.connection.on("connection", function() {
    console.log("connected to db");
  });

  // If the connection throws an error
  mongoose.connection.on("error", function(err) {
    console.log("Mongoose default connection error: " + err);
    if (onError) {
      onError(err);
    }
  });

  // When the connection is disconnected
  mongoose.connection.on("disconnected", function() {
    console.log("Mongoose default connection disconnected");
    if (onDisconnect) {
      onDisconnect();
    }
  });

  return connection;
};

process.on("SIGINT", function() {
  mongoose.connection.close(function() {
    console.log(
      "Mongoose default connection disconnected through app termination"
    );
    process.exit(0);
  });
});

export default MongoDb;
