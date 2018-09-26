import React from "react";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import ListSubheader from "@material-ui/core/ListSubheader";
import DashboardIcon from "@material-ui/icons/Dashboard";

export const routeList = [
  { url: "/#/", name: "Home" },
  { url: "/#/auth/login", name: "Login" },
  { url: "/#/auth/register", name: "Register" },
  { url: "/#/admin", name: "Admin" },
  { url: "/#/user", name: "User" },
  { url: "/#/chat", name: "Chat" }
];

export const Routes = (
  <div>
    {routeList.map(route => {
      return (
        <a href={route.url}>
          <ListItem button>
            <ListItemIcon>
              <DashboardIcon />
            </ListItemIcon>
            <ListItemText primary={route.name} />
          </ListItem>
        </a>
      );
    })}
  </div>
);