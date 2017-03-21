import {observable, computed, autorun, action, reaction} from 'mobx';
import uuidV4 from 'uuid/v4';
import superagent from 'superagent';

export class User {
    name;
    email;
    @observable dailyBudget;
    @observable dailyBudgetEditable = false;
    @observable expenseList = [];
    @observable expenseEditable=false;
    @observable categoryList=[];
    @observable selectedRoute = 0;
    @observable selectedDate = Date.now();
    pendingRequestCount = 0;
    constructor(name,email,dailyBudget,dailyBudgetEditable,expenseList,expenseEditable,categoryList,selectedRoute,selectedDate) {
        this.name = name;
        this.email = email;
        this.dailyBudget = dailyBudget;
        this.dailyBudgetEditable = dailyBudgetEditable;
        this.expenseList = expenseList;
        this.expenseEditable = expenseEditable;
        this.categoryList = categoryList;
        this.selectedRoute = selectedRoute;
        this.selectedDate = selectedDate;
    }
    
    @computed get filterByDate(){
    	return this.expenseList.filter(
			expense =>  expense.date === this.selectedDate
		);
    }
    
    @action uploadCSV(files) {
        this.pendingRequestCount++;
        let req = superagent.post('https://playground-test-itechdom.c9users.io/expenses/upload/csv');
        files.map((file) => {
            req.attach(file.name, file);
        });
        req.end(action("createRandomContact-callback", (error, results) => {
            if (error)
                console.error(error);
            else {
                const data = JSON.parse(results.text).results[0];
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