//@flow
import Tree from '../components/Tree.js';
import React from 'react';
import ReactDOM from 'react-dom';
import sampleMindmap from '../data.json';

export default class App extends React.Component {
    constructor() {
        super();
        this.state = { mindmap: sampleMindmap }
    }
    componentDidMount() {

    }
    updateCounter(){

    }
    render() {
        return (
        <div className="board">
        <Tree nodes={this.state.mindmap} />
        </div>
        );
    }
}
ReactDOM.render(
        document.getElementById('app')
        );
