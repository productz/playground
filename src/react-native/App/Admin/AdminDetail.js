import React from "react";
import { Crud } from "../../../react+react-native/index";
import { toJS } from "mobx";
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
import { Route, Link, Switch } from "react-router-dom";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import SearchIcon from "@material-ui/icons/Search";

const AdminDetail = ({
  schema,
  location,
  match,
  history,
  classes,
  detail
}) => {
  if (false) {
    return models.map(model => {
      return (
        <ListItem key={model._id}>
          <ListItemText>
            <p>{model.name}</p>
          </ListItemText>
          <ListItemSecondaryAction>
            <Link to={`${match.url}/${model._id}`}>
              <Button
                onClick={() => {
                  setModelEdit(model, true);
                }}
              >
                <p>Edit</p>
              </Button>
            </Link>
            <Button
              onClick={() => {
                deleteModel(model);
              }}
            >
              <p>Delete</p>
            </Button>
          </ListItemSecondaryAction>
        </ListItem>
      );
    });
  }
  return <CircularProgress />;
};

export default AdminDetail;
