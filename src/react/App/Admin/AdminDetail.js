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
import AdminEdit from "./AdminEdit";

const ModelList = ({
  model,
  deleteModel,
  createModel,
  updateModel,
  isEditing,
  setModelEdit,
  match,
  history,
  location
}) => {
  if (model && model.length > 0) {
    return (
      <div>
        <Route
          path={`${match.path}/:id`}
          render={({ match }) => {
            return (
              <AdminEdit
                onCancel={() => setModelEdit(false)}
                onSave={(updatedUser, values) => {
                  updateModel(updatedUser, values);
                }}
                model={model.find(({ _id }) => _id === match.params.id)}
                isVisible={isEditing}
              />
            );
          }}
        />
        <List>
          {model.map(m => {
            return (
              <ListItem key={m._id}>
                <ListItemText>
                  <p>{m.name}</p>
                </ListItemText>
                <ListItemSecondaryAction>
                  <Link to={`${match.url}/${m._id}`}>
                    <Button
                      onClick={() => {
                        setModelEdit(m, true);
                      }}
                    >
                      <p>Edit</p>
                    </Button>
                  </Link>
                  <Button
                    onClick={() => {
                      deleteModel(m);
                    }}
                  >
                    <p>Delete</p>
                  </Button>
                </ListItemSecondaryAction>
              </ListItem>
            );
          })}
        </List>
      </div>
    );
  }
  return <React.Fragment />;
};

const AdminDetail = ({
  schema,
  location,
  match,
  history,
  classes,
  detail,
  crudDomainStore
}) => {
  let modelName = match.params.modelName;
  if (modelName) {
    return (
      <div>
        <Route exact path={`${match.path}`}>
          <Crud modelName={modelName} crudDomainStore={crudDomainStore}>
            <ModelList match={match} history={history} location={location} />
          </Crud>
        </Route>
      </div>
    );
  }
  return <CircularProgress />;
};

export default AdminDetail;
