import {observable, computed, autorun, action, reaction} from 'mobx';
import uuidV4 from 'uuid/v4';
import superagent from 'superagent';

export class User {
    name;
    email;
    @observable dailyBudget;
    @observable dailyBudgetEditable = false;
    @observable expenseList = [];
    @observable expenseImportedList = [];
    @observable expenseEditable=false;
    @observable categoryList=[];
    @observable selectedRoute = 0;
    @observable selectedDate = Date.now();
    @observable filesAccepted = [];
    pendingRequestCount = 0;
    constructor(name,email,dailyBudget,dailyBudgetEditable,expenseList,expenseEditable,categoryList,selectedRoute,selectedDate,filesAccepted) {
        this.name = name;
        this.email = email;
        this.dailyBudget = dailyBudget;
        this.dailyBudgetEditable = dailyBudgetEditable;
        this.expenseList = expenseList;
        this.expenseEditable = expenseEditable;
        this.categoryList = categoryList;
        this.selectedRoute = selectedRoute;
        this.selectedDate = selectedDate;
        this.filesAccepted = filesAccepted;
    }
    
    @computed get filterByDate(){
    	return this.expenseList.filter(
			expense =>  expense.date === this.selectedDate
		);
    }
    
    @computed get fileNames(){
        return this.filesAccepted.map((file)=>file.name);
    }
    
    @action uploadCSV() {
        this.pendingRequestCount++;
        let req = superagent.post('http://playground-test-itechdom.c9users.io:8081/api/v1/expenses/upload/csv');
        this.filesAccepted.map((file) => {
            req.attach(file.name, file);
        });
        req.end(action("uploadCSV-callback", (error, results) => {
            if (error)
                console.error(error);
            else {
                const data = JSON.parse(results.text);
                console.log(data);
                this.pendingRequestCount--;
            }
        }));
    }
    
    @action getExpenses(){
        this.pendingRequestCount++;
        let req = superagent.get('http://playground-test-itechdom.c9users.io:8081/api/v1/expenses');
        req.end(action("getExpenses-callback",(err,res)=>{
            if(err){
                console.log("err: ",err);
            }
            let expenseList = JSON.parse(res.text);
            this.expenseImportedList.push(...expenseList);
        }));  
    }
    
    @action getImportedExpenses() {
        this.pendingRequestCount++;
        let req = superagent.get('http://playground-test-itechdom.c9users.io:8081/api/v1/expenses/imported');
        req.end(action("getImportedExpenses-callback",(err,res)=>{
            if(err){
                console.log("err: ",err);
            }
            let newExpense = JSON.parse(res.text)[0];
            this.expenseImportedList.push(newExpense);
        }));
    }
}

export class Expense {
    id;
    @observable date;
    title;
    amount;
    category;
    constructor(date,amount,category,title){
        this.id = uuidV4();
        this.date = date;
        this.amount = amount;
        this.category = category;
        this.title = title;
    }
}

export class Category {
    title;
    icon;
    constructor(title,icon){
        this.title = title;
        this.icon = icon;
    }
}

export class Reward {
    amount;
    rewardDate;
}