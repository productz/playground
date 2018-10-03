import React from "react";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import ListSubheader from "@material-ui/core/ListSubheader";
import DashboardIcon from "@material-ui/icons/Dashboard";
import Icon from "@material-ui/core/Icon";
import { runInContext } from "vm";

export const routeList = [
  { url: "/", name: "Home", icon: "dashboard" },
  { url: "/user", name: "Users", icon: "supervised_user_circle" },
  { url: "/chat", name: "Chat", icon: "chat" },
  { url: "/house", name: "Houses", icon: "home" },
  { url: "/settings", name: "Settings", icon: "settings" },
  { url: "/admin", name: "Admin", icon: "supervisor_account" }
];

export const routeListLoggedOut = [
  { url: "/", name: "Home", icon: "dashboard" },
  { url: "/auth/register", name: "Sign Up", icon: "login" },
  { url: "/auth/login", name: "Sign In", icon: "register" }
];

export const Routes = ({ onClick, isLoggedIn, currentRoute }) => {
  console.log(currentRoute);
  return (
    <React.Fragment>
      {isLoggedIn
        ? routeList.map(route => {
            return (
              <ListItem
                selected={currentRoute === route.url}
                onClick={event => onClick(route)}
                button
              >
                <Icon>{route.icon}</Icon>
                <ListItemText primary={route.name} />
              </ListItem>
            );
          })
        : routeListLoggedOut.map(route => {
            return (
              <ListItem onClick={event => onClick(route)} button>
                <Icon>{route.icon}</Icon>
                <ListItemText primary={route.name} />
              </ListItem>
            );
          })}
    </React.Fragment>
  );
};
