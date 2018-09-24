import React from "react";
import { Crud } from "../../crud-service/crud-service";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import TextField from "@material-ui/core/TextField";
import { withStyles } from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";

const styles = theme => ({
  root: {
    width: "100%",
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper
  }
});

const User = ({
  model,
  createModel,
  getModel,
  updateModel,
  deleteModel,
  searchModel,
  setModelEdit,
  isEditing,
  editedModel
}) => {
  let users = model;
  if (users) {
    let usersView = users.map(user => {
      return (
        <ListItem key={user._id}>
          <ListItemAvatar />
          <ListItemText>
            <p>{user.name}</p>
          </ListItemText>
          <ListItemSecondaryAction>
            <Button
              onClick={() => {
                setModelEdit(user, true);
              }}
            >
              <p>Edit</p>
            </Button>
            <Button
              onClick={() => {
                deleteModel(user);
              }}
            >
              <p>Delete</p>
            </Button>
          </ListItemSecondaryAction>
        </ListItem>
      );
    });
    return (
      <div>
        <header>
          <TextField />
        </header>
        {/* <UserEdit
          onCancel={() => setModelEdit(false)}
          onSave={(updatedUser, values) => {
            updateModel(updatedUser, values);
          }}
          editedUser={editedModel}
          isVisible={isEditing}
        /> */}
        <List>
          {usersView}
          <Button
            onClick={() => {
              createModel({ name: "Zee" });
            }}
          >
            <p>Create User</p>
          </Button>
        </List>
      </div>
    );
  }
  return <CircularProgress />;
};

export default withStyles(styles)(User);
