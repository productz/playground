import React from 'react';
import {ObservableBox} from './ObservableBox.js';
import {createObservable,createErrorObservable,createObservableFromInterval,createCustomObservable,createObservableFromEvent,createSubject, createHotObservable, consumeObservable} from './rx-examples.js';
import update from 'immutability-helper';
import Rx from 'rxjs';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'; 

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

        let ob1 = createObservable();
	    let sub1 = this.updateHashTable(ob1,"basic observable");


		let ob2 = createObservableFromInterval();
		let sub2 = this.updateHashTable(ob2,"interval observable 1");


		//let ob3 = createObservableFromEvent(button);
		//let sub3 = consumeObservable(ob3);

		let ob4 = createObservableFromInterval();
		let sub4 = this.updateHashTable(ob4,"interval observable 2");

		//let ob4 = createCustomObservable();
		//let sub4 = consumeObservable(ob4);

		let ob5 = createErrorObservable();
		let sub5 = this.updateHashTable(ob5, "error observable");

		//setTimeout then dispose of the subscription (turn off the observable)
		//setTimeout(()=>destroyObservable(sub3),3000)

		//createSubject();
		//createHotObservable();
        //
        setTimeout(() => sub4.unsubscribe(),3000);
    }
    updateStore(newValue,uniqueId, type,tag){
        let empty = {};
        if(!this.state.observableHash[uniqueId]){
            this.state.observableHash[uniqueId] = {};
            this.state.observableHash[uniqueId].tag = tag;
        }
        empty[type] = JSON.stringify(newValue[type]);
        this.state.observableHash[uniqueId] = update(this.state.observableHash[uniqueId], {$merge: empty});  
        const newState = update(this.state.observableHash, {$merge: empty});  
        this.setState({newState});
    }
    updateHashTable(observable,tag){
    	return observable.subscribe(
    	(onNext)=>{
    		//current data
    		this.updateStore({onNext},observable.uniqueId,'onNext',tag);
    	},
    	(onError)=>{
    		this.updateStore({onError},observable.uniqueId,'onError',tag);
    	},
    	()=>{
    		this.updateStore({onCompleted:"onCompleted"},observable.uniqueId,'onCompleted',tag);
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
	       let obEl = list.map((key) => { return (<ObservableBox key={key} title={this.state.observableHash[key].tag}  obId={key} onNext={this.state.observableHash[key].onNext} onError={this.state.observableHash[key].onError} onCompleted={this.state.observableHash[key].onCompleted} />) });
	       return (
                   <div className="observable__container">
                       <ReactCSSTransitionGroup
                       transitionName="example"
                       transitionEnterTimeout={500}
                       transitionLeaveTimeout={300}>
                           {obEl}
                       </ReactCSSTransitionGroup>
                   </div>
           );
   		}
   		return (<div>hello</div>);

    }
}
