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
import { Login } from "../auth-service/auth-service";
// import User from "./User";
// import { ChatLog } from "./ChatLog";

export default class App extends React.Component {
  render() {
    return (
      <React.Fragment>
        <Route
          path="/auth/login"
          render={props => {
            return (
              <Card>
                <CardItem>
                  <Body>
                    <Text>home</Text>
                  </Body>
                </CardItem>
              </Card>
            );
          }}
        />
        <Route
            path="/"
            render={props => {
              return (
                <Login
                  onRegister={() => props.history.push("/auth/register")}
                />
              );
            }}
          />
        {/* <Route path="/auth/register" component={Register} /> */}
        {/* <PrivateRoute path="/admin" component={Admin} /> */}
        {/* <Route
            path="/user"
            render={props => {
              return <User />;
            }}
          />
          <Route
            path="/chat-log"
            render={props => {
              return <ChatLog />;
            }} */}
      </React.Fragment>
    );
  }
  componentWillReceiveProps(nextProps) {}
}

export const Admin = ({}) => {
  return <p>Admin Page</p>;
};
