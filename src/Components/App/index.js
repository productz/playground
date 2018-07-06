import React, { Component } from "react";
import { connect } from "react-redux";
import { FETCH_DATA } from "../../types";
import { Grid, Col, Row } from "react-styled-flexboxgrid";
import ArtCard from "../ArtCard";
import { ThemeProvider } from "styled-components";
import { theme } from "../../theme";
import styled from "styled-components";

const mapStateToProps = state => {
  return {
    artList: state.art,
    error: state.errors
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

let Error = styled.p`
  color: ${theme.colors.error};
`;

class App extends Component {
  componentDidMount() {
    this.props.fetchData();
  }
  render() {
    let { artList, error } = this.props;
    return (
      <ThemeProvider theme={theme}>
        <div className="App">
          <header className="App-header">
            <h1 className="App-title">
              Dillon Sample Project (by Sam Alghanmi)
            </h1>
          </header>
          <Error>{error.message}</Error>
          <Grid>
            <Row>
              {artList.map(art => (
                <Col key={art.titleId} xs={6} md={3}>
                  <ArtCard
                    id={art.titleId}
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
