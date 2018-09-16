import { observer } from "mobx-react";
import { observable } from "mobx";
import React from "react";
import axios from "axios";

//export store
export class CrudDomain {
  modelName;
  @observable
  model;
  constructor() {}
  getModel() {
    if (this.model) {
      return this.model;
    }
    return axios.get(`http://localhost:8080/${this.modelName}`).then(res => {
      this.model = res.data;
    });
  }
  saveModel(model) {
    return axios.post(`http://localhost:8080/${this.modelName}`);
  }
  updateModel(model) {
    return axios.update(`http://localhost:8080/${this.modelName}`);
  }
  deleteModel(model) {
    return axios.delete(`http://localhost:8080/${this.modelName}`);
  }
}

export class CrudUI {
  @observable
  name;
}

//create the UI and Domain Stores
let crudUI = new CrudUI();
let crudDomain = new CrudDomain();

//determine the theme here and load the right login information?
export const Crud = observer(({ modelName, children }) => {
  crudDomain.modelName = modelName;
  crudDomain.getModel(modelName);
  return (
    <div>
      {modelName}
      {"-------------------------"}
      <div>
        {crudDomain.model &&
          crudDomain.model.map(item => {
            return <p>{item.name}</p>;
          })}
      </div>
      {children}
    </div>
  );
});
