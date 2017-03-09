import {observable, computed} from 'mobx';

export class User {
    name;
    email;
    @observable dailyBudget;
    @observable dailyBudgetEditable = false;
    @observable categoryList=[];
    @observable expenseList = [];
    constructor(name,email,dailyBudget,dailyBudgetEditable) {
        this.name = name;
        this.email = email;
        this.dailyBudget = dailyBudget;
        this.dailyBudgetEditable = dailyBudgetEditable;
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