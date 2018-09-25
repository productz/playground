import React from "react";
import { Route } from "react-router-native";
import { Text, AppRegistry } from "react-native";
import {
  Container,
  Header,
  Title,
  Button,
  Left,
  Right,
  Icon,
  Tab,
  Tabs,
  Body,
  Card,
  CardItem
} from "native-base";
import {
  LoginWithAuth,
  RegisterWithAuth,
  PrivateRoute,
  authDomainStore,
  authUiStore
} from "../../react+react-native/auth-service/auth-service";
import {
  Crud,
  crudDomainStore
} from "../../react+react-native/crud-service/crud-service";
import User from "./User/User";
import Login from "./Login/MaterialLogin";
import Register from "./Register/MaterialRegister";

let rootStore = new Store({
  authDomainStore,
  authUiStore,
  crudDomainStore
});

export default class App extends React.Component {
  render() {
    return (
      <React.Fragment>
        <Route
          path="/auth/login"
          render={props => {
            return (
              <LoginWithAuth
                onRegister={() => props.history.push("/auth/register")}
                authUiStore={rootStore.authUiStore}
                authDomainStore={rootStore.authDomainStore}
              >
                <Login />
              </LoginWithAuth>
            );
          }}
        />
        <Route
          path="/auth/register"
          render={props => {
            return (
              <RegisterWithAuth
                authDomainStore={rootStore.authDomainStore}
                authUiStore={rootStore.authUiStore}
              >
                <Register />
              </RegisterWithAuth>
            );
          }}
        />
        <PrivateRoute
          path="/admin"
          component={Admin}
          authDomainStore={rootStore.authDomainStore}
        />
        <Route
          path="/user"
          render={({ location, match, history }) => {
            return (
              <Crud
                modelName="user"
                crudDomainStore={rootStore.crudDomainStore}
              >
                <User location={location} match={match} history={history} />
              </Crud>
            );
          }}
        />
      </React.Fragment>
    );
  }
  componentWillReceiveProps(nextProps) {}
}

export const Admin = ({}) => {
  return <p>Admin Page</p>;
};
