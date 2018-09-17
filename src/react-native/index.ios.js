"use strict";
const React = require("react");
const ReactNative = require("react-native");
import {
  CameraRoll,
  Image,
  Slider,
  StyleSheet,
  Switch,
  Text,
  View,
  TouchableOpacity,
  AppRegistry,
  Navigator,
  Modal,
  TouchableHighlight,
  Alert,
  AlertIOS,
  PickerIOS,
  TextInput,
  NavigatorIOS
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
  Tabs,
  Footer,
  FooterTab
} from "native-base";

import { observer } from "mobx-react/native";

import App from "./App/App.js";

const IOSApp = observer(
  class IOSApp extends React.Component {
    constructor(props) {
      super(props);
    }

    render() {
      return (
        <Container>
          <Header>
            <Left>
              <Button>
                <Icon name="ios-add" />
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

AppRegistry.registerComponent("playground-react-native", () => IOSApp);
