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
  getModel(modelName, refresh) {
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
    let { modelName, children, adminDomainStore, crudComponent } = this.props;
    if (modelName) {
      adminDomainStore.getModel(modelName, false);
    }
    console.log("rerender admin service");
    const childrenWithProps = React.Children.map(children, child => {
      return React.cloneElement(child, {
        model: adminDomainStore.mapStore.get(modelName),
        getModel: () => adminDomainStore.getModel(modelName, true),
        createModel: model => adminDomainStore.createModel(modelName, model),
        updateModel: (model, updateValues) =>
          adminDomainStore.updateModel(modelName, model, updateValues),
        deleteModel: model => adminDomainStore.deleteModel(modelName, model),
        setModelEdit: (model, isEditing) =>
          adminDomainStore.setModelEdit(modelName, model, isEditing),
        isEditing: adminDomainStore.isEditing.get(modelName),
        editedModel: adminDomainStore.editedModel.get(modelName),
        ...this.props,
        ...child.props
      });
    });
    return <React.Fragment>{childrenWithProps}</React.Fragment>;
  }
}
