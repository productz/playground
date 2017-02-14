import React from 'react';
import {ObservableBox} from './ObservableBox.js';
import {createObservable,createErrorObservable,createCustomObservable,createObservableFromEvent,createSubject, createHotObservable, consumeObservable} from './rx-examples.js';
import Rx from 'rxjs';

export class App extends React.Component {
    constructor() {
        super();

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

        this.state = {observableHash:{}};
        let ob = createObservable();
		consumeObservable(ob);
		this.updateHashTable(ob);


		//let ob1 = createObservable();
		//let sub1 = consumeObservable(ob1)

		//let ob2 = createObservableFromEvent(button);
		//let sub2 = consumeObservable(ob2);

		//let ob3 = createObservableFromInterval();
		//let sub3 = consumeObservable(ob3);

		//let ob4 = createCustomObservable();
		//let sub4 = consumeObservable(ob4);

		//let ob5 = createErrorObservable();
		//let sub5 = consumeObservable(ob5);

		//setTimeout then dispose of the subscription (turn off the observable)
		//setTimeout(()=>destroyObservable(sub3),3000)

		//createSubject();
		//createHotObservable();
    }
    updateStore(newValue,uniqueId, type){
    	let currentValue  = this.state.observableHash[uniqueId];
    	if(currentValue){
    		currentValue.type = newValue;
    		this.setState({currentValue});
    	}
    }
    updateHashTable(observable){
    	observable.subscribe(
    	(onNext)=>{
    		//current data
    		this.updateStore(onNext,observable.uniqueId,'onNext');
    	},
    	(onError)=>{
    		this.updateStore(onError,observable.uniqueId,'onError');
    	},
    	()=>{
    		this.updateStore("onCompleted!",observable.uniqueId,'onCompleted');
    	}
    	)
    }
    componentDidMount() {

    }
    componentWillReceiveProps(nextProps){
    	console.log("component recieved props");
    }
    render() { 
       let list = Object.keys(this.state.observableHash);
       console.log(this.state.observableHash);
       //
       if(list.length > 0){
	       let obEl = list.map((key) => { return (<ObservableBox key={key} obId={key} onNext={this.state.observableHash[key].onNext} onError={this.state.observableHash[key].onError} onCompleted={this.state.observableHash[key].onCompleted} />) });
	       return <div>{obEl}</div>
   		}
   		return (<div>hello</div>);

    }
}