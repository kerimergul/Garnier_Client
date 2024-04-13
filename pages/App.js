import "./App.css";
import React, { Component } from "react";
import LandingScreen from "./screens/landingScreen";
import LandingScreen1080 from "./1080p/landingScreen1080p";


class App extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    console.log(window.location.href);
    if (window.location.href.includes("/1080p")) {
      console.log('1080p');
      return <LandingScreen1080></LandingScreen1080>
    } else {
      console.log('default pixel');
      return <LandingScreen></LandingScreen>;
    }
  }
}

export default App;
