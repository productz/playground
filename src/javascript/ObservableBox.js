import React from 'react';

export function ObservableBox(observableObj){

	let data = observableObj.data;
	let observable = observableObj.observable;

   	return (
   		<div className="{observable.uniqueId}">
   			{observable.uniqueId}
   			<div className="circle success">
   				{data.onNext}
   			</div>
   			<div className="circle error">
   			   	{data.onError}
   			</div>
   			<div className="circle completed">
   				{data.onCompleted}
   			</div>
   		</div>
   	);
}
