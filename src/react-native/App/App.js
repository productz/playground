import React from "react";
import { NativeRouter as Router, Route } from "react-router-native";
import {
  Text,
  AppRegistry
} from "react-native";
import {
  Container,
  Header,
  Title,
  Button,
  Left,
  Right,
  Body,
  Icon,
  Tab,
  Tabs
} from "native-base";
// import { Login, Register, PrivateRoute } from "../auth-service/auth-service";
// import User from "./User";
// import { ChatLog } from "./ChatLog";

export default class App extends React.Component {
  render() {
    return (
      <Router>
        <Container>
          <Route
            path="/"
            render={props => {
              return <Text>home</Text>;
            }}
          />
          {/* <Route
            path="/auth/login"
            render={props => {
              return (
                <Login
                  onRegister={() => props.history.push("/auth/register")}
                />
              );
            }}
          /> */}
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
        </Container>
      </Router>
    );
  }
  componentWillReceiveProps(nextProps) {}
}

export const Admin = ({}) => {
  return <p>Admin Page</p>;
};
