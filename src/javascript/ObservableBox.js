import React from 'react';

export function ObservableBox({onNext,onError,onCompleted,obId,title}){
      let obsClasses = `observable__${obId} observable`;
   	return (
   		<div className={obsClasses}>
            <h1>
            {title}
            </h1>
   			<div className="circle success">
   				<p>{onNext}</p>
   			</div>
   			<div className="circle error">
                <p>
                   {onError}
                </p>
   			</div>
   			<div className="circle completed">
                <p>
                    {onCompleted}
                </p>
   			</div>
   		</div>
   	);
}
