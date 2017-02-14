import React from 'react';

export function ObservableBox({onNext,onError,onCompleted,obId}){
      let obsClasses = `observable__${obId} observable`;
   	return (
   		<div className={obsClasses}>
   			<div className="circle success">
   				{onNext}
   			</div>
   			<div className="circle error">
   			   {onError}
   			</div>
   			<div className="circle completed">
   				{onCompleted}
   			</div>
   		</div>
   	);
}
