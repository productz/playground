import React, { Component } from "react";
import logo from "./logo.svg";
import { connect } from "react-redux";
import { FETCH_DATA } from "../../types";
import "./App.css";
import { Grid, Col, Row } from "react-styled-flexboxgrid";
import { IMAGE_API } from "../../constants";

const mapStateToProps = state => {
  return {
    artists: state
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchData: () =>
      dispatch({
        type: FETCH_DATA
      })
  };
};

class App extends Component {
  componentDidMount() {
    this.props.fetchData();
  }
  render() {
    let { artists } = this.props;
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Dillon Sample Project (by Sam Alghanmi)</h1>
        </header>
        <Grid>
          <Row>
            {artists.map(artist => (
              <Col xs={6} md={3}>
                <img src={IMAGE_API(artist.artKey)} />
                <h1>{artist.title}</h1>
                <h2>{artist.artistName}</h2>
              </Col>
            ))}
          </Row>
        </Grid>
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
