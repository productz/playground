import { observer } from "mobx-react";
import { observable } from "mobx";
import queryString from "query-string";
import React from "react";
import { HashRouter as Router, Route, Link, Redirect } from "react-router-dom";
import { SERVER } from "../config";
import axios from "axios";

//export store
export class authDomainStore {
  token;
  @observable
  user;
  isLoggedIn = false;
  localStorage;
  rootStore;
  constructor(rootStore, localStorage) {
    //set the local storage mechanism
    //could be async storage
    this.rootStore = rootStore;
    if (localStorage) {
      this.localStorage = localStorage;
    }
  }
  login(values) {
    let { user, isLoggedIn, storeToken } = this.rootStore.authDomainStore;
    return axios
      .post(`${SERVER.host}:${SERVER.port}/auth`, values)
      .then(res => {
        // runInAction(() => {
        //   user = res.data;
        //   isLoggedIn = true;
        // });
        user = res.data;
        isLoggedIn = true;
        storeToken(user.jwtToken);
        return res.data;
      })
      .catch(err => {
        // runInAction(() => {
        //   isLoggedIn = false;
        // });
        return err;
      });
  }
  register(values) {
    let { user, isLoggedIn, storeToken } = this.rootStore.authDomainStore;
    return axios
      .post(`${SERVER.host}:${SERVER.port}/auth/register`, values)
      .then(res => {
        runInAction(() => {
          user = res.data;
          isLoggedIn = true;
        });
        return res.data;
      })
      .catch(err => {
        runInAction(() => {
          isLoggedIn = false;
        });
        return err;
      });
  }
  loginWithProvider(providerName) {
    window.location.replace(
      `${SERVER.host}:${SERVER.port}/auth/${providerName}`
    );
  }
  registerWithProvider(providerName) {
    //information to register
    window.location.replace(
      `${SERVER.host}:${SERVER.port}/auth/${providerName}`
    );
  }
  storeToken(jwtToken) {
    let { localStorage } = this.rootStore.authDomainStore;
    if (!jwtToken) {
      jwtToken = queryString.parse(location.search).jwt;
    }
    if (jwtToken) {
      localStorage.setItem("jwtToken", jwtToken);
    }
  }
  isAuthenticated() {
    let { user, isLoggedIn, storeToken } = this.rootStore.authDomainStore;
    return axios
      .post(`${SERVER.host}:${SERVER.port}/jwt/is-auth`, {
        token: localStorage.getItem("jwtToken")
      })
      .then(res => {
        isLoggedIn = true;
        return res;
      })
      .catch(err => {
        isLoggedIn = false;
        return err;
      });
  }
}

export class authUiStore {
  @observable
  username;
  @observable
  password;
  @observable
  email;
  @observable
  firstname;
  @observable
  lastname;
  constructor(rootStore) {
    this.rootStore = rootStore;
  }
}

//somehow we have to load stuff from an api
export const api = {
  googleAuth: "",
  facebookAuth: "",
  twitterAuth: ""
};

//determine the theme here and load the right login information?
export const LoginWithAuth = observer(
  ({ onRegister, children, authUiStore, authDomainStore }) => {
    let decoratedLogin = React.Children.map(children, child =>
      React.cloneElement(child, {
        onChange: (field, value) => {
          authUiStore[field] = value;
        },
        onRegister: () => onRegister(),
        onSubmit: values => {
          return authDomainStore.login(values);
        },
        onProviderAuth: providerName => {
          authDomainStore.loginWithProvider(providerName);
        }
      })
    );
    return <React.Fragment>{decoratedLogin}</React.Fragment>;
  }
);

export const RegisterWithAuth = observer(
  ({ children, authUiStore, authDomainStore }) => {
    let decoratedRegister = React.Children.map(children, child =>
      React.cloneElement(children, {
        onChange: (field, value) => {
          authUiStore[field] = value;
        },
        onSubmit: values => {
          return authDomainStore.register(values);
        },
        onProviderAuth: providerName => {
          authDomainStore.loginWithProvider(providerName);
        }
      })
    );
    return <React.Fragment>{decoratedRegister}</React.Fragment>;
  }
);

export const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      authDomainStore.isLoggedIn ? (
        <Component {...props} />
      ) : (
        <Redirect
          to={{
            pathname: "/auth/login?message='please login to view this page'",
            state: { from: props.location }
          }}
        />
      )
    }
  />
);
