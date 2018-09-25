import { observer } from "mobx-react";
import { observable } from "mobx";
import queryString from "query-string";
import React from "react";
import { HashRouter as Router, Route, Link, Redirect } from "react-router-dom";
import { SERVER } from "../config";
import axios from "axios";

//export store
export class AuthDomain {
  token;
  @observable
  user;
  isLoggedIn = false;
  constructor() {}
  login(values) {
    return axios
      .post(`${SERVER.host}:${SERVER.port}/auth`, values)
      .then(res => {
        // runInAction(() => {
        //   this.user = res.data;
        //   this.isLoggedIn = true;
        // });
        this.user = res.data;
        this.isLoggedIn = true;
        this.storeToken(this.user.jwtToken);
        return res.data;
      })
      .catch(err => {
        // runInAction(() => {
        //   this.isLoggedIn = false;
        // });
        return err;
      });
  }
  register(values) {
    return axios
      .post(`${SERVER.host}:${SERVER.port}/auth/register`, values)
      .then(res => {
        runInAction(() => {
          this.user = res.data;
          this.isLoggedIn = true;
        });
        return res.data;
      })
      .catch(err => {
        runInAction(() => {
          this.isLoggedIn = false;
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
    if (!jwtToken) {
      jwtToken = queryString.parse(location.search).jwt;
    }
    if (jwtToken) {
      localStorage.setItem("jwtToken", jwtToken);
    }
  }
  isAuthenticated() {
    return axios
      .post(`${SERVER.host}:${SERVER.port}/jwt/is-auth`, {
        token: localStorage.getItem("jwtToken")
      })
      .then(res => {
        this.isLoggedIn = true;
        return res;
      })
      .catch(err => {
        this.isLoggedIn = false;
        return err;
      });
  }
}

export class AuthUI {
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
}

//somehow we have to load stuff from an api
export const api = {
  googleAuth: "",
  facebookAuth: "",
  twitterAuth: ""
};

//create the UI and Domain Stores
let authUI = new AuthUI();
let authDomain = new AuthDomain();
authDomain.storeToken();
authDomain.isAuthenticated();

//determine the theme here and load the right login information?
export const LoginWithAuth = observer(({ onRegister, children }) => {
  let decoratedLogin = React.Children.map(children, child =>
    React.cloneElement(child, {
      onChange: (field, value) => {
        authUI[field] = value;
      },
      onRegister: () => onRegister(),
      onSubmit: values => {
        return authDomain.login(values);
      },
      onProviderAuth: providerName => {
        authDomain.loginWithProvider(providerName);
      }
    })
  );
  return <React.Fragment>{decoratedLogin}</React.Fragment>;
});

export const RegisterWithAuth = observer(({ children }) => {
  let decoratedRegister = React.Children.map(children, child =>
    React.cloneElement(children, {
      onChange: (field, value) => {
        authUI[field] = value;
      },
      onSubmit: values => {
        return authDomain.register(values);
      },
      onProviderAuth: providerName => {
        authDomain.loginWithProvider(providerName);
      }
    })
  );
  return <React.Fragment>{decoratedRegister}</React.Fragment>;
});

export const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      authDomain.isLoggedIn ? (
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
