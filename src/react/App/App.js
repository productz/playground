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
  authDomainStore,
  authUiStore,
  Crud,
  crudDomainStore,
  Socket,
  socketDomainStore,
  Admin,
  adminDomainStore
} from "../../react+react-native/index";
import MainWrapper from "./Wrappers/MainWrapper";
import User from "./User/User";
import Login from "./Login/MaterialLogin";
import Register from "./Register/MaterialRegister";
import AdminPage from "./Admin/Admin";
import NotFound from "./NotFound/NotFound";
import Home from "./Home/Home";
import Chat from "./Chat/Chat";
import Store from "./Store/Store";
import { observer } from "mobx-react";
import LoginWrapper from "./Wrappers/LoginWrapper";
import loginBG from "./Login/login-bg.jpg";
import registerBG from "./Register/register-bg.jpg";

let rootStore = new Store({
  authDomainStore,
  authUiStore,
  crudDomainStore,
  socketDomainStore,
  adminDomainStore
});

class App extends React.Component {
  state = {
    isLoggedIn: true
  };
  componentWillReceiveProps(nextProps) {}
  componentDidMount(props) {
    rootStore.authDomainStore.isAuthenticated().then(res => {
      console.log(res);
      if (res.status !== 200) {
        this.setState({ isLoggedIn: false });
      } else {
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
                <LoginWrapper backgroundImage={loginBG}>
                  <LoginWithAuth
                    onRegister={() => history.push("/auth/register")}
                    authUiStore={rootStore.authUiStore}
                    authDomainStore={rootStore.authDomainStore}
                  >
                    <Login
                      location={location}
                      history={history}
                      match={match}
                    />
                  </LoginWithAuth>
                </LoginWrapper>
              );
            }}
          />
          <Route
            path="/auth/register"
            render={props => {
              return (
                <LoginWrapper backgroundImage={registerBG}>
                  <RegisterWithAuth
                    authDomainStore={rootStore.authDomainStore}
                    authUiStore={rootStore.authUiStore}
                  >
                    <Register />
                  </RegisterWithAuth>
                </LoginWrapper>
              );
            }}
          />
          <Route
            path="/"
            exact
            render={({ location, history, match }) => {
              return (
                <MainWrapper
                  location={location}
                  match={match}
                  history={history}
                >
                  <Home />
                </MainWrapper>
              );
            }}
          />
          <Route
            path="/admin"
            render={({ location, history, match }) =>
              this.state.isLoggedIn ? (
                <MainWrapper
                  location={location}
                  match={match}
                  history={history}
                >
                  <Admin adminDomainStore={rootStore.adminDomainStore}>
                    <AdminPage
                      crudDomainStore={rootStore.crudDomainStore}
                      location={location}
                      match={match}
                      history={history}
                    />
                  </Admin>
                </MainWrapper>
              ) : (
                <Redirect
                  to={{
                    pathname:
                      "/auth/login?message='please login to view this page'",
                    state: { from: location }
                  }}
                />
              )
            }
          />
          <Route
            path="/chat"
            exact
            render={({ location, history, match }) =>
              this.state.isLoggedIn ? (
                <MainWrapper
                  location={location}
                  match={match}
                  history={history}
                >
                  <Crud
                    modelName="chat-log"
                    crudDomainStore={rootStore.crudDomainStore}
                  >
                    <Socket
                      channel="chat"
                      socketDomainStore={rootStore.socketDomainStore}
                    >
                      <Chat />
                    </Socket>
                  </Crud>
                </MainWrapper>
              ) : (
                <Redirect
                  to={{
                    pathname:
                      "/auth/login?message='please login to view this page'",
                    state: { from: location }
                  }}
                />
              )
            }
          />
          <Route
            path="/user"
            render={({ location, match, history }) => {
              return (
                <MainWrapper
                  location={location}
                  match={match}
                  history={history}
                >
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
          <Route
            path="*"
            render={({ location, match, history }) => {
              return (
                <MainWrapper
                  location={location}
                  match={match}
                  history={history}
                >
                  <NotFound />
                </MainWrapper>
              );
            }}
          />
        </Switch>
      </Router>
    );
  }
  componentWillReceiveProps(nextProps) {}
}

ReactDOM.render(<App />, document.getElementById("app"));
