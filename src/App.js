import "./App.css";
import React, { Component } from "react";
import LandingScreen from "./screens/landingScreen";
import UploadScreen from "./uploadScreen.js";
import AdminPanel from "./AdminPanel.js";

import _1080_1920_Garnier from "./framed_screens/1080_1920_garnier";
import _624_1040_Garnier from "./framed_screens/624_1040_garnier";
import _640_1040_Garnier from "./framed_screens/640_1040_garnier";
import _640_1120_Garnier from "./framed_screens/640_1120_garnier";
import _768_1280_Garnier from "./framed_screens/768_1280_garnier";
import _768_1344_Garnier from "./framed_screens/768_1344_garnier";
import _864_1440_Garnier from "./framed_screens/864_1440_garnier";
import _1680_1008_Garnier from "./framed_screens/1680_1008_garnier";


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
    } else if (window.location.href.includes("/_624_1040")) {
      return <_624_1040_Garnier></_624_1040_Garnier>
    } else if (window.location.href.includes("/_640_1040")) {
      return <_640_1040_Garnier></_640_1040_Garnier>
    } else if (window.location.href.includes("/_640_1120")) {
      return <_640_1120_Garnier></_640_1120_Garnier>
    } else if (window.location.href.includes("/_768_1280")) {
      return <_768_1280_Garnier></_768_1280_Garnier>
    } else if (window.location.href.includes("/_768_1344")) {
      return <_768_1344_Garnier></_768_1344_Garnier>
    } else if (window.location.href.includes("/_864_1440")) {
      return <_864_1440_Garnier></_864_1440_Garnier>
    } else if (window.location.href.includes("/_1680_1008")) {
      return <_1680_1008_Garnier></_1680_1008_Garnier>
    }

    else {
      return <LandingScreen></LandingScreen>;
    }
  }
}

export default App;
