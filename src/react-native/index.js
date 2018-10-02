"use strict";
const React = require("react");
const ReactNative = require("react-native");
import { AppRegistry } from "react-native";
import { observer } from "mobx-react/native";

import App from "./App/App.js";

const NativeApp = observer(
  class NativeApp extends React.Component {
    constructor(props) {
      super(props);
    }
    render() {
      return <App />;
    }
  }
);

AppRegistry.registerComponent("playground", () => NativeApp);
