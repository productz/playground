import React, { Children } from "react";
import PropTypes from "prop-types";
import { Container, Header, Text } from "native-base";

const styles = theme => ({});

class LoginWrapper extends React.Component {
  render() {
    const { classes, children, backgroundImage, title } = this.props;
    return (
      <React.Fragment>
        <Header>
          <Text>{title}</Text>
        </Header>
        <Container
          style={{
            backgroundImage: `url(${backgroundImage})`,
            backgroundRepeat: "no-repeat",
            height: "100%",
            width: "100%",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            objectFit: "cover"
          }}
        >
          {children}
        </Container>
      </React.Fragment>
    );
  }
}

LoginWrapper.propTypes = {
  classes: PropTypes.object.isRequired
};

export default LoginWrapper;
