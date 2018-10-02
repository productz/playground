import React from "react";
import { ListItem, Icon, Left, Body, Right, Switch, Button, Text } from "native-base";

export const routeList = [
  { url: "/", name: "Home" },
  { url: "/admin", name: "Admin" },
  { url: "/user", name: "User" },
  { url: "/chat", name: "Chat" },
  { url: "/settings", name: "Settings" }
];

export const Routes = ({ onPress }) => (
  <React.Fragment>
    {routeList.map(route => {
      return (
        <Button onPress={event => onPress(route)} vertical>
          <Icon name="apps" />
          <Text>{route.name}</Text>
        </Button>
      );
    })}
  </React.Fragment>
);
