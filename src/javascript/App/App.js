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
import * as colors from 'material-ui/styles/colors';
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
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import 'normalize.css';
import '../Style/main.scss';

injectTapEventPlugin();

const muiTheme = getMuiTheme({
    fontFamily: 'Roboto,sans-serif',
    palette: {
        primary1Color: colors.grey900,
        primary2Color: colors.teal500,
        primary3Color: colors.grey400,
        accent1Color: colors.pinkA200,
        accent2Color: colors.grey100,
        accent3Color: colors.grey500,
        textColor: colors.darkBlack,
        alternateTextColor: colors.white,
        canvasColor: colors.white,
        borderColor: colors.grey300,
        disabledColor: fade(colors.darkBlack, 0.3),
        pickerHeaderColor: colors.cyan500,
        shadowColor: colors.fullBlack
    },
    appBar: {
        height: 'auto'
    },
    tabs: {
        backgroundColor: colors.grey700
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
       color: colors.deepPurple900
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
                        <Menu />
                        <h2>Welcome {this.props.userStore.name}!</h2>
                        <Home  
                        dailyBudgetEditable={this.props.userStore.dailyBudgetEditable}
                        dailyBudget={this.props.userStore.dailyBudget} 
                        onDailyBudgetChange={(event,newValue)=>this.props.userStore.dailyBudget=newValue}
                        onEditChange={(event)=>this.props.userStore.dailyBudgetEditable = !this.props.userStore.dailyBudgetEditable}
                        />
                     <Footer/>
                </div>
            </MuiThemeProvider>
        );
    }
};

const Home = ({dailyBudget,dailyBudgetEditable,onEditChange, onDailyBudgetChange}) => (
    <section>
        <div className="list text-center top-1">
            <p>
            My Daily Budget is: $
            {dailyBudgetEditable?<TextField onChange={onDailyBudgetChange} type="number" hintText="Enter your daily budget"/>:<span>{dailyBudget}</span>}
            <FlatButton 
                label="Edit" 
                primary={true} 
                onClick={onEditChange}
            />
            </p>
            <p>That's ${4 * dailyBudget} per week</p>
            <p>And ${30 * dailyBudget} per month </p>
        </div>
    </section>
);

const Footer = () => (
    <footer style={{marginTop:'4em', padding:'2em',textAlign:'center',backgroundColor:colors.grey300}}>
        <p>budgetqt</p>
    </footer>
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

let userStore = new User("Sam","osamah.net.m@gmail.com",13,false);

ReactDOM.render(
    <App userStore={userStore} />,
    document.getElementById('app')
);
