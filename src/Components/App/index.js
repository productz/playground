import React, { Component } from "react";
import { connect } from "react-redux";
import { FETCH_DATA } from "../../types";
import { Grid, Col, Row } from "react-styled-flexboxgrid";
import ArtCard from "../ArtCard";
import { ThemeProvider } from "styled-components";
import { theme } from "../../theme";

const mapStateToProps = state => {
  return {
    artList: state
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
    let { artList } = this.props;
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
              {artList.map(art => (
                <Col xs={6} md={3}>
                  <ArtCard
                    artistName={art.artistName}
                    artTitle={art.title}
                    artKey={art.artKey}
                  />
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
