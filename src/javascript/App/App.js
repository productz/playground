//@flow
import Tree from '../Components/Tree.js';
import React from 'react';
import ReactDOM from 'react-dom';
import mindmap from '../../../data/JavaScript.mup.json';
import Model from '../Model/Model.js';

export default class App extends React.Component {
    constructor() {
        super();
        let model = new Model(mindmap);
        model.createDepthModel();
        this.state = {
            mindmap: model.tree
        }
    }
    componentDidMount() {

    }
    updateCounter() {

    }
    render() {
        return (
        <div className="board">
            <Tree 
                onPositionChange
                nodes={this.state.mindmap}
            />
        </div>
        );
    }
}
ReactDOM.render(
    React.createElement(App),
    document.getElementById('app')
);