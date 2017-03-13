import {observable, computed} from 'mobx';

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
}

export class Expense {
    @observable date;
    title;
    amount;
    category;
    constructor(date,amount,category,title){
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