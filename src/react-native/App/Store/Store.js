import { AsyncStorage } from "react-native"

export default class RootStore {
  constructor({
    authUiStore,
    authDomainStore,
    crudDomainStore,
    socketDomainStore,
    adminDomainStore,
    mediaDomainStore
  }) {
    this.authUiStore = new authUiStore(this);
    this.authDomainStore = new authDomainStore(this, AsyncStorage);
    this.crudDomainStore = new crudDomainStore(this, AsyncStorage);
    this.socketDomainStore = new socketDomainStore(this);
    this.adminDomainStore = new adminDomainStore(this);
    this.mediaDomainStore = new mediaDomainStore(this);
    this.authDomainStore.storeToken();
    this.authDomainStore.isAuthenticated();
  }
}
