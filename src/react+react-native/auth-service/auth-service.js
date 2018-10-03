import { observer } from "mobx-react";
import { observable } from "mobx";
import React from "react";
import { SERVER } from "../config";
import axios from "axios";

//export store
export class authDomainStore {
  token;
  @observable
  user;
  isLoggedIn = false;
  offlineStorage;
  rootStore;
  constructor(rootStore, offlineStorage) {
    //set the local storage mechanism
    //could be async storage
    this.rootStore = rootStore;
    if (offlineStorage) {
      this.offlineStorage = offlineStorage;
    }
  }
  logout() {
    return this.clearToken();
  }
  login(values) {
    return new Promise((resolve, reject) => {
      return axios
        .post(`${SERVER.host}:${SERVER.port}/auth`, values)
        .then(res => {
          this.user = res.data;
          this.isLoggedIn = true;
          this.storeToken(this.user.jwtToken);
          return resolve(res.data);
        })
        .catch(err => {
          return reject(err);
        });
    });
  }
  register(values) {
    return new Promise((resolve, reject) => {
      return axios
        .post(`${SERVER.host}:${SERVER.port}/auth/register`, values)
        .then(res => {
          this.user = res.data;
          this.isLoggedIn = true;
          this.storeToken(this.user.jwtToken);
          return resolve(res.data);
        })
        .catch(err => {
          this.isLoggedIn = false;
          return reject(err);
        });
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
    if (jwtToken) {
      return this.offlineStorage.setItem("jwtToken", jwtToken);
    }
  }
  clearToken() {
    return this.offlineStorage.removeItem("jwtToken");
  }
  isAuthenticated() {
    return this.offlineStorage.getItem("jwtToken").then(token => {
      return axios
        .post(`${SERVER.host}:${SERVER.port}/jwt`, {
          token
        })
        .then(res => {
          this.isLoggedIn = true;
          return res;
        })
        .catch(err => {
          this.isLoggedIn = false;
          return err;
        });
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
  ({ children, authUiStore, authDomainStore }) => {
    let decoratedLogin = React.Children.map(children, child =>
      React.cloneElement(child, {
        onChange: (field, value) => {
          authUiStore[field] = value;
        },
        onSubmit: values => {
          return authDomainStore.login(values);
        },
        onProviderAuth: providerName => {
          authDomainStore.loginWithProvider(providerName);
        },
        ...child.props
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
        },
        ...child.props
      })
    );
    return <React.Fragment>{decoratedRegister}</React.Fragment>;
  }
);
