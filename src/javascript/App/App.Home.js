import React from 'react';
import Container from '../Container';
import { Link } from 'react-router'

export let Home = () => (
    <Container>
        <h3>Welcome to my personal Site.</h3> 
        <h3>My name is Sam Alghanmi. I am a full-stack developer. My main language is Javascript.</h3>
        <h3>Checkout <Link to="/about">About</Link> for my background. The <Link to="/portfolio">Portfolio</Link> page for some of my work and Don't hesitate to <Link to="/contact">Contact</Link> me if you have any questions.</h3>
    </Container>
);
