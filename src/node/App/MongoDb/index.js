import mongoose from "mongoose";

const MongoDb = ({ app, config, onInit, onError }) => {
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
  return connection;
};

export default MongoDb;
