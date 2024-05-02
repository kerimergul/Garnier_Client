import "./App.css";
import React, { Component } from "react";
import LandingScreen from "./screens/landingScreen";
import UploadScreen from "./uploadScreen.js";
import AdminPanel from "./AdminPanel.js";

import _1080_1920_Garnier from "./framed_screens/1080_1920_garnier";


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

    else if (window.location.href.includes("/adminpanel")) {
      return <AdminPanel></AdminPanel>
    }

    else if (window.location.href.includes("/_1080_1920")) {
      return <_1080_1920_Garnier></_1080_1920_Garnier>
    }

    else {
      return <LandingScreen></LandingScreen>;
    }
  }
}

export default App;
