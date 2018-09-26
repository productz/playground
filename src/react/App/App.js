import React from "react";
import ReactDOM from "react-dom";
import {
  HashRouter as Router,
  Route,
  Switch,
  Redirect
} from "react-router-dom";
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
import NotFound from "./NotFound/NotFound";
import Home from "./Home/Home";
import Chat from "./Chat/Chat";
import Store from "./Store/Store";
import { observer } from "mobx-react";

let rootStore = new Store({
  authDomainStore,
  authUiStore,
  crudDomainStore
});

class App extends React.Component {
  state = {
    isLoggedIn: false
  };
  componentDidMount(props) {
    rootStore.authDomainStore.isAuthenticated().then(res => {
      if (res.status === 200) {
        this.setState({ isLoggedIn: true });
      }
    });
  }
  render() {
    return (
      <Router>
        <Switch>
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
          <Route
            path="/admin"
            exact
            render={props =>
              rootStore.authDomainStore.isLoggedIn ? (
                <MainWrapper>
                  <Admin />
                </MainWrapper>
              ) : (
                <Redirect
                  to={{
                    pathname:
                      "/auth/login?message='please login to view this page'",
                    state: { from: props.location }
                  }}
                />
              )
            }
          />
          <Route
            path="/chat"
            exact
            render={props =>
              rootStore.authDomainStore.isLoggedIn ? (
                <MainWrapper>
                  <Crud
                    modelName="chat"
                    crudDomainStore={rootStore.crudDomainStore}
                  >
                    <Chat />
                  </Crud>
                </MainWrapper>
              ) : (
                <Redirect
                  to={{
                    pathname:
                      "/auth/login?message='please login to view this page'",
                    state: { from: props.location }
                  }}
                />
              )
            }
          />
          <Route
            path="/user"
            exact
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
          <Route path="*" component={NotFound} />
        </Switch>
      </Router>
    );
  }
  componentWillReceiveProps(nextProps) {}
}

ReactDOM.render(<App />, document.getElementById("app"));
