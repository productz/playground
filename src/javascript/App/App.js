import React from 'react';
import ReactDOM from 'react-dom';
import {observer} from "mobx-react";
import {User,Expense,Category} from '../Store';
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

@observer class App extends React.Component {
    render() {
        return (
            <MuiThemeProvider muiTheme={muiTheme}>
                <div>
                    <AppBar
                    iconElementLeft={<span></span>}
                    style={{textAlign:"center"}}
                    title={
                    <div style={styles.title}><h1 className="title">BudgetQT</h1>
                    <h3 className="sub-title">Cross Platform Budgeting!</h3>
                    </div>}
                     />
                        <Home dailyBudget={this.props.userStore.dailyBudget} />
                        <Menu />
                     <Footer/>
                </div>
            </MuiThemeProvider>
        );
    }
};

const Home = ({dailyBudget}) => (
    <section>
        <div className="list text-center top-1">
            <p>My Daily Budget is: ${dailyBudget}</p>
            <p>That's ${4 * dailyBudget} per week</p>
            <p>And ${30 * dailyBudget} per month </p>
        </div>
        <div className="grid center top-1">
            <p>Today I have spend: $13 </p>
        </div>
    </section>
);

const Team = () => (
    <section>
        <h2>Meet the Admin Team</h2>
        <ul>
        <li>Sam Alghanmi: Slack => <a href="pgh-devs.slack.com/team/sam.alghanmi" style={{color:deepPurple600}}>sam.alghanmi</a> || Twitter => <a href="https://twitter.com/itechdom">@itechdom</a></li>
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
        <p>budgetqt</p>
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
        icon={<FontIcon className="material-icons">favorite</FontIcon>}
        label="Daily Budget"
        data-route="/portfolio"
        onActive={changeRoute}
        />
        <Tab
        icon={<FontIcon className="material-icons">info</FontIcon>}
        label="Progress"
        data-route="/progress"
        onActive={changeRoute}
        />
        <Tab
        icon={<MapsPersonPin />}
        label="Friends"
        data-route="/contact"
        onActive={changeRoute}
        />
        </Tabs>
);

let userStore = new User("Sam","osamah.net.m@gmail.com",13);

ReactDOM.render(
    <App userStore={userStore} />,
    document.getElementById('app')
);
