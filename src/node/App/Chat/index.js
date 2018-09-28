import crudService from "../../services/crud-service/crud-service.js";
import socketService from "../../services/socket-service/socket-service.js";

const Chat = ({ app, config, userModel, chatLogModel }) => {
  const channel = "chat";
  const onEvent = (eventData, socket) => {
    let chat = new chatLogModel({ text: eventData });
    chat.save(err => {
      if (err) {
        return console.error(err);
      }
      return socket.emit("chat", chat);
    });
  };
  const chatApi = socketService({
    app,
    onEvent,
    config,
    channel
  });

  const chatLogApi = crudService({ Model: chatLogModel });

  chatLogApi.use("/socket", chatApi);

  return chatLogApi;
};

export default Chat;
