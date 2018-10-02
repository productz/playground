import React, { Children } from "react";
import PropTypes from "prop-types";
import { Routes, routeList } from "../Routes/Routes";
import {
  Container,
  Drawer,
  Content,
  H1,
  H2,
  H3,
  Text,
  Header,
  List,
  ListItem
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
    const { anchorEl } = this.state;
    const isAnchor = Boolean(anchorEl);
    let route = routeList.find(({ name, url }) => {
      return url.indexOf(match.path.replace("/", "/")) !== -1;
    });
    return (
      <React.Fragment>
        <div className={classes.root}>
          <Header
            position="absolute"
            className={classNames(
              classes.appBar,
              this.state.open && classes.appBarShift
            )}
          >
            <Text>Home</Text>
          </Header>
          <Drawer
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
            <Container>{children}</Container>
          </Drawer>
        </div>
      </React.Fragment>
    );
  }
}

MainWrapper.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(MainWrapper);
