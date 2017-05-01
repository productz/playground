import getRandom from './utils.js';

class Deck{
  cardList = [
    new Card("jack","spade"),
    new Card("queen","hearts"),
    new Card("1","spade")
  ];
  constructor(){

  }
  //number: represents the number of shuffles we are going to perform each time
  shuffle(number,startIndex,endIndex){
    for(let i=0;i<number;i++){
      let removed = this.cardList.splice(startIndex,endIndex);
      this.cardList.unshift(removed);
    }
  }
  deal(){
    return this.cardList[this.cardList.length - 1];
  }
}

class Card{
  name;
  type;
  constructor(name,type){
    this.name = name;
    this.type = type;
  }
}


let myDeck = new Deck();
let startIndex = getRandom(1,52);
let endIndex = getRandom(startIndex,52);
myDeck.shuffle(10,startIndex,endIndex);
