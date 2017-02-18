import React from 'react';
import ReactDOM from 'react-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {
    Router,
    Route,
    IndexRoute,
    Link,
    hashHistory
}
from 'react-router'
import {
    Tabs,
    Tab
}
from 'material-ui/Tabs';
import {
    Card,
    CardHeader,
    CardText
}
from 'material-ui/Card';
import AppBar from 'material-ui/AppBar';
import FontIcon from 'material-ui/FontIcon';
import MapsPersonPin from 'material-ui/svg-icons/maps/person-pin';
import injectTapEventPlugin from 'react-tap-event-plugin';
import 'normalize.css';
import '../Style/main.scss';
import data from '../data.json';

injectTapEventPlugin();

const styles = {
    title: {
        textAlign: 'center',
    },
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        flexDirection: 'column',
        justifyContent: 'space-around',
    },
    gridList: {
        display: 'flex',
        flexWrap: 'nowrap',
        flexDirection: 'row',
        overflowX: 'auto',
    },
    gridTitle: {
        textDecoration: 'underline'
    },
    gridItem: {
        padding: '0 3em'
    },
    titleStyle: {
        color: 'rgb(0, 188, 212)',
    },
};

class App extends React.Component {
    render() {
        return (
            <MuiThemeProvider>
                <div>
                    <AppBar
                    style={{textAlign:"center"}}
                    title={<span style={styles.title}>Sam Alghanmi: Full Stack Developer</span>}
                />
                    <Menu
                    changeRoute={this.changeRoute}
                    >
                    </Menu>
                    <CardFrame
                    >
                        {this.props.children}
                     </CardFrame>
                </div>
            </MuiThemeProvider>
        );
    }
    componentWillReceiveProps(nextProps) {
        this.setState({
            children: nextProps.children
        });
    }
    changeRoute(tab) {
        hashHistory.push(tab.props['data-route']);
    }
};

const CardFrame = ({
    children
}) => (
    <Card>
        <CardHeader
        />
        <CardText >
        {children}
        </CardText>
        </Card>
);

const Menu = ({
    changeRoute
}) => (
    <Tabs>
        <Tab
        icon={<FontIcon className="material-icons">home</FontIcon>}
        label="Home"
        data-route="/"
        onActive={changeRoute}
        />
        <Tab
        icon={<FontIcon className="material-icons">info</FontIcon>}
        label="About"
        data-route="/about"
        onActive={changeRoute}
        />
        <Tab
        icon={<FontIcon className="material-icons">favorite</FontIcon>}
        label="Portfolio"
        data-route="/portfolio"
        onActive={changeRoute}
        />
        <Tab
        icon={<MapsPersonPin />}
        label="Contact"
        data-route="/contact"
        onActive={changeRoute}
        />
        </Tabs>
);

const Footer = () => (
    <footer>
    </footer>
);

const Home = () => (
    <article>
            <h3>Welcome to my personal Site.</h3> 
            <h3>My name is Sam Alghanmi. I am a full-stack developer. My main language is Javascript.</h3>
        </article>
);

const cleanObject = (obj) => {
    return Object.keys(obj).map((key) => {
        if (parseInt(key)) {
            return obj[key];
        }
        return "";
    }).filter((obj)=>obj !== "")
}

const Skills = () => {
    let skill = data.ideas.About.ideas["My Skills"].ideas;
    let skillList = [{
        category: "Frontend",
        ideas: skill["Web"].ideas["Front-end"].ideas
    }, {
        category: "Backend",
        ideas: skill["Web"].ideas["Backend"].ideas
    }, {
        category: "Hybrid Mobile",
        ideas: skill["Mobile"].ideas["Hybrid"].ideas
    }, {
        category: "On the Side",
        ideas: skill["On the Side"].ideas
    }];
    return (<div style={styles.root} >
              {skillList.map((skill,index) => (
              <div>
                <h2 style={styles.gridTitle}>
                {skill.category}
                </h2>
                <div style={styles.gridList} key={index}>
                    {cleanObject(skill.ideas).map((subSkill)=>(
                        <span style={styles.gridItem}>{subSkill.title}</span>
                    ))}
                </div>
               </div>
              ))}
            </div>);
}

const About = () => {
    return (<article>
            <h3>
            I am full stack developer with 7 years of professional experience. My main stack is composed of JavaScript: React, Angularjs, Redux, Mobx, RxJS, Webpack are some of what I know on the front-end. On the back-end, I am familiar with Node: Express, PostgreSQL on the back-end. I have been focusing my efforts in the last two years on working with Hybrid Mobile apps in React Native. 
            I have worked in most settings of software development. I have run my own agency, worked at an agency, in-house on a product team, and freelanced. My diverse background empowers me to bring a comprehensive view into any technical issue I am faced with.
            </h3>
            <h2>Skills:</h2>
            {Skills()}
        </article>);
};

const dialog = ({
    text
}) => (
    <div>howdy</div>
)

const Companies = () => {
    let companyList = data.ideas.Portfolio.ideas;
    return (<div style={styles.root} >
              {cleanObject(companyList).map((company,index) => (
              <div>
                <h2 style={styles.gridTitle}>
                {company.title}
                </h2>
                <h3>{company.attr.note.text}</h3>
               </div>
              ))}
            </div>);
}

const Portfolio = () => (
    <div>
        <h3>Companies I worked With: </h3>
        {Companies()}
    </div>
);

const Contact = () => {
    let contactList = data.ideas.Contact.ideas;
    let contactEl = (<div style={styles.root} >
              {cleanObject(contactList).map((contact,index) => (
              <div>
                <h2 style={styles.gridTitle}>
                {contact.title}
                </h2>
                <h3>{cleanObject(contact.ideas).map(c => <a href={c.title}>{c.title}</a> )}</h3>
               </div>
              ))}
            </div>);
            
    return (<div>
        <h3>Contact me at:</h3>
        <div>{contactEl}</div>
        </div>
    );
};

ReactDOM.render(
    <Router history={hashHistory}>
        <Route path="/" component={App}>
            <IndexRoute component={Home} />
            <Route path="about" component={About} />
            <Route path="portfolio" component={Portfolio} />
            <Route path="contact" component={Contact} />
        </Route>
        </Router>,
    document.getElementById('app')
);
