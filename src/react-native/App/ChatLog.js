import React from "react";
import { Crud } from "../crud-service/crud-service";
export const ChatLog = ({}) => {
  return (
    <Crud
      modelName="chat-log"
      render={({ model }) => {
        let chatLogs = model;
        if (chatLogs) {
          return chatLogs.map(chatLog => {
            return <p>chatLog.name</p>;
          });
        }
      }}
    />
  );
};
