import { observer } from "mobx-react";
import { observable } from "mobx";
import React from "react";
import axios from "axios";

//export store
export class HelloDomain {
  constructor() {}
}

export class HelloUI {
  @observable
  name;
}

//create the UI and Domain Stores
let helloUI = new HelloUI();
let helloDomain = new HelloDomain();

//determine the theme here and load the right login information?
export const Hello = observer(({}) => {
  return <div>Hello Is working</div>;
});
