import Rx from 'rxjs';

export function createObservable(){
  let observable = Rx.Observable.of(1);
  return observable;
}

export function createObservableFromInterval(){
    return Rx.Observable
    .interval(500 /* ms */)
    .timeInterval()
    .delay(200)
}

export function createObservableFromEvent(element){
  return Rx.Observable
  .fromEvent(element, 'click')
}

export function createErrorObservable(){
	return Rx.Observable.throw(new Error('error!'));
}


//this function will take subscribe to an observable, then add the data coming through onNext, onError and onCompleted to the div with id data
export function consumeObservable(observable){
  let subscription = observable.subscribe(
      function (data) {
          console.log('onNext: ', data);
      },
      function (err) {
          console.log('onError: ' + err);
      },
      function () {
          console.log('onCompleted : Completed!');
      }
  ); 
  return subscription;
}

//using operators here: Map, Filter ... etc
//Visit http://rxmarbles.com/ for more information about operators
export function chainObservables(observable){
  return observable.map(
    data => data * 2
  ).filter(
    data => data !== 5
  );
}

export function destroyObservable(subscription){
  //I can dispose of the subscription here (cancel it)
  subscription.dispose();
}

export function createCustomObservable(){
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

export function createHotObservable(){
  
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

export function createSubject(observable){
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