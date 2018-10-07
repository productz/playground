import React from "react";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import { fade } from "@material-ui/core/styles/colorManipulator";
import Input from "@material-ui/core/Input";
import CircularProgress from "@material-ui/core/CircularProgress";
import { Route, Link } from "react-router-dom";
import UserEdit from "./UserEdit";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import SearchIcon from "@material-ui/icons/Search";

const styles = theme => ({
  root: {
    width: "100%"
  },
  grow: {
    flexGrow: 1
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20
  },
  title: {
    display: "none",
    [theme.breakpoints.up("sm")]: {
      display: "block"
    }
  },
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: fade(theme.palette.common.white, 0.25)
    },
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing.unit,
      width: "auto"
    }
  },
  searchIcon: {
    width: theme.spacing.unit * 9,
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  inputRoot: {
    color: "inherit",
    width: "100%"
  },
  inputInput: {
    paddingTop: theme.spacing.unit,
    paddingRight: theme.spacing.unit,
    paddingBottom: theme.spacing.unit,
    paddingLeft: theme.spacing.unit * 10,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: 120,
      "&:focus": {
        width: 200
      }
    }
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
  editedModel,
  location,
  match,
  history,
  classes,
  form
}) => {
  let users = model;
  if (users && users.length > 0) {
    let usersView = users.map(user => {
      return (
        <ListItem key={user._id}>
          <ListItemText>
            <p>{user.name}</p>
          </ListItemText>
          <ListItemSecondaryAction>
            <Link to={`${match.url}/${user._id}`}>
              <Button
                onClick={() => {
                  setModelEdit(user, true);
                }}
              >
                <p>Edit</p>
              </Button>
            </Link>
            {/* <Button
              onClick={() => {
                deleteModel(user);
              }}
            >
              <p>Delete</p>
            </Button> */}
          </ListItemSecondaryAction>
        </ListItem>
      );
    });
    return (
      <div className={classes.root}>
        <header>
          <AppBar position="static">
            <Toolbar>
              <div className={classes.search}>
                <div className={classes.searchIcon}>
                  <SearchIcon />
                </div>
                <Input
                  placeholder="Search…"
                  disableUnderline
                  classes={{
                    root: classes.inputRoot,
                    input: classes.inputInput
                  }}
                />
              </div>
            </Toolbar>
          </AppBar>
        </header>
        <Route
          path={`${match.path}/:id`}
          render={({ match }) => {
            return (
              <UserEdit
                onCancel={() => setModelEdit(false)}
                onSave={(updatedUser, values) => {
                  updateModel(updatedUser, values);
                }}
                form={form}
                user={users.find(({ _id }) => _id === match.params.id)}
                isVisible={isEditing}
              />
            );
          }}
        />
        <Route
          exact
          path={`${match.path}`}
          render={props => {
            return (
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
            );
          }}
        />
      </div>
    );
  }
  return <CircularProgress />;
};

export default withStyles(styles)(User);
