import {observable, computed} from 'mobx';

export class User {
    name;
    email;
    @observable dailyBudget;
    @observable categoryList=[];
    @observable expenseList = [];
    constructor(name,email,dailyBudget,categoryList,expenseList) {
        this.name = name;
        this.email = email;
        this.dailyBudget = dailyBudget;
        this.categoryList = categoryList;
        this.expenseList = expenseList;
    }
}

export class Expense {
    expenseDate;
    amount;
}

export class Category {
    title;
    icon;
}

export class Reward {
    amount;
    rewardDate;
}