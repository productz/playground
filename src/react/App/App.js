import React from "react";
import ReactDOM from "react-dom";
import {
  Router,
  Route,
  IndexRoute,
  Link,
  hashHistory,
  browserHistory
} from "react-router";
import AuthService from "../auth-service/auth-service";

class App extends React.Component {
  render() {
    return (
      <div>
        <AuthService />
      </div>
    );
  }
  componentWillReceiveProps(nextProps) {}
}

ReactDOM.render(<App />, document.getElementById("app"));
