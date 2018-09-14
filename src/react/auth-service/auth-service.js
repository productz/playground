import { observer } from "mobx-react";
import MaterialLogin from "./MaterialLogin";
import MaterialRegister from "./MaterialLogin";
import { observable } from "mobx";
import React from "react";

//export store
export class AuthDomain {
  token;
  constructor(token) {
    this.token = token;
  }
  storeToken() {}
  getToken() {}
}

export class AuthUI {
  @observable
  username;
  @observable
  password;
}

//somehow we have to load stuff from an api
export const api = {
  googleAuth: "",
  facebookAuth: "",
  twitterAuth: ""
};

//create the UI and Domain Stores
let authUI = new AuthUI();

//determine the theme here and load the right login information?
export const Login = observer(({}) => {
  return (
    <div>
      <MaterialLogin
        onChange={(field, value) => {
          authUI[field] = value;
        }}
        onSubmit={() => console.log(authUI.username, authUI.password)}
        onProviderAuth={providerName => {
          window.location.replace(`http://localhost:8080/auth/${providerName}`);
        }}
      />
    </div>
  );
});

export const Register = observer(({}) => {
  return (
    <div>
      <MaterialLogin
        onChange={(field, value) => {
          authUI[field] = value;
        }}
        onSubmit={() => console.log(authUI.username, authUI.password)}
        onProviderAuth={providerName => {
          window.location.replace(`http://localhost:8080/auth/${providerName}`);
        }}
      />
    </div>
  );
});