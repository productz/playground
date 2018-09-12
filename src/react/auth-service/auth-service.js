import { observer } from "mobx-react";

//export store
export class AuthStore {
  date;
  title;
  amount;
  category;
  constructor(date, amount, category, title) {
    this.date = date;
    this.amount = amount;
    this.category = category;
    this.title = title;
  }
  storeToken() {}
  getToken() {}
}

//somehow we have to load stuff from an api
export const api = {
  googleAuth: "",
  facebookAuth: "",
  twitterAuth: ""
};

export const AuthService = observer(({}) => {
  return <p>Auth</p>;
});