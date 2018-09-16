import React from "react";
import ReactDOM from "react-dom";
import { HashRouter as Router, Route, Link } from "react-router-dom";
import { Login, Register, PrivateRoute } from "../auth-service/auth-service";
import { Hello } from "../hello-service/hello-service";
import { Crud } from "../crud-service/crud-service";

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
                return (
                  <Crud
                    modelName="user"
                  />
                );
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

ReactDOM.render(<App />, document.getElementById("app"));
