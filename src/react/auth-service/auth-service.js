import { observer } from "mobx-react";
import MaterialLogin from "./MaterialLogin";
import MaterialRegister from "./MaterialLogin";
import { observable } from "mobx";

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

//determine the theme here and load the right login information?
export const AuthService = observer(({ theme }) => {
  return (
    <>
      <MaterialLogin />
    </>
  );
});
