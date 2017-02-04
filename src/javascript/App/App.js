import React from 'react';
import ReactDOM from 'react-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Container from '../Container';
import Home from './App.Home';
import About from './App.About';
import Portfolio from './App.Portfolio';
import Contact from './App.Contact';
import Container from '../Container';
import { Router, Route, IndexRoute, Link, hashHistory } from 'react-router'

const App = () => (
        <MuiThemeProvider>
            <Container>
            <header class="header">
                <h1>Sam Alghanmi: Full Stack Developer</h1>
                <nav>
                    <ul>
                    <li><Link to="/home">Home</Link></li>
                    <li><Link to="/about">About</Link></li>
                    <li><Link to="/portfolio">Portfolio</Link></li>
                    <li><Link to="/contact">Contact</Link></li>
                    </ul>
                </nav>
            </header>
            {this.props.children}
            <footer>
                All Rights Reserved
            </footer>
            </Container>
        </MuiThemeProvider>
        );

ReactDOM.render(
        <Router history={hashHistory}>
        <Route path="/" component={App}>
        <IndexRoute component={Home} />
        <Route path="about" component={About} />
        <Route path="portfolio" component={Portfolio} />
        <Route path="contact" component={Contact} />
        </Route>
        </Router>
        document.getElementById('app')
        );
