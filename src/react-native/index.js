"use strict";
const React = require("react");
const ReactNative = require("react-native");
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
  Tabs
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
        <Container>
          <Header>
            <Left>
              <Button transparent>
                <Icon name="menu" />
              </Button>
            </Left>
            <Body>
              <Title>Home</Title>
            </Body>
            <Right>
              <Button>
                <Text>Move</Text>
              </Button>
            </Right>
          </Header>
          <Content>
            <Text>
              <Icon type="FontAwesome" name="home" />
            </Text>
          </Content>
          <Tabs>
            <Tab heading="All">
              <App />
            </Tab>
          </Tabs>
        </Container>
      );
    }
  }
);

AppRegistry.registerComponent("playground", () => NativeApp);
