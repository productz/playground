//adds a uniqe id to every object
(function() {
    var id_counter = 1;
    Object.defineProperty(Object.prototype, "__uniqueId", {
        writable: true
    });
    Object.defineProperty(Object.prototype, "uniqueId", {
        get: function() {
            if (this.__uniqueId == undefined)
                this.__uniqueId = id_counter++;
            return this.__uniqueId;
        }
    });
}());


import Rx from 'rxjs';
import React from 'react';
import ReactDOM from 'react-dom';
import {App} from './App.js';
import 'animate.css/animate.css';
import './assets/styles/home.css';
import successSound from 'file-loader!./assets/audio/success.wav';
import errorSound from 'file-loader!./assets/audio/error.wav';

let observablesHash = {};

var appEl = document.getElementById('app');
ReactDOM.render(<App />, appEl);


let ob = createObservable();
consumeObservable(ob);

//let ob1 = createObservable();
//let sub1 = consumeObservable(ob1)

//let ob2 = createObservableFromEvent(button);
//let sub2 = consumeObservable(ob2);

//let ob3 = createObservableFromInterval();
//let sub3 = consumeObservable(ob3);

//let ob4 = createCustomObservable();
//let sub4 = consumeObservable(ob4);

let ob5 = createErrorObservable();
let sub5 = consumeObservable(ob5);

//setTimeout then dispose of the subscription (turn off the observable)
//setTimeout(()=>destroyObservable(sub3),3000)

//createSubject();
//createHotObservable();

function createObservable(){
  let observable = Rx.Observable.of(1);
  return observable;
}

function createObservableFromInterval(){
    return Rx.Observable
    .interval(500 /* ms */)
    .timeInterval()
    .delay(200)
}

function createObservableFromEvent(element){
  return Rx.Observable
  .fromEvent(element, 'click')
}

function createErrorObservable(){
	return Rx.Observable.throw(new Error('error!'));
}


//this function will take subscribe to an observable, then add the data coming through onNext, onError and onCompleted to the div with id data
function consumeObservable(observable){
  let subscription = observable.subscribe(
      function (data) {
          console.log('onNext: ', data);
          draw({onNext:data},observable);
      },
      function (err) {
          console.log('onError: ' + err);
          draw({onError:err},observable);
      },
      function () {
          console.log('onCompleted : Completed!');
          draw({onCompleted:'Completed!'},observable);
      }
  ); 
  return subscription;
}

//using operators here: Map, Filter ... etc
//Visit http://rxmarbles.com/ for more information about operators
function chainObservables(observable){
  return observable.map(
    data => data * 2
  ).filter(
    data => data !== 5
  );
}

function destroyObservable(subscription){
  //I can dispose of the subscription here (cancel it)
  subscription.dispose();
}

function createCustomObservable(){
  return Rx.Observable.create((observer)=>{
    observer.onNext(1);
    observer.onNext(2);
    setTimeout(()=>{
      observer.onNext(3);
    },1000);
    setTimeout(()=>{
       observer.onCompleted();
    },3000)
  })
}

function createHotObservable(){
  
  console.log('Current time: ' + Date.now());

  // Creates a sequence
  var source = Rx.Observable.interval(1000);

  // Convert the sequence into a hot sequence
  var hot = source.publish();

  // No value is pushed to 1st subscription at this point
  var subscription1 = consumeObservable(hot);

  console.log('Current Time after 1st subscription: ' + Date.now());

  // Idle for 3 seconds
  setTimeout(function () {

    // Hot is connected to source and starts pushing value to subscribers
    hot.connect();

    console.log('Current Time after connect: ' + Date.now());

    // Idle for another 3 seconds
    setTimeout(function () {

      console.log('Current Time after 2nd subscription: ' + Date.now());
      var subscription2 = consumeObservable(hot);
      subscription1.dispose();
      subscription2.dispose();

    }, 3000);
  }, 3000);
  
}

function createSubject(observable){
    // Every second
    var subject = new Rx.Subject();
    let count = 1;
      
    //the subject is an observable here ...
    let subSubject = subject.map(value=>value+1).subscribe(
     data => console.log(`onNext: ${data}`),
     err => console.log(`onError: ${err}`) ,
     () => console.log("onCompleted: completed")
    );
  
    subject.onNext(1);
    subject.onNext(2);
    subject.onNext(3);
    subject.onNext(4);
    subject.onNext(5);
  
    setTimeout(function () {
        subSubject.dispose();
    }, 5000);
  
}

function draw(data,observable){
	/**if(observablesHash[observable.uniqueId]){
		var obj = Object.assign(o1, o2, o3);
	}**/
	observablesHash[observable.uniqueId] = {observable,data};
	App.setState(observableHash)
}




