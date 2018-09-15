import { observer } from "mobx-react";
import MaterialLogin from "./MaterialLogin";
import MaterialRegister from "./MaterialRegister";
import { observable } from "mobx";
import queryString from "query-string";
import React from "react";
import { HashRouter as Router, Route, Link, Redirect } from "react-router-dom";
import axios from "axios";

//export store
export class AuthDomain {
  token;
  isLoggedIn = false;
  constructor() {}
  login(values) {
    return new Promise((resolve, reject) => {
      resolve("");
    });
  }
  register(values) {}
  loginWithProvider(providerName) {
    window.location.replace(`http://localhost:8080/auth/${providerName}`);
  }
  registerWithProvider(providerName) {
    //information to register
    window.location.replace(`http://localhost:8080/auth/${providerName}`);
  }
  storeToken() {
    let jwtToken = queryString.parse(location.search).jwt;
    if (jwtToken) {
      localStorage.setItem("jwtToken", jwtToken);
    }
  }
  isAuthenticated() {
    return axios
      .post("http://localhost:8080/jwt/is-auth", {
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
export const Login = observer(({ onRegister }) => {
  return (
    <div>
      <MaterialLogin
        onChange={(field, value) => {
          authUI[field] = value;
        }}
        onRegister={onRegister}
        onSubmit={() => {
          return authDomain.login(authUI);
        }}
        onProviderAuth={providerName => {
          authDomain.loginWithProvider(providerName);
        }}
      />
    </div>
  );
});

export const Register = observer(({}) => {
  return (
    <div>
      <MaterialRegister
        onChange={(field, value) => {
          authUI[field] = value;
        }}
        onSubmit={() => authDomain.register(authUI)}
        onProviderAuth={providerName => {
          authDomain.registerWithProvider(providerName);
        }}
      />
    </div>
  );
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
