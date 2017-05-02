import getRandom from './utils.js';

const SUITS = [
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
      ...this.generateDeck(SUITS[0],CARDS),
      ...this.generateDeck(SUITS[1],CARDS),
      ...this.generateDeck(SUITS[2],CARDS),
      ...this.generateDeck(SUITS[3],CARDS),
    ];
  }

  generateDeck(suit,cards){
    return cards.map((card)=>{
      return new Card(card,suit);
    })
  }

  //number: represents the number of shuffles we are going to perform each time
  shuffle(number){
    for(let i=0;i<number;i++){
      let startIndex = getRandom(1,52);
      let endIndex = getRandom(startIndex,52);
      let removed = this.cardList.splice(startIndex,endIndex);
      this.cardList.unshift(...removed);
    }
  }
  
  deal(){
    return this.cardList[0];
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

//=======================
//==== MAIN
//=======================
let myDeck = new Deck();
//we are picking two random indexes to shuffle the deck
myDeck.shuffle(1000);
let dealtCard = myDeck.deal();
console.log("Card List:",myDeck.cardList);
console.log("Card List Length:",myDeck.cardList.length);
console.log("Dealt Card:",dealtCard);
