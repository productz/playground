import React from "react";
import { List, ListItem, Spinner, Text } from "native-base";

const User = ({ model, creatModel, getModel, updateModel, searchModel, isLoading }) => {
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
  return <Spinner />;
};

export default User;
