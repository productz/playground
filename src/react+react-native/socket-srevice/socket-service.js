import { observer } from "mobx-react";
import { observable, action, runInAction, toJS } from "mobx";
import React from "react";
import axios from "axios";
import { SERVER } from "../config";

//export store
export class socketDomainStore {
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
  createModel(modelName, model) {
    return axios
      .post(`${SERVER.host}:${SERVER.port}/${modelName}`, model)
      .then(res => {
        runInAction(() => {
          let current = mapStore.get(modelName);
          this.mapStore.set(modelName, [...current, res.data]);
        });
        return res.data;
      })
      .catch(err => {
        runInAction(() => {});
        return err;
      });
  }
  @action
  updateModel(modelName, model, updateValues) {
    let extractedModel = toJS(model);
    Object.keys(updateValues).map(key => {
      model[key] = updateValues[key];
    });
    return axios
      .put(`${SERVER.host}:${SERVER.port}/${modelName}`, model)
      .then(res => {
        let updatedModel = this.mapStore
          .get(modelName)
          .map(cModel => (cModel._id === model._id ? model : cModel));
        this.mapStore.set(modelName, updatedModel);
        return res.data;
      })
      .catch(err => {
        return err;
      });
  }
  @action
  deleteModel(modelName, model) {
    model.deleted = true;
    return axios
      .delete(`${SERVER.host}:${SERVER.port}/${modelName}/${model._id}`)
      .then(res => {
        let notDeleted = this.mapStore.get(modelName).filter(cModel => {
          return !cModel.deleted;
        });
        this.mapStore.set(modelName, notDeleted);
        return res.data;
      })
      .catch(err => {
        return err;
      });
  }
  @action
  searchModel(modelName, query) {
    return axios
      .post(`${SERVER.host}:${SERVER.port}/${modelName}`, query)
      .then(res => {
        return res.data;
      })
      .catch(err => {
        return err;
      });
  }
  @action
  setModelEdit(modelName, model, isEdit) {
    let { editedModel, isEditing } = this.rootStore.socketDomainStore;
    editedModel.set(modelName, model);
    isEditing.set(modelName, isEdit);
  }
}

//determine the theme here and load the right login information?
@observer
export class Socket extends React.Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {}
  componentWillReceiveProps(nextProps) {}
  componentDidUpdate() {}
  render() {
    let { modelName, children, socketDomainStore } = this.props;
    if (modelName) {
      socketDomainStore.getModel(modelName, false);
    }
    console.log("rerender socket service");
    socketDomainStore.mapStore.get(modelName);
    const childrenWithProps = React.Children.map(children, child => {
      return React.cloneElement(child, {
        model: socketDomainStore.mapStore.get(modelName),
        getModel: () => socketDomainStore.getModel(modelName, true),
        createModel: model => socketDomainStore.createModel(modelName, model),
        updateModel: (model, updateValues) =>
          socketDomainStore.updateModel(modelName, model, updateValues),
        deleteModel: model => socketDomainStore.deleteModel(modelName, model),
        setModelEdit: (model, isEditing) =>
          socketDomainStore.setModelEdit(modelName, model, isEditing),
        isEditing: socketDomainStore.isEditing.get(modelName),
        editedModel: socketDomainStore.editedModel.get(modelName),
        ...child.props
      });
    });
    return <React.Fragment>{childrenWithProps}</React.Fragment>;
  }
}
