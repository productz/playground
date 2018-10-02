import React from "react";
import { ListItem, Icon, Left, Body, Right, Switch } from "native-base";

export const routeList = [
  { url: "/#/", name: "Home" },
  { url: "/#/admin", name: "Admin" },
  { url: "/#/user", name: "User" },
  { url: "/#/chat", name: "Chat" },
  { url: "/#/settings", name: "Settings" }
];

export const Routes = (
  <div>
    {routeList.map(route => {
      return (
        <a href={route.url}>
          <ListItem button>
            <Left>
              <Icon name="plane" />
            </Left>
            <Body>
              <ListItem primary={route.name} />
            </Body>
          </ListItem>
        </a>
      );
    })}
  </div>
);
