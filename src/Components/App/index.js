import React, { Component } from "react";
import { connect } from "react-redux";
import { FETCH_DATA } from "../../types";
import "./App.css";
import { Grid, Col, Row } from "react-styled-flexboxgrid";
import { ThemeProvider } from "styled-components";
import { theme } from "../../theme";
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
      <ThemeProvider theme={theme}>
        <div className="App">
          <header className="App-header">
            <h1 className="App-title">
              Dillon Sample Project (by Sam Alghanmi)
            </h1>
          </header>
          <Grid>
            <Row>
              {artists.map(artist => (
                <Col xs={6} md={3}>
                  <div className="card">
                    <div className="card__image__container">
                      <img src={IMAGE_API(artist.artKey)} />
                    </div>
                    <div className="card__description">
                      <p className="card__title">{artist.title}</p>
                      <p className="card__artist"><i>{artist.artistName}</i></p>
                    </div>
                  </div>
                </Col>
              ))}
            </Row>
          </Grid>
        </div>
      </ThemeProvider>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
