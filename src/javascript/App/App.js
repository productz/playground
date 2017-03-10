import React from 'react';
import ReactDOM from 'react-dom';
import {observer} from "mobx-react";
import {User,Expense,Category} from '../Store';
import { IntlProvider, FormattedDate } from 'react-intl';
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
import Dialog from 'material-ui/Dialog';
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
                        <Expenses
                            expenseList={this.props.userStore.expenseList}
                            expenseEditable={this.props.userStore.expenseEditable}
                            onExpenseOpen={(event)=>this.props.userStore.expenseEditable=true}
                            onExpenseClose={(event)=>this.props.userStore.expenseEditable=false}
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

const Expenses = ({expenseList, onExpensesAdd, expenseEditable, onExpenseOpen, onExpenseClose, newExpense}) => (
    <section className="list text-center">
        <p>Today is: 
        <FormattedDate
            value={Date.now()}
            year='numeric'
            month='long'
            day='numeric'
            weekday='long'
        />
        <ExpenseDialog 
            open={expenseEditable}
            handleOpen={onExpenseOpen}
            handleClose={onExpenseClose}
        />
        <ul>
            {
                expenseList.map((expense,index) => <li key={index}>{
                    <div className="top-1">
                    <FormattedDate
                        value={expense.date}
                        year='numeric'
                        month='long'
                        day='numeric'
                    />
                    <span>===={expense.amount}</span>
                    <span>===={expense.category.title}</span>
                    </div>
                }</li>)
            }
        </ul>
        </p>
    </section>
);

const ExpenseDialog = ({handleClose,handleOpen,open,updateExpense}) => {
    const actions = [
        <FlatButton
        label="Cancel"
        primary={true}
        onClick={handleClose}
      />,
        <FlatButton
        label="Submit"
        primary={true}
        onClick={updateExpense}
      />,
    ];
    return (
        <div>
            <RaisedButton label="Add Expense" onClick={handleOpen} />
            <Dialog
              title="Add Expense"
              actions={actions}
              modal={false}
              open={open}
              onRequestClose={handleClose}
            >
                <TextField type="number" hintText="Expense Amount"/>
                <TextField type="text" hintText="Expense Category"/>
            </Dialog>
        </div>
    );
};

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
            label="Statistics"
            data-route="/portfolio"
            onActive={changeRoute}
        />
        <Tab
            icon={<FontIcon className="material-icons">info</FontIcon>}
            label="Rewards"
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

let expenseList = [
    new Expense(Date.now(),3.6,new Category("gas","icon-gas")),
    new Expense(Date.now(),2.4,new Category("coffee","coffee-icon"))
];

let categoryList = [
    new Category("gas","icon-gas"),
    new Category("coffee","coffee-icon")
];

let userStore = new User("Sam", "osamah.net.m@gmail.com", 13, false, expenseList,false, categoryList);

ReactDOM.render(
    <IntlProvider locale="en">
        <App userStore={userStore} />
    </IntlProvider>
    ,
    document.getElementById('app')
);
