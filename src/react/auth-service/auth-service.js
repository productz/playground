//export store
export class AuthStore {
  date;
  title;
  amount;
  category;
  constructor(date, amount, category, title) {
    this.date = date;
    this.amount = amount;
    this.category = category;
    this.title = title;
  }
}

export const AuthService = ({}) => {

};
