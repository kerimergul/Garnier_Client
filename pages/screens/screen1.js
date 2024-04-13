import React, { Component } from "react";
import "./screen1.css";
const style = { backgroundImage: 'url(/backgrounds/screen1_1440.jpg)' };

class Screen1 extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <div class="screen1-body"
        style={style}>
      </div>
    );

  }
}
export default Screen1;