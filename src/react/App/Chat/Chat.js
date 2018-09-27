import React from "react";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import TextField from "@material-ui/core/TextField";
import { withStyles } from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
import Button from "@material-ui/core/Button";
import { fade } from "@material-ui/core/styles/colorManipulator";
import Input from "@material-ui/core/Input";
import CircularProgress from "@material-ui/core/CircularProgress";
import { Route, Link } from "react-router-dom";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import SearchIcon from "@material-ui/icons/Search";
import { toJS, isObservableObject } from "mobx";

const styles = theme => ({
  root: {
    width: "100%"
  },
  grow: {
    flexGrow: 1
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20
  },
  title: {
    display: "none",
    [theme.breakpoints.up("sm")]: {
      display: "block"
    }
  },
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: fade(theme.palette.common.white, 0.25)
    },
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing.unit,
      width: "auto"
    }
  },
  searchIcon: {
    width: theme.spacing.unit * 9,
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  inputRoot: {
    color: "inherit",
    width: "100%"
  },
  inputInput: {
    paddingTop: theme.spacing.unit,
    paddingRight: theme.spacing.unit,
    paddingBottom: theme.spacing.unit,
    paddingLeft: theme.spacing.unit * 10,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: 120,
      "&:focus": {
        width: 200
      }
    }
  }
});

class Chat extends React.Component {
  state = {
    currentMessage: "",
    incomingChats: []
  };
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleChange(event) {
    this.setState({ currentMessage: event.target.value });
  }
  handleSubmit() {
    let { createModel, publish } = this.props;
    let { currentMessage } = this.state;
    publish(currentMessage);
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.model) {
      this.setState({
        incomingChats: [...nextProps.model]
      });
    }
  }
  componentDidMount() {
    let { subscribe, channel, getModel } = this.props;
    subscribe({
      channel,
      onInit: value => {
        console.log(value);
      },
      onConnect: () => {
        console.log("connected");
      },
      onDisconnect: () => {
        console.log("disconnectd");
      },
      onEvent: chat => {
        console.log(chat);
        this.setState({
          incomingChats: [...this.state.incomingChats, chat]
        });
      }
    });
  }
  renderListItem(chat, deleteModel, getModel) {
    return (
      <ListItem key={chat._id}>
        <ListItemText>
          <p>{chat.text}</p>
        </ListItemText>
        <ListItemSecondaryAction>
          <Button
            onClick={() => {
              deleteModel(chat);
            }}
          >
            <p>Delete</p>
          </Button>
        </ListItemSecondaryAction>
      </ListItem>
    );
  }
  render() {
    let {
      match,
      classes,
      createModel,
      updateModel,
      getModel,
      deleteModel
    } = this.props;
    if (this.state.incomingChats && Array.isArray(this.state.incomingChats)) {
      let chatView = this.state.incomingChats.map(chat => {
        return this.renderListItem(chat, deleteModel);
      });
      return (
        <div className={classes.root}>
          <header>
            <AppBar position="static">
              <Toolbar>
                <div className={classes.search}>
                  <div className={classes.searchIcon}>
                    <SearchIcon />
                  </div>
                  <Input
                    placeholder="Search"
                    disableUnderline
                    classes={{
                      root: classes.inputRoot,
                      input: classes.inputInput
                    }}
                  />
                </div>
              </Toolbar>
            </AppBar>
          </header>
          <div>
            <TextField
              id="standard-name"
              label="Name"
              className={classes.textField}
              onChange={this.handleChange}
              margin="normal"
            />
            <Button onClick={this.handleSubmit}>
              <p>Submit</p>
            </Button>
          </div>
          <List>{chatView}</List>
        </div>
      );
    }
    return <CircularProgress />;
  }
}

export default withStyles(styles)(Chat);
