import React from 'react';
import ReactDOM from 'react-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {
    Router,
    Route,
    IndexRoute,
    Link,
    hashHistory
}
from 'react-router'
import {
    Tabs,
    Tab
}
from 'material-ui/Tabs';
import {
    Card,
    CardHeader,
    CardText
}
from 'material-ui/Card';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import AppBar from 'material-ui/AppBar';
import FontIcon from 'material-ui/FontIcon';
import MapsPersonPin from 'material-ui/svg-icons/maps/person-pin';
import injectTapEventPlugin from 'react-tap-event-plugin';
import 'normalize.css';
import data from '../data.json';
import io from 'socket.io-client';

injectTapEventPlugin();

const styles = {
    title: {
        textAlign: 'center',
    },
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        flexDirection: 'column',
        justifyContent: 'space-around',
    },
    gridList: {
        display: 'flex',
        flexWrap: 'nowrap',
        flexDirection: 'row',
        overflowX: 'auto',
    },
    gridTitle: {
        textDecoration: 'underline'
    },
    gridItem: {
        padding: '0 3em'
    },
    titleStyle: {
        color: 'rgb(0, 188, 212)',
    },
};

class App extends React.Component {

    constructor(props){
      super(props);
      this.state = {
        text:""
      }
      this.handleTextChange = this.handleTextChange.bind(this);
      this.chat = this.chat.bind(this);
    }

    chat(){
      console.log("sending chat message:",this.state.text);
    }

    handleTextChange(event,newVal){
      this.setState({text:newVal})
    }

    render() {
        return (
            <MuiThemeProvider>
                <div>
                    <AppBar
                    style={{textAlign:"center"}}
                    title={<span style={styles.title}>Remote Keyboard</span>}
                />

                <TextField
                  hintText="Enter your message"
                  fullWidth={true}
                  onChange={this.handleTextChange}
                />
                <RaisedButton label="Submit" primary={true} onClick={this.chat} />

                </div>
            </MuiThemeProvider>
        );
    }
    componentWillReceiveProps() {

    }

};

ReactDOM.render(
    <App />,
    document.getElementById('app')
);
