import { observer } from "mobx-react";
import { observable, action, runInAction, toJS } from "mobx";
import React from "react";
import axios from "axios";
import { SERVER } from "../config";

//export store
export class adminDomainStore {
  modelName;
  isEditing = observable.map();
  mapStore = observable.map();
  searchResults = observable.map();
  editedModel = observable.map();
  rootStore;
  constructor(rootStore) {
    this.rootStore = rootStore;
  }
  @action
  getModels(modelName, refresh) {
    //cached data, you don't have to hit up he end point
    if (this.mapStore.get(modelName) && !refresh) {
      return;
    }
    return axios
      .get(`${SERVER.host}:${SERVER.port}/${modelName}`)
      .then(res => {
        runInAction(() => {
          this.mapStore.set(modelName, res.data);
        });
      })
      .catch(err => {
        runInAction(() => {});
      });
  }
  @action
  setError(err) {
    console.error(err);
  }
}

//this creates crud components with Modal Editing
@observer
export class Admin extends React.Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {}
  componentWillReceiveProps(nextProps) {}
  componentDidUpdate() {}
  render() {
    let { children, adminDomainStore, crudComponent } = this.props;
    adminDomainStore.getModel(modelName, false);
    const childrenWithProps = React.Children.map(children, child => {
      return React.cloneElement(child, {
        models: adminDomainStore.mapStore.get(modelName),
        getModels: () => adminDomainStore.getModel(modelName, true)
      });
    });
    return <React.Fragment>{childrenWithProps}</React.Fragment>;
  }
}
