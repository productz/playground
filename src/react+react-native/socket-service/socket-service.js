import { observer } from "mobx-react";
import { observable, action, runInAction, toJS } from "mobx";
import React from "react";
import axios from "axios";
import io from "socket.io-client";

//export store
export class socketDomainStore {
  @observable
  isConnected = false;
  socket;
  rootStore;
  SERVER;
  constructor(rootStore, SERVER) {
    this.rootStore = rootStore;
    this.SERVER = SERVER;
  }
  @action
  subscribe({ onInit, onConnect, onEvent, onDisconnect, channel }) {
    let newSocket = io(`${this.SERVER.host}:${this.SERVER.port + 1}`);
    newSocket.on("init", data => {
      onInit(data);
    });
    newSocket.on("connect", () => {
      onConnect();
    });
    newSocket.on(channel, data => {
      onEvent(data);
    });
    newSocket.on("disconnect", () => {
      onDisconnect();
    });
    this.socket = newSocket;
  }
  @action
  publish({ channel, value }) {
    return this.socket.emit(`${channel}`, value, data => {
      console.log(data);
    });
  }
}

//determine the theme here and load the right login information?
@observer
export class Socket extends React.Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {}
  componentWillReceiveProps(nextProps) {}
  componentDidUpdate() {}
  render() {
    let { channel, children, socketDomainStore } = this.props;
    const childrenWithProps = React.Children.map(children, child => {
      return React.cloneElement(child, {
        channel: channel,
        publish: value => socketDomainStore.publish({ value, channel }),
        subscribe: ({ onConnect, onEvent, onDisconnect, channel, onInit }) =>
          socketDomainStore.subscribe({
            onConnect,
            onEvent,
            onDisconnect,
            channel,
            onInit
          }),
        ...this.props,
        ...child.props
      });
    });
    return <React.Fragment>{childrenWithProps}</React.Fragment>;
  }
}
