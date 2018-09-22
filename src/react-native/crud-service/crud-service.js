import { observer } from "mobx-react";
import { observable, action, runInAction } from "mobx";
import React from "react";
import axios from "axios";
import { SERVER } from "../config";
import { Spinner, Text } from "native-base";

//export store
export class CrudDomain {
  modelName;
  @observable
  isLoading;
  @observable
  store = {};
  constructor() {}
  @action
  getModel(modelName) {
    this.isLoading = true;
    //cached data, you don't have to hit up he end point
    if (this.store[modelName]) {
      this.isLoading = false;
      return this.store[modelName];
    }
    return axios
      .get(`${SERVER.host}:${SERVER.port}/${this.modelName}`)
      .then(res => {
        runInAction(() => {
          this.isLoading = false;
          this.store[modelName] = res.data;
        });
      })
      .catch(err => {
        runInAction(() => {
          this.isLoading = false;
        });
      });
  }
  @action
  createModel(model) {
    this.loading = true;
    return axios
      .post(`${SERVER.host}:${SERVER.port}/${this.modelName}`, model)
      .then(res => {
        this.isLoading = false;
        return res.data;
      })
      .catch(err => {
        this.isLoading = false;
        return err;
      });
  }
  @action
  updateModel(model) {
    return axios
      .update(`${SERVER.host}:${SERVER.port}/${this.modelName}`, model)
      .then(res => {
        this.isLoading = false;
        return res.data;
      })
      .catch(err => {
        this.isLoading = false;
        return err;
      });
  }
  @action
  deleteModel(model) {
    return axios
      .delete(`${SERVER.host}:${SERVER.port}/${this.modelName}`, model)
      .then(res => {
        this.isLoading = false;
        return res.data;
      })
      .catch(err => {
        this.isLoading = false;
        return err;
      });
  }
  @action
  searchModel(query) {
    return axios
      .post(`${SERVER.host}:${SERVER.port}/${this.modelName}`, query)
      .then(res => {
        this.isLoading = false;
        return res.data;
      })
      .catch(err => {
        this.isLoading = false;
        return err;
      });
  }
}

//create the UI and Domain Stores
let crudDomain = new CrudDomain();

//determine the theme here and load the right login information?
export const Crud = observer(({ modelName, children, render }) => {
  crudDomain.modelName = modelName;
  crudDomain.getModel(modelName);
  return (
    <React.Fragment>
      {crudDomain.store[modelName] ? <Text /> : <Spinner />}
      {render({
        model: crudDomain.store[modelName],
        getModel: crudDomain.getModel,
        createModel: crudDomain.createModel,
        updateModel: crudDomain.updateModel,
        deleteModel: crudDomain.deleteModel
      })}
    </React.Fragment>
  );
});
