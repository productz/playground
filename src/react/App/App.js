import React from "react";
import ReactDOM from "react-dom";
import { HashRouter as Router, Route, Link } from "react-router-dom";
import { Login, Register } from "../auth-service/auth-service";

class App extends React.Component {
  render() {
    return (
      <div>
        <Router>
          <div>
            <ul>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/auth/login">Login</Link>
              </li>
              <li>
                <Link to="/auth/register">Register</Link>
              </li>
            </ul>
            <Route exact path="/" component={Home} />
            <Route path="/auth/login" component={Login} />
            <Route path="/auth/register" component={Register} />
          </div>
        </Router>
      </div>
    );
  }
  componentWillReceiveProps(nextProps) {}
}

export const Home = ({}) => {
  return <p>hello</p>;
};

ReactDOM.render(<App />, document.getElementById("app"));
