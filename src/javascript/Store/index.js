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
    constructor(name,email,dailyBudget,dailyBudgetEditable,expenseEditable,categoryList,selectedRoute,selectedDate,filesAccepted) {
        this.name = name;
        this.email = email;
        this.dailyBudget = dailyBudget;
        this.dailyBudgetEditable = dailyBudgetEditable;
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
            let newExpenses = JSON.parse(res.text);
            this.expenseList.push(...newExpenses);
        }));  
    }
    
    @action getImportedExpenses() {
        this.pendingRequestCount++;
        let req = superagent.get('http://playground-test-itechdom.c9users.io:8081/api/v1/expenses/imported');
        req.end(action("getImportedExpenses-callback",(err,res)=>{
            if(err){
                console.log("err: ",err);
            }
            let newExpenses = JSON.parse(res.text);
            this.expenseImportedList.push(...newExpenses);
        }));
    }
    
    @action deleteImportedExpense(importedExpense) {
        this.pendingRequestCount++;
        let req = superagent.delete('http://playground-test-itechdom.c9users.io:8081/api/v1/expenses/imported')
                    .send(importedExpense);
        let removed = this.expenseImportedList.remove(importedExpense);
        req.end(action("saveImportedExpense-callback", (error, results) => {
            if (error){
                console.error(error);
                //push back the importedList item
                this.expenseImportedList.push(importedExpense);
            }
            else {
                this.pendingRequestCount--;
            }
        }));
    }

    
    @action saveImportedExpense(importedExpense) {
        this.pendingRequestCount++;
        let req = superagent.post('http://playground-test-itechdom.c9users.io:8081/api/v1/expenses/imported')
                    .send(importedExpense);
        let removed = this.expenseImportedList.remove(importedExpense);
        req.end(action("saveImportedExpense-callback", (error, results) => {
            if (error){
                console.error(error);
                //push back the importedList item
                this.expenseImportedList.push(importedExpense);
            }
            else {
                //remove imported expense from UI
                const data = JSON.parse(results.text);
                //add the imported expense to the expense list
                this.expenseList.push(data);
                this.pendingRequestCount--;
            }
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