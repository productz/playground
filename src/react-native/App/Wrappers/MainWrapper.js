import React, { Children } from "react";
import PropTypes from "prop-types";
import { Routes, routeList } from "../Routes/Routes";
import {
  Drawer,
  H1,
  H2,
  H3,
  Text,
  Header,
  List,
  ListItem,
  Container,
  Title,
  Button,
  Left,
  Content,
  Right,
  Body,
  Icon,
  Tab,
  Tabs,
  Footer,
  FooterTab
} from "native-base";

class MainWrapper extends React.Component {
  drawer;
  state = {
    open: true
  };

  closeDrawer = () => {
    this.drawer._root.close();
  };
  openDrawer = () => {
    this.drawer._root.open();
  };

  render() {
    const {
      classes,
      children,
      location,
      match,
      history,
      auth,
      user,
      logo,
      hasPadding
    } = this.props;
    let route = routeList.find(({ name, url }) => {
      return url.indexOf(match.path.replace("/", "/")) !== -1;
    });
    return (
      <React.Fragment>
        <Container>
          <Header>
            <Text>Home</Text>
          </Header>
          {/* <Drawer
            variant="permanent"
            open={this.state.open}
            ref={ref => {
              this.drawer = ref;
            }}
            content={
              <List>
                <Routes />
              </List>
            }
          >
          </Drawer> */}
          <Content>{children}</Content>
          <Footer>
            <FooterTab>
              <Routes onPress={(route)=>{
                history.push(route.url);
              }} />
            </FooterTab>
          </Footer>
        </Container>
      </React.Fragment>
    );
  }
}

MainWrapper.propTypes = {};

export default MainWrapper;
