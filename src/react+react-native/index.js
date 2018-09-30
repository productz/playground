import {
  LoginWithAuth,
  RegisterWithAuth,
  PrivateRoute,
  authDomainStore,
  authUiStore
} from "./auth-service/auth-service";
import { Crud, crudDomainStore } from "./crud-service/crud-service";
import { Socket, socketDomainStore } from "./socket-srevice/socket-service";
import { Admin, adminDomainStore } from "./admin-service/admin-service";

export {
  LoginWithAuth,
  RegisterWithAuth,
  PrivateRoute,
  authDomainStore,
  authUiStore,
  Crud,
  crudDomainStore,
  Socket,
  socketDomainStore,
  Admin,
  adminDomainStore
};
