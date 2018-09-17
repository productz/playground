import React from "react";
import { Crud } from "../crud-service/crud-service";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Avatar from "@material-ui/core/Avatar";
import ImageIcon from "@material-ui/icons/Image";
import WorkIcon from "@material-ui/icons/Work";
import BeachAccessIcon from "@material-ui/icons/BeachAccess";
import { withStyles } from "@material-ui/core/styles";

const styles = theme => ({
  root: {
    width: "100%",
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper
  }
});

const User = ({ classes }) => {
  return (
    <Crud
      modelName="user"
      render={({ model, creatModel }) => {
        let users = model;
        if (users) {
          let usersView = users.map(user => {
            return (
              <ListItem>
                <ListItemText primary={user.name} secondary="Name" />
              </ListItem>
            );
          });
          return (
            <Paper>
              <List container>{usersView}</List>
            </Paper>
          );
        }
      }}
    />
  );
};

export default withStyles(styles)(User);
