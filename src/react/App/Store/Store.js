export default class RootStore {
  constructor({ authUiStore, authDomainStore, crudDomainStore }) {
    this.authUiStore = new authUiStore(this);
    this.authDomainStore = new authDomainStore(this, localStorage);
    this.crudDomainStore = new crudDomainStore(this);
    this.authDomainStore.storeToken();
    this.authDomainStore.isAuthenticated();
  }
}
