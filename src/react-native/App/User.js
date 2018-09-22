import React from "react";
import { Crud } from "../crud-service/crud-service";
import { List, ListItem, Text } from "native-base";

const User = ({}) => {
  return (
    <Crud
      modelName="user"
      render={({
        model,
        creatModel,
        getModel,
        updateModel,
        searchModel
      }, isLoading) => {
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
      }}
    />
  );
};

export default User;
