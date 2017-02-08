import Rx from 'rxjs';
import 'animate.css/animate.css';
import './assets/styles/home.css';
import home from 'raw-loader!./home.html';
import successSound from 'file-loader!./assets/audio/success.wav';
import errorSound from 'file-loader!./assets/audio/error.wav';

var appElement = document.getElementById('app');
appElement.innerHTML = home;

let ob = createObservable();
consumeObservable(ob);

function createObservable(){
    let observable = Rx.Observable.of({'data':'content'});
    return observable;
}

function createObservableFromEvent(element){
    let observable = 
        Rx.Observable
        .fromEvent(element, 'click')
        .debounce(200);
}

function consumeObservable(observable){
    let subscription = observable.subscribe(
            function (data) {
                console.log('Next: ', data);
                draw(data);
            },
            function (err) {
                console.log('Error: ' + err);
            },
            function () {
                console.log('Completed');
            }
            ); 
    return subscription;
}

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

function draw(data){
    let successElement = document.getElementById('success__data');
    let errorElement = document.getElementById('error__data');
    if(data.error){
        return;
    }
    return;

}

function initSound(){

}

function playSound(sound){
    var errorAudio = document.getElementById('error')
        errorAudio.src = errorSound;
    errorAudio.play();

    var successAudio = document.getElementById('success')
        successAudio.src = successSound;
    successAudio.play();
}
