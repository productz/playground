import React from "react";
import ReactDOM from "react-dom";
import { HashRouter as Router, Route, Link } from "react-router-dom";
import { Login, Register, PrivateRoute } from "../auth-service/auth-service";
import { Hello } from "../hello-service/hello-service";
import { Crud } from "../crud-service/crud-service";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Home from "./Home";
import User from "./User";
import { ChatLog } from "./ChatLog";

class App extends React.Component {
  render() {
    return (
      <Home>
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
      </Home>
    );
  }
  componentWillReceiveProps(nextProps) {}
}

export const Admin = ({}) => {
  return <p>Admin Page</p>;
};

ReactDOM.render(<App />, document.getElementById("app"));
