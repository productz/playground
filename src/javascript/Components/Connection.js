import React from 'react';
import Node from './Node.js'

export default class Connection extends React.Component{
    constructor(){
        super();
    }
    componentDidMount(){

    }
    
    render(){
        
        return(
            <div>
                {
                this.props.connections.map((connection)=>(
                    <svg>
                        {connection.from.x}
                        {connection.to.x}
                    </svg>
                ))
                }
                <svg />
            </div>
        );
    }
}
