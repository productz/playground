import { observer } from "mobx-react";
import { observable, action, runInAction, toJS } from "mobx";
import React from "react";
import axios from "axios";
import { SERVER } from "../config";

//export store
export class mediaDomainStore {
  rootStore;
  files = observable.map();
  constructor(rootStore) {
    this.rootStore = rootStore;
  }
  @action
  getImages(refresh) {
    //cached data, you don't have to hit up he end point
    // console.log(this.schemas.length);
    if (this.schemas.get("schemas") && !refresh) {
      return;
    }
    return axios
      .get(`${SERVER.host}:${SERVER.port}/schemas`)
      .then(res => {
        runInAction(() => {
          let schemas = Object.keys(res.data).map(key => {
            let nameObject = {
              modelName: key
            };
            let schemas = {
              ...nameObject,
              ...res.data[key]
            };
            return schemas;
          });
          this.schemas.set("schemas", schemas);
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
export class Media extends React.Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {}
  componentWillReceiveProps(nextProps) {}
  componentDidUpdate() {}
  render() {
    let { children, mediaDomainStore, CrudComponent } = this.props;
    mediaDomainStore.getSchemas(false);
    const childrenWithProps = React.Children.map(children, child => {
      return React.cloneElement(child, {
        schemas: mediaDomainStore.schemas.get("schemas"),
        ...child.props
      });
    });
    return <React.Fragment>{childrenWithProps}</React.Fragment>;
  }
}

export class FormWithSchema extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    //turn this into yup and formik as well with validations
  }
}
