import React, { Component } from 'react';
import Switch from "react-switch";

class SwitchExample extends Component {
   
    render() {
      return (
        <label htmlFor="material-switch">
        <p>The switch is <span>{this.props.checked ? 'on' : 'off'}</span></p>
        <Switch
          onChange={this.props.onChange}
          checked={this.props.checked}
          onColor="#86d3ff"
          onHandleColor="#2693e6"
          handleDiameter={30}
          uncheckedIcon={false}
          checkedIcon={false}
          boxShadow="0px 1px 5px rgba(0, 0, 0, 0.6)"
          activeBoxShadow="0px 0px 1px 10px rgba(0, 0, 0, 0.2)"
          height={20}
          width={48}
          className="react-switch"
          id="material-switch"
        />
      </label>
      );
    }
  }

  export default SwitchExample;