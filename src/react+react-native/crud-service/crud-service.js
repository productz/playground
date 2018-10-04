import { observer } from "mobx-react";
import { observable, action, runInAction, toJS } from "mobx";
import React from "react";
import axios from "axios";

//export store
export class crudDomainStore {
  modelName;
  isEditing = observable.map();
  mapStore = observable.map();
  searchResults = observable.map();
  editedModel = observable.map();
  rootStore;
  SERVER;
  offlineStorage;
  constructor(rootStore, offlineStorage, SERVER) {
    this.rootStore = rootStore;
    if (offlineStorage) {
      this.offlineStorage = offlineStorage;
    }
    this.SERVER = SERVER;
  }
  @action
  getModel(modelName, refresh) {
    //cached data, you don't have to hit up he end point
    if (this.mapStore.get(modelName) && !refresh) {
      return;
    }
    return this.offlineStorage.getItem("jwtToken").then(token => {
      return axios
        .get(`${this.SERVER.host}:${this.SERVER.port}/${modelName}`, {
          params: { token }
        })
        .then(res => {
          runInAction(() => {
            this.mapStore.set(modelName, res.data);
          });
        })
        .catch(err => {
          runInAction(() => {});
        });
    });
  }
  @action
  createModel(modelName, model) {
    return this.offlineStorage.getItem("jwtToken").then(token => {
      return axios
        .post(`${this.SERVER.host}:${this.SERVER.port}/${modelName}`, {
          model,
          token
        })
        .then(res => {
          let current = this.mapStore.get(modelName);
          this.mapStore.set(modelName, [...current, res.data]);
          return res.data;
        })
        .catch(err => {
          return this.setError(err);
        });
    });
  }
  @action
  updateModel(modelName, model, updateValues) {
    let extractedModel = toJS(model);
    Object.keys(updateValues).map(key => {
      model[key] = updateValues[key];
    });

    return this.offlineStorage.getItem("jwtToken").then(token => {
      return axios
        .put(`${this.SERVER.host}:${this.SERVER.port}/${modelName}`, {
          model,
          token
        })
        .then(res => {
          let updatedModel = this.mapStore
            .get(modelName)
            .map(cModel => (cModel._id === model._id ? model : cModel));
          this.mapStore.set(modelName, updatedModel);
          return res.data;
        })
        .catch(err => {
          return this.setError(err);
        });
    });
  }
  @action
  deleteModel(modelName, model) {
    model.deleted = true;
    return this.offlineStorage.getItem("jwtToken").then(token => {
      return axios
        .delete(
          `${this.SERVER.host}:${this.SERVER.port}/${modelName}/${model._id}`,
          {
            params: { token }
          }
        )
        .then(res => {
          let notDeleted = this.mapStore.get(modelName).filter(cModel => {
            return !cModel.deleted;
          });
          this.mapStore.set(modelName, notDeleted);
          return res.data;
        })
        .catch(err => {
          return this.setError(err);
        });
    });
  }
  @action
  searchModel(modelName, query) {
    return axios
      .post(`${this.SERVER.host}:${this.SERVER.port}/${modelName}`, query)
      .then(res => {
        return res.data;
      })
      .catch(err => {
        return this.setError(err);
      });
  }
  @action
  setModelEdit(modelName, model, isEdit) {
    let { editedModel, isEditing } = this.rootStore.crudDomainStore;
    editedModel.set(modelName, model);
    isEditing.set(modelName, isEdit);
  }
  @action
  setError(err) {
    console.error(err);
  }
}

//determine the theme here and load the right login information?
@observer
export class Crud extends React.Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {}
  componentWillReceiveProps(nextProps) {}
  componentDidUpdate() {}
  render() {
    let { modelName, children, crudDomainStore } = this.props;
    if (modelName) {
      crudDomainStore.getModel(modelName, false);
    }
    console.log("rerender crud service");
    const childrenWithProps = React.Children.map(children, child => {
      return React.cloneElement(child, {
        model: crudDomainStore.mapStore.get(modelName),
        getModel: () => crudDomainStore.getModel(modelName, true),
        createModel: model => crudDomainStore.createModel(modelName, model),
        updateModel: (model, updateValues) =>
          crudDomainStore.updateModel(modelName, model, updateValues),
        deleteModel: model => crudDomainStore.deleteModel(modelName, model),
        setModelEdit: (model, isEditing) =>
          crudDomainStore.setModelEdit(modelName, model, isEditing),
        isEditing: crudDomainStore.isEditing.get(modelName),
        editedModel: crudDomainStore.editedModel.get(modelName),
        ...this.props,
        ...child.props
      });
    });
    return <React.Fragment>{childrenWithProps}</React.Fragment>;
  }
}
