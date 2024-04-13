import "./App.css";
import React, { Component } from "react";
import LandingScreen from "./screens/landingScreen";
import LandingScreen1080 from "./1080p/landingScreen1080p";
import UploadScreen from "./uploadScreen.js";
import _1080_1920 from "./framed_screens/1080_1920";

class App extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    let prevId = window.localStorage.getItem('id');
    if (!prevId) {
      let id = `${Math.floor(Math.random() * 99999)}`;
      window.localStorage.setItem('id', id);
    }


    //UPLOAD
    if (window.location.href.includes("/upload")) {
      return <UploadScreen></UploadScreen>
    }

    else if (window.location.href.includes("/_1080_1920")) {
      return <_1080_1920></_1080_1920>
    }
    else {
      return <LandingScreen></LandingScreen>;
    }
  }
}

export default App;
