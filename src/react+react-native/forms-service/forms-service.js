import { observer } from "mobx-react";
import { observable, action, runInAction, toJS } from "mobx";
import React from "react";
import axios from "axios";

//export store
export class formsDomainStore {
  modelName;
  mapStore = observable.map();
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
        .get(`${this.SERVER.host}:${this.SERVER.port}/${modelName}/forms`, {
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
  setError(err) {
    console.error(err);
  }
}

//determine the theme here and load the right login information?
@observer
export class Forms extends React.Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {}
  componentWillReceiveProps(nextProps) {}
  componentDidUpdate() {}
  render() {
    let { modelName, children, formsDomainStore } = this.props;
    if (modelName) {
      formsDomainStore.getModel(modelName, false);
    }
    console.log("rerender crud service");
    const childrenWithProps = React.Children.map(children, child => {
      return React.cloneElement(child, {
        form: formsDomainStore.mapStore.get(modelName),
        getModel: () => formsDomainStore.getModel(modelName, true),
        ...this.props,
        ...child.props
      });
    });
    return <React.Fragment>{childrenWithProps}</React.Fragment>;
  }
}
