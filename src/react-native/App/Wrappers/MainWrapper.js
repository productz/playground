import React, { Children } from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import { Routes, routeList } from "../Routes/Routes";
import {
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
  state = {
    open: true,
    menuOpen: false,
    anchorEl: null
  };

  handleDrawerOpen = () => {
    this.setState({ open: true });
  };

  handleDrawerClose = () => {
    this.setState({ open: false });
  };

  handleMenu = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleMenuClose = () => {
    this.setState({ anchorEl: null });
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
    const { anchorEl, menuOpen, open } = this.state;
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
            <Toolbar
              disableGutters={!this.state.open}
              className={classes.toolbar}
            >
              <img src={logo} width="50px" height="auto" />
              <IconButton
                color="inherit"
                aria-label="Open drawer"
                onClick={this.handleDrawerOpen}
                className={classNames(
                  classes.menuButton,
                  this.state.open && classes.menuButtonHidden
                )}
              >
                <MenuIcon />
              </IconButton>
              <Text
                variant="title"
                color="inherit"
                noWrap
                className={classes.title}
              >
                {route && route.name}
              </Text>
              <IconButton color="inherit">
                <Badge badgeContent={4} color="secondary">
                  <NotificationsIcon />
                </Badge>
              </IconButton>
              {auth && (
                <div>
                  <Tooltip title={user.name}>
                    <IconButton
                      aria-owns={isAnchor ? "menu-appbar" : null}
                      aria-haspopup="true"
                      onClick={this.handleMenu}
                      color="inherit"
                    >
                      <AccountCircle />
                    </IconButton>
                  </Tooltip>
                  <Menu
                    id="menu-appbar"
                    anchorEl={anchorEl}
                    anchorOrigin={{
                      vertical: "bottom",
                      horizontal: "left"
                    }}
                    transformOrigin={{
                      vertical: "top",
                      horizontal: "right"
                    }}
                    open={isAnchor}
                    onClose={this.handleMenuClose}
                  >
                    <MenuItem onClick={this.handleMenuClose}>Profile</MenuItem>
                    <MenuItem onClick={this.handleMenuClose}>
                      My account
                    </MenuItem>
                    <MenuItem
                      onClick={event => {
                        this.handleMenuClose(event);
                        history.push("/auth/login");
                      }}
                    >
                      Log out
                    </MenuItem>
                  </Menu>
                </div>
              )}
            </Toolbar>
          </Header>
          <Drawer
            variant="permanent"
            classes={{
              paper: classNames(
                classes.drawerPaper,
                !this.state.open && classes.drawerPaperClose
              )
            }}
            open={this.state.open}
          >
            <div className={classes.toolbarIcon}>
              <IconButton onClick={this.handleDrawerClose}>
                <ChevronLeftIcon />
              </IconButton>
            </div>
            <Divider />
            <List>{Routes}</List>
          </Drawer>
          <main className={hasPadding ? classes.hasPadding : classes.content}>
            <div className={classes.appBarSpacer} />
            {children}
          </main>
        </div>
      </React.Fragment>
    );
  }
}

MainWrapper.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(MainWrapper);
