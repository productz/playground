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

  //you can pass domain logic here that prevents the user from doing something based on some domain logic?
  //we can also include ACL (access control list) as part of that domain logic
  let domainLogic = {
    c: chat => {},
    r: () => {},
    u: () => {},
    d: () => {}
  };
  const chatLogApi = crudService({ Model: chatLogModel, domainLogic });

  chatLogApi.use("/socket", chatApi);

  return chatLogApi;
};

export default Chat;
