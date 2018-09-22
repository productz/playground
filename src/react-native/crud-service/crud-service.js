import { observer } from "mobx-react";
import { observable, action, runInAction } from "mobx";
import React from "react";
import axios from "axios";
import { SERVER } from "../config";

//export store
export class CrudDomain {
  modelName;
  @observable
  loadingState = {};
  @observable
  store = {};
  mapStore = observable.map();
  constructor() {}
  @action
  getModel(modelName, refresh) {
    this.loadingState["isLoading"] = true;
    //cached data, you don't have to hit up he end point
    if (this.mapStore.get(modelName) && !refresh) {
      this.loadingState["isLoading"] = false;
      return;
    }
    return axios
      .get(`${SERVER.host}:${SERVER.port}/${modelName}`)
      .then(res => {
        runInAction(() => {
          this.loadingState["isLoading"] = false;
          this.mapStore.set(modelName, res.data);
          this.store[modelName] = res.data;
        });
      })
      .catch(err => {
        runInAction(() => {
          this.loadingState["isLoading"] = false;
        });
      });
  }
  @action
  createModel(modelName, model) {
    this.loadingState["isLoading"] = true;
    return axios
      .post(`${SERVER.host}:${SERVER.port}/${modelName}`, model)
      .then(res => {
        runInAction(() => {
          this.loadingState["isLoading"] = false;
          this.store[modelName].push(res.data);
          let current = this.mapStore.get(modelName);
          this.mapStore.set(modelName, [...current, res.data]);
        });
        return res.data;
      })
      .catch(err => {
        runInAction(() => {
          this.loadingState["isLoading"] = false;
        });
        return err;
      });
  }
  @action
  updateModel(modelName, model) {
    return axios
      .update(`${SERVER.host}:${SERVER.port}/${modelName}`, model)
      .then(res => {
        this.loadingState = { isLoading: false };
        return res.data;
      })
      .catch(err => {
        this.loadingState = { isLoading: false };
        return err;
      });
  }
  @action
  deleteModel(modelName, model) {
    return axios
      .delete(`${SERVER.host}:${SERVER.port}/${modelName}`, model)
      .then(res => {
        this.loadingState = { isLoading: false };
        return res.data;
      })
      .catch(err => {
        this.loadingState = { isLoading: false };
        return err;
      });
  }
  @action
  searchModel(modelName, query) {
    return axios
      .post(`${SERVER.host}:${SERVER.port}/${modelName}`, query)
      .then(res => {
        this.loadingState = { isLoading: false };
        return res.data;
      })
      .catch(err => {
        this.loadingState = { isLoading: false };
        return err;
      });
  }
}

//create the UI and Domain Stores
let crudDomain = new CrudDomain();

//determine the theme here and load the right login information?
@observer
export default class Crud extends React.Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {}
  componentWillReceiveProps(nextProps) {}
  componentDidUpdate() {}
  render() {
    let { modelName, children } = this.props;
    if (modelName) {
      crudDomain.getModel(modelName, false);
    }
    crudDomain.mapStore.get(modelName);
    const childrenWithProps = React.Children.map(children, child =>
      React.cloneElement(child, {
        model: crudDomain.mapStore.get(modelName),
        getModel: () => crudDomain.getModel(modelName, true),
        createModel: model => crudDomain.createModel(modelName, model),
        updateModel: crudDomain.updateModel,
        deleteModel: crudDomain.deleteModel,
        isLoading: crudDomain.loadingState
      })
    );
    return <React.Fragment>{childrenWithProps}</React.Fragment>;
  }
}
