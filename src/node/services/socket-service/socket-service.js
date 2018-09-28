const http = require("http");
const io = require("socket.io");
const express = require("express");
// ---------------------------------------------------------
// get an instance of the router for api routes
// ---------------------------------------------------------
export default function socketIO({ app, config, onEvent, channel }) {
  var apiRoutes = express.Router();
  var server = http.Server(app);
  var ioServer = io(server);

  apiRoutes.get("/", function(req, res) {
    res.send("Hello! this is socket service");
  });

  ioServer.on("connection", function(socket) {
    ioServer.emit("init", "connected");
    socket.on(channel, function(msg) {
      let eventData = msg;
      if (onEvent) {
        onEvent(eventData, ioServer);
      }
    });
  });
  server.listen(config.get("server.port") + 1);

  return apiRoutes;
}
