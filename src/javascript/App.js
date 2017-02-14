import React from 'react';
import {ObservableBox} from './ObservableBox.js';

export class App extends React.Component {
    constructor() {
        super();
        this.state = {data:{},observable:{}};
    }
    componentDidMount() {
    }
    render() { 
       <ObservableBox data={this.state.data} observable={this.state.observable} />;
    }
}