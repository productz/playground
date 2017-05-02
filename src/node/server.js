import getRandom from './utils.js';

const SUIT = [
  "Spades",
  "Hearts",
  "Diamonds",
  "Clubs"
];

const CARDS = [
  "Ace",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "10",
  "Jack",
  "Queen",
  "King"
];

class Deck{

  constructor(){
    this.cardList = [
      ...this.generateDeck(SUIT[0],CARDS),
      ...this.generateDeck(SUIT[1],CARDS),
      ...this.generateDeck(SUIT[2],CARDS),
      ...this.generateDeck(SUIT[3],CARDS),
    ];
  }

  generateDeck(suit,cards){
    
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
  suit;
  constructor(name,suit){
    this.name = name;
    this.type = suit;
  }
}


let myDeck = new Deck();
let startIndex = getRandom(1,52);
let endIndex = getRandom(startIndex,52);
myDeck.shuffle(10,startIndex,endIndex);
