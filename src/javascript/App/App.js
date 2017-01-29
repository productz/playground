import React from 'react';
import ReactDOM from 'react-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RaisedComponent from './RaisedComponent';

const App = () => (
        <MuiThemeProvider>
        <RaisedComponent />
        </MuiThemeProvider>
        );

ReactDOM.render(
        <App />,
        document.getElementById('app')
        );
