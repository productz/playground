import { observer } from "mobx-react";
import { observable, action, runInAction, toJS } from "mobx";
import React from "react";
import axios from "axios";
import { SERVER } from "../config";

//export store
export class CrudDomain {
  modelName;
  @observable
  store = {};
  isEditing = observable.map();
  mapStore = observable.map();
  searchResults = observable.map();
  constructor() {}
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
          this.store[modelName] = res.data;
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
          this.store[modelName].push(res.data);
          let current = this.mapStore.get(modelName);
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
  updateModel(modelName, model) {
    return axios
      .update(`${SERVER.host}:${SERVER.port}/${modelName}`, model)
      .then(res => {
        this.mapStore.set(modelName, [...current, res.data]);
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
      .delete(`${SERVER.host}:${SERVER.port}/${modelName}`, model)
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
  setModelEdit(modelName, isEditing) {
    this.isEditing.set(modelName, isEditing);
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
        updateModel: model => crudDomain.updateModel(modelName, model),
        deleteModel: model => crudDomain.deleteModel(modelName, model),
        setModelEdit: isEditing =>
          crudDomain.setModelEdit(modelName, isEditing),
        isEditing: crudDomain.isEditing.get(modelName)
      })
    );
    return <React.Fragment>{childrenWithProps}</React.Fragment>;
  }
}
