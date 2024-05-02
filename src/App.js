import "./App.css";
import React, { Component } from "react";
import LandingScreen from "./screens/landingScreen";
import LandingScreen1080 from "./1080p/landingScreen1080p";
import UploadScreen from "./uploadScreen.js";
import AdminPanel from "./AdminPanel.js";

import _1080_1920_Sabit from "./framed_screens/1080_1920_sabit";

import _512_786_Gomulu from "./framed_screens/512_786_gomulu";
import _1280_704_Gomulu from "./framed_screens/1280_704_gomulu";
import _1920_1152_Gomulu from "./framed_screens/1920_1152_gomulu";
import _1548_946_Gomulu from "./framed_screens/1548_946_gomulu";
import _1152_1920_Gomulu from "./framed_screens/1152_1920_gomulu";
import _1152_704_Gomulu from "./framed_screens/1152_704_gomulu";
import _1080_1920_Gomulu from "./framed_screens/1080_1920_gomulu";
import _1024_640_Gomulu from "./framed_screens/1024_640_gomulu";
import _864_720_Gomulu from "./framed_screens/864_720_gomulu";
import _1920_1080_Gomulu from "./framed_screens/1920_1080_gomulu";
import _1440_1080_Gomulu from "./framed_screens/1440_1080_gomulu";
import _2160_3840_Gomulu from "./framed_screens/2160_3840_gomulu";
import _640_1024_Gomulu from "./framed_screens/640_1024_gomulu";
import _704_1152_Gomulu from "./framed_screens/704_1152_gomulu";
import _704_1280_Gomulu from "./framed_screens/704_1280_gomulu";
import _720_864_Gomulu from "./framed_screens/720_864_gomulu";
import _946_1548_Gomulu from "./framed_screens/946_1548_gomulu";

import _512_786 from "./framed_screens/512_786";
import _640_1024 from "./framed_screens/640_1024";
import _704_1152 from "./framed_screens/704_1152";
import _704_1280 from "./framed_screens/704_1280";
import _720_864 from "./framed_screens/720_864";
import _864_720 from "./framed_screens/864_720";
import _946_1548 from "./framed_screens/946_1548";
import _1024_640 from "./framed_screens/1024_640";
import _1080_1920 from "./framed_screens/1080_1920";
import _1152_704 from "./framed_screens/1152_704";
import _1152_1920 from "./framed_screens/1152_1920";
import _1280_704 from "./framed_screens/1280_704";
import _1440_1080 from "./framed_screens/1440_1080";
import _1548_946 from "./framed_screens/1548_946";
import _1920_1080 from "./framed_screens/1920_1080";
import _1920_1152 from "./framed_screens/1920_1152";
import _2160_3840 from "./framed_screens/2160_3840";

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

    else if (window.location.href.includes("/sabit")) {
      return <_1080_1920_Sabit></_1080_1920_Sabit>
    }

    else if (window.location.href.includes("/_512_786_gomulu")) {
      return <_512_786_Gomulu></_512_786_Gomulu>
    }
    else if (window.location.href.includes("/_1280_704_gomulu")) {
      return <_1280_704_Gomulu></_1280_704_Gomulu>
    }
    else if (window.location.href.includes("/_1920_1152_gomulu")) {
      return <_1920_1152_Gomulu></_1920_1152_Gomulu>
    }
    else if (window.location.href.includes("/_1548_946_gomulu")) {
      return <_1548_946_Gomulu></_1548_946_Gomulu>
    }
    else if (window.location.href.includes("/_1152_704_gomulu")) {
      return <_1152_704_Gomulu></_1152_704_Gomulu>
    }
    else if (window.location.href.includes("/_1080_1920_gomulu")) {
      return <_1080_1920_Gomulu></_1080_1920_Gomulu>
    }
    else if (window.location.href.includes("/_1024_640_gomulu")) {
      return <_1024_640_Gomulu></_1024_640_Gomulu>
    }
    else if (window.location.href.includes("/_864_720_gomulu")) {
      return <_864_720_Gomulu></_864_720_Gomulu>
    }
    else if (window.location.href.includes("/_1920_1080_gomulu")) {
      return <_1920_1080_Gomulu></_1920_1080_Gomulu>
    }


    else if (window.location.href.includes("/_1152_1920_gomulu")) {
      return <_1152_1920_Gomulu></_1152_1920_Gomulu>
    } 
    else if (window.location.href.includes("/_1440_1080_gomulu")) {
      return <_1440_1080_Gomulu></_1440_1080_Gomulu>
    }
     else if (window.location.href.includes("/_2160_3840_gomulu")) {
      return <_2160_3840_Gomulu></_2160_3840_Gomulu>
    }
     else if (window.location.href.includes("/_640_1024_gomulu")) {
      return <_640_1024_Gomulu></_640_1024_Gomulu>
    }
     else if (window.location.href.includes("/_704_1152_gomulu")) {
      return <_704_1152_Gomulu></_704_1152_Gomulu>
    }
     else if (window.location.href.includes("/_704_1280_gomulu")) {
      return <_704_1280_Gomulu></_704_1280_Gomulu>
    }
     else if (window.location.href.includes("/_720_864_gomulu")) {
      return <_720_864_Gomulu></_720_864_Gomulu>
    }
     else if (window.location.href.includes("/_946_1548_gomulu")) {
      return <_946_1548_Gomulu></_946_1548_Gomulu>
    }
    

    else if (window.location.href.includes("/_512_786")) {
      return <_512_786></_512_786>
    }
    else if (window.location.href.includes("/_640_1024")) {
      return <_640_1024></_640_1024>
    }
    else if (window.location.href.includes("/_704_1152")) {
      return <_704_1152></_704_1152>
    }
    else if (window.location.href.includes("/_704_1280")) {
      return <_704_1280></_704_1280>
    }
    else if (window.location.href.includes("/_720_864")) {
      return <_720_864></_720_864>
    }
    else if (window.location.href.includes("/_864_720")) {
      return <_864_720></_864_720>
    }
    else if (window.location.href.includes("/_946_1548")) {
      return <_946_1548></_946_1548>
    }
    else if (window.location.href.includes("/_1024_640")) {
      return <_1024_640></_1024_640>
    }
    else if (window.location.href.includes("/_1080_1920")) {
      return <_1080_1920></_1080_1920>
    }
    else if (window.location.href.includes("/_1152_704")) {
      return <_1152_704></_1152_704>
    }
    else if (window.location.href.includes("/_1152_1920")) {
      return <_1152_1920></_1152_1920>
    }
    else if (window.location.href.includes("/_1280_704")) {
      return <_1280_704></_1280_704>
    }
    else if (window.location.href.includes("/_1440_1080")) {
      return <_1440_1080></_1440_1080>
    }
    else if (window.location.href.includes("/_1548_946")) {
      return <_1548_946></_1548_946>
    }
    else if (window.location.href.includes("/_1920_1080")) {
      return <_1920_1080></_1920_1080>
    }
    else if (window.location.href.includes("/_1920_1152")) {
      return <_1920_1152></_1920_1152>
    }
    else if (window.location.href.includes("/_2160_3840")) {
      return <_2160_3840></_2160_3840>
    }

    else {
      return <LandingScreen></LandingScreen>;
    }
  }
}

export default App;
