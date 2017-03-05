import React from 'react';
import Node from './Node.js'

export default class Tree extends React.Component{
    constructor(){
        super();
    }
    componentDidMount(){

    }
    renderNodes(nodeList){
        return nodeList.map((node,index)=>{
            return(
                <div>
                    <Node position={[100,500+(index*500)]} key={index} node={node} children={node.ideas}/>
                </div>
            );
        })
    }
    render(){
        let nodeList = Object.keys(this.props.nodes.ideas).map(key => this.props.nodes.ideas[key]);
        return(
            <div>
                {this.renderNodes(nodeList)}
            </div>
        );
    }
}
