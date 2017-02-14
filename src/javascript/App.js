import React from 'react';
import {ObservableBox} from './ObservableBox.js';
import {createObservable,createErrorObservable,createObservableFromInterval,createCustomObservable,createObservableFromEvent,createSubject, createHotObservable, consumeObservable} from './rx-examples.js';
import update from 'immutability-helper';
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
		//consumeObservable(ob);
		this.updateHashTable(ob);


		let ob1 = createObservableFromInterval();
		//let sub1 = consumeObservable(ob1)
		this.updateHashTable(ob1);


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
        let empty = {};
        if(!this.state.observableHash[uniqueId]){
            this.state.observableHash[uniqueId] = {};
        }
        empty[type] = JSON.stringify(newValue[type]);
        this.state.observableHash[uniqueId] = update(this.state.observableHash[uniqueId], {$merge: empty});  
        const newState = update(this.state.observableHash, {$merge: empty});  
        this.setState({newState});
    }
    updateHashTable(observable){
    	observable.subscribe(
    	(onNext)=>{
    		//current data
    		this.updateStore({onNext},observable.uniqueId,'onNext');
    	},
    	(onError)=>{
    		this.updateStore({onError},observable.uniqueId,'onError');
    	},
    	()=>{
    		this.updateStore({onCompleted:"onCompleted"},observable.uniqueId,'onCompleted');
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
