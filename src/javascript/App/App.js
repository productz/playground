import React from 'react';
import ReactDOM from 'react-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import {fade} from 'material-ui/utils/colorManipulator';
import pic from '../Style/images/sam.alghanmi.jpg';
import {
  cyan500, cyan700,
  pinkA200,
  grey100, grey300, grey400, grey500,
  white, darkBlack, fullBlack,
  deepPurple900,deepPurple600
} from 'material-ui/styles/colors';
import {
    Router,
    Route,
    IndexRoute,
    hashHistory
}
from 'react-router'
import {
    Tabs,
    Tab
}
from 'material-ui/Tabs';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import Chip from 'material-ui/Chip';
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
        fontFamily: 'Roboto Slab',
        margin: '0 0'
    },
    subTitle: {
        fontFamily: 'Roboto Slab',
        margin: '0 0 1em 0'
    },
    personalImg: {
        height: '150px',
        borderRadius: '100px',
        boxShadow: '0px 0px 4px 3px rgba(35, 31, 32, 0.51)'
    },
    list: {
        display: 'flex',
        flexWrap: 'wrap',
        flexDirection: 'column',
        justifyContent: 'space-between',
    },
    listItem: {
        marginBottom: '2em'
    },
    gridList: {
        display: 'flex',
        flexWrap: 'wrap',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        paddingBottom:'10px'
    },
    gridTitle: {
        fontWeight: 'bold'
    },
    gridImage: {
        width: '300px',
        minWidth: '',
        maxWidth: ''
    },
    gridItem: {
        margin: '10px 0 0 10px'
    },
    titleStyle: {
        color: 'rgb(0, 188, 212)',
    },
};

const muiTheme = getMuiTheme({
    fontFamily: 'Roboto,sans-serif',
    palette: {
        primary1Color: deepPurple900,
        primary2Color: deepPurple600,
        primary3Color: grey400,
        accent1Color: pinkA200,
        accent2Color: grey100,
        accent3Color: grey500,
        textColor: darkBlack,
        alternateTextColor: white,
        canvasColor: white,
        borderColor: grey300,
        disabledColor: fade(darkBlack, 0.3),
        pickerHeaderColor: cyan500,
        clockCircleColor: fade(darkBlack, 0.07),
        shadowColor: fullBlack,
    },
    appBar:{
      height:'auto'
    },
    tabs:{
        backgroundColor:deepPurple600
    }
});

class App extends React.Component {
    render() {
        return (
            <MuiThemeProvider muiTheme={muiTheme}>
                <div className="parent">
                    <AppBar
                    iconElementLeft={<span></span>}
                    style={{textAlign:"center"}}
                    title={<div><div><img style={styles.personalImg} src={pic} /></div><h2 style={styles.title}>Sam Alghanmi</h2><h4 style={styles.subTitle}>Full Stack Developer</h4></div>}
                     />
                    <Menu
                    className="child"
                    changeRoute={this.changeRoute}
                    >
                    </Menu>
                    <CardFrame
                    className="child"
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
    <Tabs
    inkBarStyle={{background: 'white'}}
    >
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
    <section>
            <h3>Welcome to my personal Site.</h3> 
            <h3>My name is Sam Alghanmi. I am a full-stack developer. My main language is Javascript.</h3>
        </section>
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
    return (<div style={styles.list} >
              {skillList.map((skill,index) => (
              <Card key={index} style={styles.listItem}>
                <CardTitle style={styles.gridTitle}
                    title={skill.category}                
                />
                <div style={styles.gridList} key={index}>
                    {cleanObject(skill.ideas).map((subSkill,index)=>(
                        <Chip key={index} style={styles.gridItem}>{subSkill.title}</Chip>
                    ))}
                </div>
               </Card>
              ))}
            </div>);
}

const About = () => {
    return (<section>
            <p>
            I am full stack developer with 7 years of professional experience. My main stack is composed of JavaScript: React, Angularjs, Redux, Mobx, RxJS, Webpack are some of what I know on the front-end. On the back-end, I am familiar with Node: Express, PostgreSQL on the back-end. I have been focusing my efforts in the last two years on working with Hybrid Mobile apps in React Native. 
            I have worked in most settings of software development. I have run my own agency, worked at an agency, in-house on a product team, and freelanced. My diverse background empowers me to bring a comprehensive view into any technical issue I am faced with.
            </p>
            <h3 className="title">Skills:</h3>
            {Skills()}
        </section>);
};

const Companies = () => {
    let companyList = data.ideas.Portfolio.ideas;
    return (<div style={styles.list} >
              {cleanObject(companyList).map((company,index) => (
              <Card key={index} style={styles.listItem}>
                <CardTitle style={styles.gridTitle}
                title={company.title}
                />
                <CardMedia>
                    <img style={styles.gridImage} src={require(`../Style/images/${company.title.split(' ').join('').toLowerCase()}.png`)} />
                </CardMedia>
                <CardText>{company.attr.note.text}</CardText>
               </Card>
              ))}
            </div>);
}

const Portfolio = () => (
    <section>
        <h3>Companies I worked With: </h3>
        {Companies()}
    </section>
);

const Contact = () => {
    let contactList = data.ideas.Contact.ideas;
    let contactEl = (<div style={styles.list} >
              {cleanObject(contactList).map((contact,index) => (
              <div key={index}>
                <h2 style={styles.gridTitle}>
                {contact.title}
                </h2>
                <h3>{cleanObject(contact.ideas).map((c,index) => <a key={index} href={c.title}>{c.title}</a> )}</h3>
               </div>
              ))}
            </div>);
            
    return (<section>
        <h3>Contact me at:</h3>
        <div>{contactEl}</div>
        </section>
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
