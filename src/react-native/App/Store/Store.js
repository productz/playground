import { AsyncStorage } from "react-native";

export default class RootStore {
  constructor({ authUiStore, authDomainStore, crudDomainStore }) {
    this.authUiStore = new authUiStore(this);
    this.authDomainStore = new authDomainStore(this, AsyncStorage);
    this.crudDomainStore = new crudDomainStore(this);
    this.authDomainStore.storeToken();
    this.authDomainStore.isAuthenticated();
  }
}
