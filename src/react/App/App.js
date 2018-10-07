import React from "react";
import {
  HashRouter as Router,
  Route,
  Switch,
  Redirect,
  withRouter
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
  adminDomainStore,
  Media,
  mediaDomainStore,
  Forms,
  formsDomainStore
} from "./react+react-native/";
import MainWrapper from "./Wrappers/MainWrapper";
import User from "./User/User";
import Login from "./Login/MaterialLogin";
import Register from "./Register/MaterialRegister";
import AdminPage from "./Admin/Admin";
import NotFound from "./NotFound/NotFound";
import Home from "./Home/Home";
import Chat from "./Chat/Chat";
import House from "./House/House";
import Settings from "./Settings/Settings";
import Store from "./Store/Store";
import { withNamespaces, NamespacesConsumer, Trans } from "react-i18next";
import i18n from "./i18n/i18n";
import { observer } from "mobx-react";
import LoginWrapper from "./Wrappers/LoginWrapper";
import loginBG from "./Login/login-bg.jpg";
import registerBG from "./Register/register-bg.jpg";
import logoAlt from "./Assets/logos/module-logo-alt.svg";
import logo from "./Assets/logos/module-just-logo.svg";
import clouds from "./Assets/css/clouds.css";

let rootStore = new Store({
  authDomainStore,
  authUiStore,
  crudDomainStore,
  socketDomainStore,
  adminDomainStore,
  mediaDomainStore,
  formsDomainStore
});

class App extends React.Component {
  state = {
    isLoggedIn: true,
    currentUser: {}
  };
  componentWillReceiveProps(nextProps) {}
  componentDidUpdate(prevProps) {
    if (this.props.location !== prevProps.location) {
      this.onRouteChanged();
    }
  }
  onRouteChanged() {
    rootStore.authDomainStore.isAuthenticated().then(res => {
      if (res.status !== 200) {
        this.setState({ isLoggedIn: false });
      } else {
        this.setState({ isLoggedIn: true, currentUser: res.data });
      }
    });
  }
  componentDidMount(props) {
    rootStore.authDomainStore.isAuthenticated().then(res => {
      if (res.status !== 200) {
        this.setState({ isLoggedIn: false });
      } else {
        this.setState({ isLoggedIn: true, currentUser: res.data });
      }
    });
  }
  onLogout() {
    rootStore.authDomainStore.logout();
  }
  render() {
    return (
      <Switch>
        <Route
          path="/auth/login"
          render={({ location, history, match }) => {
            return (
              <LoginWrapper backgroundImage={loginBG}>
                <LoginWithAuth
                  authUiStore={rootStore.authUiStore}
                  authDomainStore={rootStore.authDomainStore}
                >
                  <Login
                    onRegister={() => history.push("/auth/register")}
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
          render={({ location, history, match }) => {
            return (
              <LoginWrapper backgroundImage={registerBG}>
                <RegisterWithAuth
                  authDomainStore={rootStore.authDomainStore}
                  authUiStore={rootStore.authUiStore}
                >
                  <Register
                    onLogin={() => history.push("/auth/login")}
                    location={location}
                    history={history}
                    match={match}
                  />
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
                auth={this.state.isLoggedIn}
                user={this.state.currentUser}
                logo={logo}
                onLogout={this.onLogout}
              >
                <Home
                  title={`Welcome ${
                    this.state.currentUser && this.state.currentUser.name
                      ? ", " + this.state.currentUser.name + "!"
                      : "!"
                  }`}
                  user={this.state.currentUser}
                  isLoggedIn={this.state.isLoggedIn}
                  onSignUp={() => history.push("/auth/register")}
                  onDashboard={() => history.push("/house")}
                  logo={logoAlt}
                />
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
                auth={this.state.isLoggedIn}
                user={this.state.currentUser}
                logo={logo}
                hasPadding={true}
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
                auth={this.state.isLoggedIn}
                user={this.state.currentUser}
                logo={logo}
                hasPadding={true}
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
          path="/settings"
          exact
          render={({ location, history, match }) =>
            this.state.isLoggedIn ? (
              <MainWrapper
                location={location}
                match={match}
                history={history}
                auth={this.state.isLoggedIn}
                user={this.state.currentUser}
                logo={logo}
                hasPadding={true}
              >
                <Crud
                  modelName="settings"
                  crudDomainStore={rootStore.crudDomainStore}
                >
                  <Media>
                    <Settings />
                  </Media>
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
          path="/house"
          render={({ location, match, history }) => {
            return (
              <MainWrapper
                location={location}
                match={match}
                history={history}
                auth={this.state.isLoggedIn}
                user={this.state.currentUser}
                logo={logo}
                hasPadding={true}
              >
                <Crud
                  modelName="house"
                  crudDomainStore={rootStore.crudDomainStore}
                >
                  <House location={location} match={match} history={history} />
                </Crud>
              </MainWrapper>
            );
          }}
        />
        <Route
          path="/user"
          render={({ location, match, history }) => {
            return (
              <MainWrapper
                location={location}
                match={match}
                history={history}
                auth={this.state.isLoggedIn}
                user={this.state.currentUser}
                logo={logo}
                hasPadding={true}
              >
                <Crud
                  modelName="user"
                  crudDomainStore={rootStore.crudDomainStore}
                >
                  <User
                    formsDomainStore={rootStore.formsDomainStore}
                    location={location}
                    match={match}
                    history={history}
                  />
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
                auth={this.state.isLoggedIn}
                user={this.state.currentUser}
                logo={logo}
                hasPadding={true}
              >
                <NotFound />
              </MainWrapper>
            );
          }}
        />
      </Switch>
    );
  }
  componentWillReceiveProps(nextProps) {}
}

export default withRouter(App);
