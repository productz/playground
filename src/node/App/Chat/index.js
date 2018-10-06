import crudService from "../../services/crud-service/crud-service.js";
import socketService from "../../services/socket-service/socket-service.js";
import {
  registerAction,
  isPermitted
} from "../../services/acl-service/acl-service";

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
  let crudDomainLogic = {
    create: (user, req) => {
      //we need to include is permitted in here
      return {
        isPermitted: isPermitted({ key: "chat.create", user }),
        criteria: {}
      };
    },
    read: (user, req) => {
      return {
        isPermitted: isPermitted({ key: "chat.read", user }),
        criteria: {}
      };
    },
    update: (user, req) => {
      return {
        isPermitted: isPermitted({ key: "chat.update", user }),
        criteria: {}
      };
    },
    del: (user, req) => {
      return {
        isPermitted: isPermitted({ key: "chat.delete", user }),
        criteria: {}
      };
    },
    search: (user, req) => {
      return {
        isPermitted: isPermitted({ key: "chat.search", user }),
        criteria: {}
      };
    }
  };

  const chatLogApi = crudService({ Model: chatLogModel, crudDomainLogic });

  chatLogApi.use("/socket", chatApi);

  return [chatLogApi];
};

export default Chat;
