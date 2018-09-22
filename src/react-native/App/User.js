import React from "react";
import { List, ListItem, Text } from "native-base";

const User = ({ model, creatModel, getModel, updateModel, searchModel }) => {
  let users = model;
  if (users) {
    let usersView = users.map(user => {
      return (
        <ListItem>
          <Text>{user.name}</Text>
        </ListItem>
      );
    });
    return <List>{usersView}</List>;
  }
  return <Text />;
};

export default User;
