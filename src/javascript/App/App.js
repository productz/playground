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
import AppBar from 'material-ui/AppBar';
import FontIcon from 'material-ui/FontIcon';
import MapsPersonPin from 'material-ui/svg-icons/maps/person-pin';
import injectTapEventPlugin from 'react-tap-event-plugin';
import 'normalize.css';
import data from '../data.json';

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
    render() {
        return (
            <MuiThemeProvider>
                <div>
                    <AppBar
                    style={{textAlign:"center"}}
                    title={<span style={styles.title}>Sam Alghanmi: Full Stack Developer</span>}
                />
                    <Menu
                    changeRoute={this.changeRoute}
                    >
                    </Menu>
                </div>
            </MuiThemeProvider>
        );
    }
    componentWillReceiveProps(nextProps) {
        this.setState({
            children: nextProps.children
        });
    }
    changeRoute(tab) {
        hashHistory.push(tab.props['data-route']);
    }
};

ReactDOM.render(
    <Router history={hashHistory}>
        <Route path="/" component={App}>
            <IndexRoute component={Home} />
            <Route path="about" component={About} />
            <Route path="portfolio" component={Portfolio} />
            <Route path="contact" component={Contact} />
        </Route>
        </Router>,
    document.getElementById('app')
);
