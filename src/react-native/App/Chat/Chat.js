import React from "react";
import {
  Card,
  CardItem,
  Form,
  Item,
  Input,
  Label,
  Text,
  Button,
  Body
} from "native-base";

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
    getModel();
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
