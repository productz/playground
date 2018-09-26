import { observer } from "mobx-react";
import { observable, action, runInAction, toJS } from "mobx";
import React from "react";
import axios from "axios";
import { SERVER } from "../config";
import io from "socket.io-client";

//export store
export class socketDomainStore {
  mapStore = observable.map();
  @observable
  isConnected = false;
  rootStore;
  constructor(rootStore) {
    this.rootStore = rootStore;
  }
  @action
  subscribe({ onInit, onConnect, onEvent, onDisconnect, channel }) {
    let newSocket = io(`${SERVER.host}:${SERVER.port + 1}`);
    newSocket.on("init", data => {
      this.mapStore.set(channel, data);
      onInit(data);
    });
    newSocket.on("connect", () => {
      onConnect();
    });
    newSocket.on(channel, data => {
      let list = this.mapStore.get(this.channel);
      list.push(data);
      this.mapStore.set(channel, list);
      onEvent(data);
    });
    newSocket.on("disconnect", () => {
      onDisconnect();
    });
  }
  @action
  publish({ channel, value }) {
    //cached data, you don't have to hit up he end point
    this.channel = channel;
    if (this.mapStore.get(channel) && !refresh) {
      return;
    }
    return this.socket.emit(`${channel}:get`, value, data => {
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
        model: toJS(socketDomainStore.mapStore.get(channel)),
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
        ...child.props
      });
    });
    return <React.Fragment>{childrenWithProps}</React.Fragment>;
  }
}
