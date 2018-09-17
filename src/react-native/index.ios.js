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

import { ScreenshotOrganizer, Folder, Screenshot } from "./Store";

import App from "./App/App.js";

let ScreenshotOrganizerStore = new ScreenshotOrganizer();

const ScreenshotOrganizerApp = observer(
  class ScreenshotOrganizerApp extends React.Component {
    constructor(props) {
      super(props);
    }

    render() {
      return (
        <Container>
          <Modal
            visible={ScreenshotOrganizerStore.photoPreviewOpen}
            animationType={"slide"}
            onRequestClose={() => {
              ScreenshotOrganizerStore.photoPreviewOpen = false;
            }}
          >
            <Container>
              <Header>
                <Left>
                  <Button
                    onPress={() =>
                      (ScreenshotOrganizerStore.photoPreviewOpen = false)
                    }
                    light
                    transparent
                  >
                    <Icon name="close" style={{ color: "black" }} />
                  </Button>
                </Left>
                <Body>
                  <Title>Preview</Title>
                </Body>
                <Right />
              </Header>
              {ScreenshotOrganizerStore.previewedImage.asset ? (
                <Image
                  resizeMode="contain"
                  style={{
                    position: "absolute",
                    top: 100,
                    left: 0,
                    bottom: 0,
                    right: 0
                  }}
                  source={{
                    uri: ScreenshotOrganizerStore.previewedImage.asset.uri
                  }}
                />
              ) : (
                <Text>Nothing to preview</Text>
              )}
            </Container>
          </Modal>
          <MoveModal
            modalVisible={ScreenshotOrganizerStore.modalVisible}
            toggleModal={() => {
              ScreenshotOrganizerStore.toggleModalVisible();
            }}
            folderNames={ScreenshotOrganizerStore.folderList.map(
              folder => folder.title
            )}
            onSubmit={folder => {
              console.log(folder);
            }}
          />
          <Header>
            <Left>
              <Button
                onPress={() =>
                  AlertIOS.prompt("New Folder", null, text =>
                    ScreenshotOrganizerStore.addFolder(text)
                  )
                }
                transparent
              >
                <Icon name="ios-add" />
              </Button>
            </Left>
            <Body>
              <Title>Home</Title>
            </Body>
            <Right>
              <Button
                onPress={() => ScreenshotOrganizerStore.toggleModalVisible()}
                transparent
              >
                <Text>Move</Text>
              </Button>
            </Right>
          </Header>
          <Tabs>
            <Tab heading="All">
              <App
                store={ScreenshotOrganizerStore}
                mediaList={ScreenshotOrganizerStore.mediaList}
                onSelectionChanged={(media, index, selected) => {
                  ScreenshotOrganizerStore.selectScreenshot(
                    media,
                    index,
                    selected
                  );
                }}
                onOpenModal={media => {
                  ScreenshotOrganizerStore.photoPreviewOpen = true;
                  ScreenshotOrganizerStore.previewedImage = media;
                }}
                modalVisible={ScreenshotOrganizerStore.photoPreviewOpen}
              />
            </Tab>
          </Tabs>
        </Container>
      );
    }
  }
);

AppRegistry.registerComponent("playground-native", () => NavigatorIOSApp);
