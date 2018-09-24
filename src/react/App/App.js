import React from "react";
import ReactDOM from "react-dom";
import { HashRouter as Router, Route } from "react-router-dom";
import { Login, Register, PrivateRoute } from "../auth-service/auth-service";
import { Crud } from "../../react+react-native/crud-service/crud-service";
import Home from "./Home";
import User from "./User/User";
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
                return (
                  <Crud modelName="user">
                    <User />
                  </Crud>
                );
              }}
            />
            <Route
              path="/chat-log"
              render={props => {
                return (
                  <Crud>
                    <ChatLog />
                  </Crud>
                );
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
