import React from "react";
import PropTypes from "prop-types";
import {
  Text,
  Card,
  CardItem,
  Form,
  Item,
  Input,
  Label,
  Button,
  Body
} from "native-base";
import { Image } from "react-native";

function Home(props) {
  const { logo } = props;
  return (
    <React.Fragment>
      {/* Hero unit */}
      <Container>
        <Image src={logo} />
        <Text
          variant="display3"
          align="center"
          color="textPrimary"
          gutterBottom
        >
          Welcome to Markab!
        </Text>
        <Text variant="title" align="center" color="textSecondary" paragraph>
          Markab is a tool that helps you create other systems. We use best
          practices from the industry to create modular and beautiful web and
          mobile apps.
        </Text>
      </Container>
    </React.Fragment>
  );
}

Home.propTypes = {
  classes: PropTypes.object.isRequired
};

export default Home;
