"use strict";
const React = require("react");
const ReactNative = require("react-native");
import {
  Text,
  AppRegistry
} from "react-native";

import {
  Container,
  Header,
  Title,
  Button,
  Left,
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
              <Button>
                {/* <Icon name="ios-add" /> */}
                <Text>Add</Text>
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
