import React from "react";
import {
  ListItem,
  Icon,
  Left,
  Body,
  Right,
  Switch,
  Button,
  Text
} from "native-base";

export const routeList = [
  { url: "/", name: "Home" },
  { url: "/user", name: "User" },
  { url: "/chat", name: "Chat" },
  { url: "/auth/login", name: "Login" },
  { url: "/auth/register", name: "Register" }
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
