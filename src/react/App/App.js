import React from "react";
import ReactDOM from "react-dom";
import { HashRouter as Router, Route, Link } from "react-router-dom";
import { Login, Register, PrivateRoute } from "../auth-service/auth-service";
import { Hello } from "../hello-service/hello-service";
import { Crud } from "../crud-service/crud-service";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";

class App extends React.Component {
  render() {
    return (
      <div>
        <Router>
          <div>
            <ul>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/auth/login">Login</Link>
              </li>
              <li>
                <Link to="/auth/register">Register</Link>
              </li>
              <li>
                <Link to="/admin">Admin</Link>
              </li>
              <li>
                <Link to="/user">User</Link>
              </li>
              <li>
                <Link to="/chat-log">Chat log</Link>
              </li>
            </ul>
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
            <Route exact path="/" component={Home} />
          </div>
        </Router>
      </div>
    );
  }
  componentWillReceiveProps(nextProps) {}
}

export const Home = ({}) => {
  return <p>hello</p>;
};

export const Admin = ({}) => {
  return <p>Admin Page</p>;
};

export const User = ({}) => {
  return (
    <Crud
      modelName="user"
      render={({ model, creatModel }) => {
        let users = model;
        if (users) {
          let usersView = users.map(user => {
            return (
              <Grid xs={12} item>
                {user.name}
              </Grid>
            );
          });
          return (
            <Grid container>
              <Paper>{usersView}</Paper>
            </Grid>
          );
        }
      }}
    />
  );
};

export const ChatLog = ({}) => {
  return (
    <Crud
      modelName="chat-log"
      render={({ model }) => {
        let chatLogs = model;
        if (chatLogs) {
          return chatLogs.map(chatLog => {
            return <p>chatLog.name</p>;
          });
        }
      }}
    />
  );
};

ReactDOM.render(<App />, document.getElementById("app"));
