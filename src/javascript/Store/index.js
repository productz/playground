import {observable, computed} from 'mobx';

export class User {
    name;
    email;
    @observable dailyBudget;
    @observable dailyBudgetEditable = false;
    @observable expenseList = [];
    @observable expenseEditable=false;
    @observable categoryList=[];
    constructor(name,email,dailyBudget,dailyBudgetEditable,expenseList,expenseEditable,categoryList) {
        this.name = name;
        this.email = email;
        this.dailyBudget = dailyBudget;
        this.dailyBudgetEditable = dailyBudgetEditable;
        this.expenseList = expenseList;
        this.expenseEditable = expenseEditable;
        this.categoryList = categoryList;
    }
}

export class Expense {
    date;
    amount;
    category;
    constructor(date,amount,category){
        this.date = date;
        this.amount = amount;
        this.category = category;
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