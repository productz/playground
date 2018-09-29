import mongoose from "mongoose";

const MongoDb = ({ app, config, onInit, onError, onDisconnect }) => {
  const connection = mongoose.connect(
    `${config.get("db.host")}:${config.get("db.port")}`,
    function(err) {
      if (err) onError(err);
    }
  ); // connect to database
  const schemas = {};
  Object.keys(connection.models).map(modelName => {
    schemas[modelName] = connection.models[modelName].schema.paths;
  });
  onInit(schemas);

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
