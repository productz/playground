//add localStorage
import { SERVER } from "../../config";
let offlineStorage = {
  setItem: (key, value) => {
    return new Promise((resolve, reject) => {
      localStorage.setItem(key, value);
      resolve({ key, value });
    });
  },
  getItem: key => {
    return new Promise((resolve, reject) => {
      resolve(localStorage.getItem(key));
    });
  },
  removeItem: key => {
    return new Promise((resolve, reject) => {
      resolve(localStorage.removeItem(key));
    });
  }
};

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
    this.authDomainStore = new authDomainStore(this, offlineStorage, SERVER);
    this.crudDomainStore = new crudDomainStore(this, offlineStorage, SERVER);
    this.socketDomainStore = new socketDomainStore(this, SERVER);
    this.adminDomainStore = new adminDomainStore(this, SERVER);
    this.mediaDomainStore = new mediaDomainStore(this, SERVER);
    this.authDomainStore.storeToken();
    this.authDomainStore.isAuthenticated();
  }
}
