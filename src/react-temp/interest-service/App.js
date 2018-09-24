import React, { Component } from 'react';
import logo from './logo.svg';
import zeeImage from './zee.JPG';
import './App.css';
import SwitchElement from './SwitchElement';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Media,
  Badge,
  Button,
  InputGroup,
  InputGroupAddon,
  Input
} from 'reactstrap'
import 'bootstrap/dist/css/bootstrap.min.css';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusSquare } from '@fortawesome/free-solid-svg-icons';
library.add(faPlusSquare);

class App extends Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.onSwitchChecked = this.onSwitchChecked.bind(this);
    this.getRandomNumber = this.getRandomNumber.bind(this);
    this.toggleProfileMode = this.toggleProfileMode.bind(this);
    this.toggleNewInterestPlusButton = this.toggleNewInterestPlusButton.bind(this);
    this.state = {
      isOn: false,
      isOpen: false,
      isChecked: false,
      userInterests: ['math', 'biology', 'chemistry', 'philosophy', 'astronomy', 'tech', 'computer science', 'swimming', 'programming', 'soccer'],
      userInterestColors: ['primary', 'secondary', 'success', 'warning', 'info', 'dark'],
      isEditMode: false,
      isNewInterestFocused: false
    };
  }
  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }

  onSwitchChecked() {
    this.setState({
      isChecked: !this.state.isChecked
    });
  }

  renderNav() {
    return (
      <div>
        <Navbar color="dark" dark expand="md">
          <NavbarBrand href="/">OUR APP</NavbarBrand>
          {/* <NavbarToggler onClick={this.toggle} /> */}
          {/* <Collapse isOpen={this.state.isOpen} navbar> */}
          {/* <Nav className="ml-auto" navbar> */}
          <Nav className="" navbar>
            <p>Want to meet someone nearby and talk? </p>
            <SwitchElement onChange={this.onSwitchChecked} checked={this.state.isChecked} ></SwitchElement>
          </Nav>
          {/* </Collapse> */}
        </Navbar>
      </div>
    );
  }

  renderProfileHomepage() {
    return (
      <div>
        <div className="profile_image">
          <Media left href="#">
            <Media object src={zeeImage} width='64px' height='64px' alt="User profile image" />
          </Media>
        </div>
        {this.renderProfileInterests()}
      </div>
    );
  }

  getRandomNumber() {
    let min = 1,
      max = this.state.userInterestColors.length;

    var rand = Math.random() * (max - min) + min;
    return Math.floor(rand);
  }

  toggleProfileMode() {
    // Toggle the edit mode on the profile page
    this.setState({
      isEditMode: !this.state.isEditMode
    });
  }

  toggleNewInterestPlusButton() {
    // Toggle the Plus button next to "add a new interest" textbox
    this.setState({
      isNewInterestFocused: !this.state.isNewInterestFocused
    });
  }

  renderProfileInterest(interest) {
    if (this.state.isEditMode) {
      return <Badge className="editable_interest" color={'dark'} pill>{interest} <Button size="sm">x</Button></Badge>
    }
    else
      return <Badge className="viewable_interest" color={this.state.userInterestColors[this.getRandomNumber()]} pill>{interest}</Badge>
  }

  renderProfileInterests() {
    return (
      <div className="profile_interests_container">
        {this.state.isEditMode ? <p>Add or remove interests:</p> : ""}
        <div className="profile_interests">
          {this.state.userInterests.map(
            (interest) => this.renderProfileInterest(interest)
          )}
          <span class="input-group">
            {this.state.isEditMode ? <Input placeholder="Add a new interest" onFocus={this.toggleNewInterestPlusButton} onBlur={this.toggleNewInterestPlusButton} /> : ""}
            {this.state.isNewInterestFocused ? <InputGroupAddon addonType="append"><Button><FontAwesomeIcon icon="plus-square" size="lg" color="lightyellow" /></Button></InputGroupAddon> : ""}
          </span>
        </div>
        <div>
          <Button onClick={this.toggleProfileMode} color="danger" size="lg">{this.state.isEditMode ? 'Save' : 'Edit'}</Button>
        </div>
      </div>
    );
  }

  render() {
    return (
      <div className="App">
        {this.renderNav()}
        {this.renderProfileHomepage()}
      </div>
    );
  }
}

export default App;
