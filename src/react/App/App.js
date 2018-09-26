import React from "react";
import ReactDOM from "react-dom";
import { HashRouter as Router, Route } from "react-router-dom";
import {
  LoginWithAuth,
  RegisterWithAuth,
  PrivateRoute,
  authDomainStore,
  authUiStore,
  Crud,
  crudDomainStore
} from "../../react+react-native";
import MainWrapper from "./Wrappers/MainWrapper";
import User from "./User/User";
import Login from "./Login/MaterialLogin";
import Register from "./Register/MaterialRegister";
import Admin from "./Admin/Admin";
import Home from "./Home/Home";
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
      <Router>
        <div>
          <Route
            path="/auth/login"
            render={({ location, history, match }) => {
              return (
                <LoginWithAuth
                  onRegister={() => props.history.push("/auth/register")}
                  authUiStore={rootStore.authUiStore}
                  authDomainStore={rootStore.authDomainStore}
                >
                  <Login location={location} history={history} match={match} />
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
          <Route
            path="/"
            exact
            render={props => {
              return (
                <MainWrapper>
                  <Home />
                </MainWrapper>
              );
            }}
          />
          <PrivateRoute
            path="/admin"
            render={props => {
              return (
                <MainWrapper>
                  <Admin />
                </MainWrapper>
              );
            }}
            authDomainStore={rootStore.authDomainStore}
          />
          <Route
            path="/user"
            render={({ location, match, history }) => {
              return (
                <MainWrapper>
                  <Crud
                    modelName="user"
                    crudDomainStore={rootStore.crudDomainStore}
                  >
                    <User location={location} match={match} history={history} />
                  </Crud>
                </MainWrapper>
              );
            }}
          />
        </div>
      </Router>
    );
  }
  componentWillReceiveProps(nextProps) {}
}

ReactDOM.render(<App />, document.getElementById("app"));
