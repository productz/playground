import { observer } from "mobx-react";
import { observable } from "mobx";
import React from "react";
import { Route, Redirect } from "react-router-native";
import { SERVER } from "../config";
import axios from "axios";
import queryString from "query-string";
import { AsyncStorage } from "react-native";

//export store
export class AuthDomain {
  token;
  isLoggedIn = false;
  constructor() {}
  async getItem(key) {
    try {
      return await AsyncStorage.getItem(key);
    } catch (error) {
      // Error saving data
    }
  }
  async setItem(key, value) {
    try {
      await AsyncStorage.setItem(key, value);
    } catch (error) {
      // Error saving data
    }
  }
  login(values) {
    return new Promise((resolve, reject) => {
      resolve("");
    });
  }
  register(values) {}
  loginWithProvider(providerName) {
    //I need to open a webview and then get the response somehow from it
    // history.replace(`${SERVER.host}:${SERVER.port}/auth/${providerName}`);
  }
  registerWithProvider(providerName) {
    //information to register
    // history.replace(`${SERVER.host}:${SERVER.port}/auth/${providerName}`);
  }
  storeToken() {
    // let jwtToken = queryString.parse(location.search).jwt;
    // if (jwtToken) {
    //   localStorage.setItem("jwtToken", jwtToken);
    // }
  }
  isAuthenticated() {
    return axios
      .post(`${SERVER.host}:${SERVER.port}/jwt/is-auth`)
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
  confirmPassword;
  @observable
  gender;
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
      onSubmit: () => {
        return authDomain.login(authUI);
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
      onSubmit: () => {
        return authDomain.register(authUI);
      },
      onProviderAuth: providerName => {
        authDomain.loginWithProvider(providerName);
      },
      gender: authUI.gender
    })
  );
  return <React.Fragment>{decoratedRegister}</React.Fragment>;
});
