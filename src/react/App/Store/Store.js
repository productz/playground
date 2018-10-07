//add localStorage
import { SERVER } from "../../config";
import queryString from "query-string";

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
    mediaDomainStore,
    formsDomainStore
  }) {
    this.authUiStore = new authUiStore(this);
    this.authDomainStore = new authDomainStore(this, offlineStorage, SERVER);
    this.crudDomainStore = new crudDomainStore(this, offlineStorage, SERVER);
    this.socketDomainStore = new socketDomainStore(this, SERVER);
    this.adminDomainStore = new adminDomainStore(this, SERVER);
    this.mediaDomainStore = new mediaDomainStore(this, SERVER);
    this.formsDomainStore = new formsDomainStore(this, offlineStorage, SERVER);
    //get jwt token if it's in the route
    const jwtToken = queryString.parse(location.search).jwt;
    this.authDomainStore.storeToken(jwtToken);
    this.authDomainStore.isAuthenticated();
  }
}
