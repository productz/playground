import Rx from 'rxjs';
import React from 'react';
import ReactDOM from 'react-dom';
import {App} from './App.js';
import 'animate.css/animate.css';
import './assets/styles/home.css';
import successSound from 'file-loader!./assets/audio/success.wav';
import errorSound from 'file-loader!./assets/audio/error.wav';

let observablesHash = {};

var appEl = document.getElementById('app');

ReactDOM.render(<App />, appEl);




