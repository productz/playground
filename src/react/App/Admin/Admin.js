import React from "react";
import { toJS } from "mobx";
import { Crud } from "../../../react+react-native/index";
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
import AdminDetail from "./AdminDetail";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import SearchIcon from "@material-ui/icons/Search";
//this will take Admin from "admin-service"
//and pass in the MODALS that will be used to edit the resource
//MODALS then will just be wrapped in a crud component that will pass it the (getModel,createModel,updateModel...etc)
const AdminPage = ({ schemas, crudDomainStore, location, match, history }) => {
  if (Array.isArray(schemas)) {
    let schemasView = schemas.map((schema, index) => {
      return (
        <Crud
          crudDomainStore={crudDomainStore}
          modelName={schema.resource.defaultValue}
        >
          <AdminListItem
            location={location}
            match={match}
            history={history}
            modelName={schema.resource.defaultValue}
            index={index}
          />
        </Crud>
      );
    });
    return <List>{schemasView}</List>;
  }
  return CircularProgress;
};

const AdminListItem = ({
  model,
  modelName,
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
  index
}) => {
  return (
    <ListItem key={index}>
      <ListItemText>
        <p>{modelName}</p>
      </ListItemText>
      <ListItemSecondaryAction>
        <Link to={`${match.url}/${modelName}`}>
          <Button
            onClick={() => {
              setModelEdit(model, true);
            }}
          >
            <p>Edit</p>
          </Button>
        </Link>
      </ListItemSecondaryAction>
    </ListItem>
  );
};

export default AdminPage;
