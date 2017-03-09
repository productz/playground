import {observable, computed} from 'mobx';

export class User {
    name;
    email;
    @observable dailyBudget;
    constructor(name,email,dailyBudget) {
        this.name = name;
        this.email = email;
        this.dailyBudget = dailyBudget;
    }
}

export class Expense {
    @observable categoryList=[];
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