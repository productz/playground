import React from "react";
import { List, ListItem, Spinner, Text, Button } from "native-base";

const User = ({
  model,
  createModel,
  getModel,
  updateModel,
  searchModel,
  isLoading
}) => {
  let users = model;
  if (users) {
    let usersView = users.map(user => {
      return (
        <ListItem>
          <Text>{user.name}</Text>
        </ListItem>
      );
    });
    return (
      <List>
        {usersView}
        <Button
          onPress={() => {
            createModel({ name: "Zee" });
          }}
        >
          <Text>Create User</Text>
        </Button>
      </List>
    );
  }
  return <Spinner />;
};

export default User;
