import React from 'react';
import ReactDOM from 'react-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RaisedComponent from './RaisedComponent';
import AppBarExampleComposition from '../components/AppBar/ExampleComposition.js'

const App = () => (
        <MuiThemeProvider>
        <RaisedComponent />
        <AppBarExampleComposition />
        </MuiThemeProvider>
        );

ReactDOM.render(
        <App />,
        document.getElementById('app')
        );
