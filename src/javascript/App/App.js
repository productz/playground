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
    },
    channels:{
       color: deepPurple900
    }
};

class App extends React.Component {
    render() {
        return (
            <MuiThemeProvider muiTheme={muiTheme}>
                <div>
                    <AppBar
                    iconElementLeft={<span></span>}
                    style={{textAlign:"center"}}
                    title={
                    <div style={styles.title}><h1 className="title">Arab Devs</h1>
                    <h3 className="sub-title">Slack مجتمع المبرمجين العرب علئ</h3>
                    </div>
                    }
                     />
                    <CardFrame
                    className="list center"
                    >
                        <Home />
                        <Conduct />
                        <Team />
                     </CardFrame>
                     <Footer/>
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
    <section>
        <div> <span style={styles.channels}>#general, #jobs, #announcements, #introductions, #meetups, #javascript, #java, #ruby</span> and more.</div>
        <div className="grid center top-1">
            <RaisedButton  target="_blank" href="https://arabdevs.herokuapp.com" label="انظم الينا" secondary={true}/>
        </div>
    </section>
);

const Team = () => (
    <section>
        <h2>فريق المشرفين</h2>
        <ul>
        <li><a href="arabdevs.slack.com/team/osama.alghanmi" style={{color:deepPurple600}}>اسامة الغانمي</a> || Twitter => <a href="https://twitter.com/itechdom">@itechdom</a></li>
        </ul>
    </section>
);

const Resources = () => (
    <section>
    </section>
)

const PghMeetups = () => (
    <section>
    </section>
)

const Conduct = () => (
    <section>
        <h2>Code of Conduct</h2>
        <p>Pittsburgh Devs is dedicated to providing a harassment-free experience for everyone, regardless of gender identity or expression, sexual orientation, disability, physical appearance, body size, race, religion or non-religion. We do not tolerate harassment of participants in any form. Harassment includes offensive verbal comments related to gender, sexual orientation, disability, physical appearance, body size, race, religion, sexual images, deliberate intimidation, stalking, sustained disruption of discussions or other events, and unwelcome sexual attention. If a participant engages in behavior that violates this code of conduct, the organizers may take any action they deem appropriate, including warning the offender or expulsion from the group.</p>
    </section>
);

const Footer = () => (
    <footer style={{marginTop:'4em', padding:'2em',textAlign:'center',backgroundColor:grey300}}>
        <p>Reach out to : pghdevs@gmail.com with any questions. This website was inspired by the beautiful Denver Devs Communtiy: <a href="https://denverdevs.org/">https://denverdevs.org.</a></p>
    </footer>
);

const CardFrame = ({
    children
}) => (
    <Card>
        <CardHeader
        />
        <CardText className="content" >
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

ReactDOM.render(
    React.createElement(App),
    document.getElementById('app')
);
