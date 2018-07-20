const http = require("http");
const io = require("socket.io");
const express = require("express");
const axios = require("axios");
// ---------------------------------------------------------
// get an instance of the router for api routes
// ---------------------------------------------------------
var apiRoutes = express.Router();

const languages = ["ar", "fa", "en"];

export default function auth({ app, ip, port, onEvent }) {
  var server = http.Server(app);
  var ioServer = io(server);

  apiRoutes.get("/", function(req, res) {
    res.send("Hello! this is socket service");
  });

  ioServer.on("connection", function(socket) {
    ioServer.emit("init", { message: "you have connected" });
    socket.on("chat", function(msg) {
      let { text, username, language } = msg;
      let otherLangs = [];
      otherLangs = languages.filter(lang => lang !== language);
      //translate to the target of the other languages
      let translationPromises = otherLangs.map(lang => {
        return axios
          .post("http://localhost:8081/translate", {
            text,
            target: lang
          })
          .then(res => {
            return { to: lang, from: language, text: res.data[0] };
          });
      });
      Promise.all(translationPromises).then(translations => {
        translations.map(tran=>{
          msg[tran.from] = text
          msg[tran.to] = tran.text
        })
        ioServer.emit("chat", msg);
        let eventName = "chat";
        let eventData = msg;
        if (onEvent) {
          onEvent(eventName, eventData);
        }
      });
    });
  });

  server.listen(port);

  return apiRoutes;
}
