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
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'
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
import AutoComplete from 'material-ui/AutoComplete';
import {BottomNavigation, BottomNavigationItem} from 'material-ui/BottomNavigation';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';
import Paper from 'material-ui/Paper';
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
                    <h2>Welcome {this.props.userStore.name}!</h2>
                    </div>}
                     />
                        <Menu 
                            selectedRoute={this.props.userStore.selectedRoute}
                            changeRoute={(index)=>this.props.userStore.selectedRoute = index}
                        />
                        <Home  
                            dailyBudgetEditable={this.props.userStore.dailyBudgetEditable}
                            dailyBudget={this.props.userStore.dailyBudget} 
                            onDailyBudgetChange={(event,newValue)=>this.props.userStore.dailyBudget=newValue}
                            onEditChange={(event)=>this.props.userStore.dailyBudgetEditable = !this.props.userStore.dailyBudgetEditable}
                        />
                        <Expenses
                            categoryList={this.props.userStore.categoryList}
                            expenseList={this.props.userStore.expenseList}
                            expenseEditable={this.props.userStore.expenseEditable}
                            onExpenseOpen={(event)=>this.props.userStore.expenseEditable=true}
                            onExpenseClose={(event)=>this.props.userStore.expenseEditable=false}
                            newExpense={new Expense()}
                            totalExpenses={this.props.userStore.totalExpenses}
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
            Your Daily Budget is: $
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

const Expenses = ({categoryList, expenseList, onExpensesAdd, expenseEditable, onExpenseOpen, onExpenseClose, newExpense, totalExpenses}) => (
    <section className="list text-center">
        <FormattedDate
            value={Date.now()}
            year='numeric'
            month='long'
            day='numeric'
            weekday='long'
        />
        <ExpenseDialog 
            categoryList={categoryList}
            open={expenseEditable}
            handleOpen={onExpenseOpen}
            handleClose={onExpenseClose}
            handleSubmit={(event)=>{console.log(expenseList);newExpense.date = new Date();expenseList.push(newExpense);onExpenseClose()}}
            newExpense={newExpense}
        />
            <Table>
                  <TableHeader>
                      <TableRow>
                          <TableHeaderColumn>Date</TableHeaderColumn>
                          <TableHeaderColumn>Amount</TableHeaderColumn>
                          <TableHeaderColumn>Title</TableHeaderColumn>
                          <TableHeaderColumn>Category</TableHeaderColumn>
                      </TableRow>
                  </TableHeader>
                <TableBody className="top-1">
            {
                expenseList.map((expense,index) => (
                    <TableRow key={index}>
                      <TableRowColumn>
                          <FormattedDate
                                value={expense.date}
                                year='numeric'
                                month='long'
                                day='numeric'
                            />
                        </TableRowColumn>
                        <TableRowColumn>{expense.amount}</TableRowColumn>
                        <TableRowColumn>{expense.title}</TableRowColumn>
                        <TableRowColumn>{expense.category.title}</TableRowColumn>
                    </TableRow>
                ))
            }
            </TableBody>
            </Table>
    </section>
);

const ExpenseDialog = ({handleClose,handleOpen,open,handleSubmit,newExpense,categoryList}) => {
    const actions = [
        <FlatButton
        label="Cancel"
        primary={true}
        onClick={handleClose}
      />,
        <FlatButton
        label="Submit"
        primary={true}
        onClick={handleSubmit}
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
                <TextField onChange={(event,newValue)=>{newExpense.title = newValue}} type="text" required="true" hintText="Expense Title"/>
                <TextField onChange={(event,newValue)=>{newExpense.amount = newValue}} type="number" required="true" hintText="Expense Amount"/>
                <AutoComplete
                  hintText="Expense Category"
                  required="true"
                  dataSource={categoryList.map(cat => cat.title)}
                  onNewRequest={(chosenRequest,index)=>newExpense.category = categoryList[index]}
                />
            </Dialog>
        </div>
    );
};

const Stats = () => (
    <div>Stats</div>
)

const Rewards = () => (
    <div>Rewards</div>
)

const Friends = () => (
    <div>Friends</div>
)

const Footer = () => (
    <footer style={{marginTop:'4em', padding:'2em',textAlign:'center',backgroundColor:colors.grey300}}>
        <p>budgetqt</p>
    </footer>
);

const Menu = ({
    changeRoute,
    selectedRoute
}) => (
    <Paper zDepth={1}>
    <BottomNavigation
        selectedIndex={selectedRoute}
    >
        <BottomNavigationItem
            icon={<FontIcon className="material-icons">home</FontIcon>}
            label="Home"
            data-route="/"
            onTouchTap={() => changeRoute(0)}
        />
        <BottomNavigationItem
            icon={<FontIcon className="material-icons">favorite</FontIcon>}
            label="Stats"
            data-route="/portfolio"
            onTouchTap={() => changeRoute(1)}
        />
        <BottomNavigationItem
            icon={<FontIcon className="material-icons">info</FontIcon>}
            label="Rewards"
            data-route="/progress"
            onTouchTap={() => changeRoute(2)}
        />
        <BottomNavigationItem
            icon={<MapsPersonPin />}
            label="Friends"
            data-route="/contact"
            onTouchTap={() => changeRoute(3)}
        />
    </BottomNavigation>
    </Paper>
);


//====================
//-------------------
// POPULATE STORE WITH INITIAL DATA
//-------------------
//===================
let expenseList = [
    new Expense(Date.now(),3.6,new Category("gas","icon-gas"),"gas"),
    new Expense(Date.now(),2.4,new Category("coffee","coffee-icon"),"startbucks")
];

let categoryList = [
    new Category("gas","gas"),
    new Category("coffee","coffee"),
    new Category("groceries","cart"),	
    new Category ("food","food"),	
    new Category("friends and family","gift"),
    new Category("dog","dog"),
    new Category("donation","donation"),
    new Category("medical","ambulance"),
    new Category("electronics","electronic"),
    new Category("online subscriptions","electronic"),
    new Category("utilities","phone"),
    new Category("vacation and travel","beach"),
    new Category("office supplies","office")
];

let userStore = new User("Sam", "osamah.net.m@gmail.com", 13, false, expenseList,false, categoryList, 0, Date.now());

ReactDOM.render(
    <IntlProvider locale="en">
        <App userStore={userStore} />
    </IntlProvider>
    ,
    document.getElementById('app')
);
