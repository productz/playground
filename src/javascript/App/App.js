import React from 'react';
import ReactDOM from 'react-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import {
    fade
}
from 'material-ui/utils/colorManipulator';
import {
    cyan500,
    cyan700,
    pinkA200,
    grey100,
    grey300,
    grey400,
    grey500,
    white,
    darkBlack,
    fullBlack,
    deepPurple900,
    deepPurple600
}
from 'material-ui/styles/colors';
import {
    Router,
    Route,
    IndexRoute,
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
    CardActions,
    CardHeader,
    CardMedia,
    CardTitle,
    CardText
}
from 'material-ui/Card';
import Chip from 'material-ui/Chip';
import AppBar from 'material-ui/AppBar';
import FontIcon from 'material-ui/FontIcon';
import MapsPersonPin from 'material-ui/svg-icons/maps/person-pin';
import injectTapEventPlugin from 'react-tap-event-plugin';
import RaisedButton from 'material-ui/RaisedButton';
import 'normalize.css';
import '../Style/main.scss';

injectTapEventPlugin();

const styles = {
    title: {
        margin:'1em 0'
    },
    subTitle: {
        fontFamily: 'Roboto Slab',
        margin: '0 0 1em 0'
    },
    ctaButton:{
        width:'200px'
    }
};

const muiTheme = getMuiTheme({
    fontFamily: 'Roboto,sans-serif',
    palette: {
        primary1Color: deepPurple900,
        primary2Color: deepPurple600,
        primary3Color: grey400,
        accent1Color: pinkA200,
        accent2Color: grey100,
        accent3Color: grey500,
        textColor: darkBlack,
        alternateTextColor: white,
        canvasColor: white,
        borderColor: grey300,
        disabledColor: fade(darkBlack, 0.3),
        pickerHeaderColor: cyan500,
        clockCircleColor: fade(darkBlack, 0.07),
        shadowColor: fullBlack,
    },
    appBar: {
        height: 'auto'
    },
    tabs: {
        backgroundColor: deepPurple600
    }
});

class App extends React.Component {
    render() {
        return (
            <MuiThemeProvider muiTheme={muiTheme}>
                <div className="parent">
                    <AppBar
                    iconElementLeft={<span></span>}
                    style={{textAlign:"center"}}
                    title={
                    <div style={styles.title}><h1>Pittsburgh Devs</h1>
                    <h3>A Slack community for Pitsburgh's Developers, Designers, Makers, Hackers</h3>
                    <h4 className="top-1">Let's cultivate a healthy developer environment in the steel city!</h4>
                    </div>
                    }
                     />
                    <CardFrame
                    className="child"
                    >
                        <Home />
                     </CardFrame>
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

const Home = () => (
    <section className="list">
        <div className="text-center">We have a number of active channels: #general, #jobs, #announcements, #introductions </div>
        <div className="grid center top-1">
            <RaisedButton href="https://pgh-devs.herokuapp.com" label="Join The Community" secondary={true}/>
        </div>
    </section>
);

const CardFrame = ({
    children
}) => (
    <Card>
        <CardHeader
        />
        <CardText >
        {children}
        </CardText>
    </Card>
);

const Menu = ({
    changeRoute
}) => (
    <Tabs
    inkBarStyle={{background: 'white'}}
    >
        <Tab
        icon={<FontIcon className="material-icons">home</FontIcon>}
        label="Home"
        data-route="/"
        onActive={changeRoute}
        />
        <Tab
        icon={<FontIcon className="material-icons">info</FontIcon>}
        label="About"
        data-route="/about"
        onActive={changeRoute}
        />
        <Tab
        icon={<FontIcon className="material-icons">favorite</FontIcon>}
        label="Portfolio"
        data-route="/portfolio"
        onActive={changeRoute}
        />
        <Tab
        icon={<MapsPersonPin />}
        label="Contact"
        data-route="/contact"
        onActive={changeRoute}
        />
        </Tabs>
);

const Footer = () => (
    <footer>
    </footer>
);

ReactDOM.render(
    React.createElement(App),
    document.getElementById('app')
);
