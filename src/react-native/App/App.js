import React from "react";
import ReactDOM from "react-dom";
import { NativeRouter as Router, Route } from "react-router-native";
import { Login, Register, PrivateRoute } from "../auth-service/auth-service";
import Home from "./Home";
import User from "./User";
import { ChatLog } from "./ChatLog";

class App extends React.Component {
  render() {
    return (
      <Router>
        <div>
          <Route
            path="/auth/login"
            render={props => {
              return (
                <Login
                  onRegister={() => props.history.push("/auth/register")}
                />
              );
            }}
          />
          <Route path="/auth/register" component={Register} />
          <PrivateRoute path="/admin" component={Admin} />
          <Route
            path="/user"
            render={props => {
              return <User />;
            }}
          />
          <Route
            path="/chat-log"
            render={props => {
              return <ChatLog />;
            }}
          />
        </div>
      </Router>
    );
  }
  componentWillReceiveProps(nextProps) {}
}

export const Admin = ({}) => {
  return <p>Admin Page</p>;
};