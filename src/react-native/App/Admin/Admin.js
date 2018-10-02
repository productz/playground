import React from "react";
import { toJS } from "mobx";
import { Route, Link, Switch } from "react-router-native";
import {
  Container,
  Drawer,
  Content,
  H1,
  H2,
  H3,
  Text,
  Header,
  List,
  ListItem,
  Left,
  Right,
  Body
} from "native-base";
import AdminDetail from "./AdminDetail";
//this will take Admin from "admin-service"
//and pass in the MODALS that will be used to edit the resource
//MODALS then will just be wrapped in a crud component that will pass it the (getModel,createModel,updateModel...etc)
const AdminPage = ({ schemas, crudDomainStore, location, match, history }) => {
  if (Array.isArray(schemas)) {
    let schemasView = schemas.map((schema, index) => {
      return (
        <AdminListItem
          location={location}
          match={match}
          history={history}
          modelName={schema.resource.defaultValue}
          index={index}
        />
      );
    });
    return (
      <div>
        <Route
          path={`${match.path}/:modelName`}
          render={({ match }) => {
            return (
              <AdminDetail
                crudDomainStore={crudDomainStore}
                schema={schemas.find(schema => {
                  return (
                    schema.modelName.toLowerCase() ===
                    match.params.modelName.toLowerCase()
                  );
                })}
              />
            );
          }}
        />
        <Route exact path={`${match.path}`}>
          <List>{schemasView}</List>
        </Route>
      </div>
    );
  }
  return CircularProgress;
};

const AdminListItem = ({ modelName, match, classes, index }) => {
  return (
    <ListItem key={index}>
      <Left>
        <ListItem>
          <p>{modelName}</p>
        </ListItem>
      </Left>
      <Right>
        <Link to={`${match.url}/${modelName}`}>
          <p>Edit</p>
        </Link>
      </Right>
    </ListItem>
  );
};

export default AdminPage;
