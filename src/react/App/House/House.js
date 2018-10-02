import React from "react";
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
import { fade } from "@material-ui/core/styles/colorManipulator";
import Input from "@material-ui/core/Input";
import CircularProgress from "@material-ui/core/CircularProgress";
import { Route, Link } from "react-router-dom";
import HouseEdit from "./HouseEdit";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import SearchIcon from "@material-ui/icons/Search";
import { toJS } from "mobx";

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

const House = ({
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
  classes
}) => {
  let houses = model;
  if (houses && houses.length > 0) {
    let housesView = houses.map(house => {
      return (
        <ListItem key={house._id}>
          <ListItemText>
            <p>{house.name}</p>
          </ListItemText>
          <ListItemSecondaryAction>
            <Link to={`${match.url}/${house._id}`}>
              <Button
                onClick={() => {
                  setModelEdit(house, true);
                }}
              >
                <p>Edit</p>
              </Button>
            </Link>
            <Button
              onClick={() => {
                deleteModel(house);
              }}
            >
              <p>Delete</p>
            </Button>
          </ListItemSecondaryAction>
        </ListItem>
      );
    });
    return (
      <div className={classes.root}>
        <Route
          path={`${match.path}/:id`}
          render={({ match }) => {
            return (
              <HouseEdit
                onCancel={() => setModelEdit(false)}
                onSave={(updatedHouse, values) => {
                  updateModel(updatedHouse, values);
                }}
                house={houses.find(({ _id }) => _id === match.params.id)}
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
              <div>
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
                <List>
                  {housesView}
                  <Button
                    onClick={() => {
                      createModel({ name: "Zee" });
                    }}
                  >
                    <p>Create House</p>
                  </Button>
                </List>
              </div>
            );
          }}
        />
      </div>
    );
  }
  return <CircularProgress />;
};

export default withStyles(styles)(House);
