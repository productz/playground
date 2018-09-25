import React from "react";
import ReactDOM from "react-dom";
import { HashRouter as Router, Route } from "react-router-dom";
import {
  LoginWithAuth,
  RegisterWithAuth,
  PrivateRoute,
  authDomainStore,
  authUiStore
} from "../auth-service/auth-service";
import { Crud, crudDomainStore } from "../crud-service/crud-service";
import Home from "./Home";
import User from "./User/User";
import { ChatLog } from "./ChatLog";
import Login from "./Login/MaterialLogin";
import Register from "./Register/MaterialRegister";
import Store from "./Store/Store";

let rootStore = new Store({
  authDomainStore,
  authUiStore,
  crudDomainStore
});

class App extends React.Component {
  componentDidMount(props) {}
  render() {
    return (
      <Home>
        <Router>
          <div>
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
            <PrivateRoute path="/admin" component={Admin} />
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
