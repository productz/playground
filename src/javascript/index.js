import Rx from 'rxjs';
import 'raw-loader!animate.css/animate.css';
import home from 'raw-loader!./home.html';

var appElement = document.getElementById('app');
appElement.innerHTML = home;

var canvasElement = document
.getElementById('myCanvas');
var ctx = canvasElement.getContext("2d");
var count = 0;

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
    let observer = Rx.Observer.create(
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
    let subscription = observable.subscribe(observer);
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

}

//drawing circles given a coordinate
function draw(x=400,y=150){
    let count = 0;
    let interval = setInterval(()=>{
        if(count === 10){
            clearInterval(interval);
            ctx.clearRect(0, 0, canvasElement.width, canvasElement.height);
        }
        ctx.beginPath();
        ctx.arc(x,y,count*100,0,4*Math.PI);
        ctx.stroke();
        count++
    },100);
}

function playSound(sound){

}
