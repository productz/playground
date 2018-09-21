"use strict";
const React = require("react");
const ReactNative = require("react-native");
import { Link, NativeRouter as Router } from "react-router-native";
import { AppRegistry } from "react-native";
import {
  Container,
  Header,
  Title,
  Button,
  Left,
  Content,
  Text,
  Right,
  Body,
  Icon,
  Tab,
  Tabs,
  Footer,
  FooterTab
} from "native-base";

import { observer } from "mobx-react/native";

import App from "./App/App.js";

const NativeApp = observer(
  class NativeApp extends React.Component {
    constructor(props) {
      super(props);
    }
    render() {
      return (
        <Router>
          <Container>
            <Header>
              <Left>
                {/* <Button transparent>
                  <Icon type="FontAwesome" name="bars" />
                </Button> */}
              </Left>
              <Body>
                <Title>Playground</Title>
              </Body>
              <Right />
            </Header>
            <Content>
              <App />
            </Content>
            <Footer>
              <FooterTab>
                <Button active>
                  <Link to="/">
                    <Text>Home</Text>
                  </Link>
                </Button>
                <Button>
                  <Link to="/auth/login">
                    <Text>Login</Text>
                  </Link>
                </Button>
                <Button>
                  <Link to="/auth/register">
                    <Text>Register</Text>
                  </Link>
                </Button>
                <Button>
                  <Link to="/user">
                    <Text>Users</Text>
                  </Link>
                </Button>
              </FooterTab>
            </Footer>
          </Container>
        </Router>
      );
    }
  }
);

AppRegistry.registerComponent("playground", () => NativeApp);
