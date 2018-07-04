import React, { Component } from "react";
import logo from "./logo.svg";
import { connect } from 'react-redux'
import "./App.css";

const mapStateToProps = state => {
  console.log(state);
  return {
    artists: state
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchData: () =>
      dispatch({
        type: 'FETCH_DATA'
      })
  }
}

class App extends Component {
  componentDidMount(){
    this.props.fetchData();
  }
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
