import React, { Component } from "react";
import Screen1 from "./screen1";
import Screen2 from "./screen2";
import Screen3 from "./screen3";
import Screen4 from "./screen4";

class LandingScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentView: "screen1",
    };
  }

  async componentDidMount() {
    this.interval = setInterval(async () => {
      this.changeViewLoop(this.state.currentView);
    }, 15000);
  }


  changeViewLoop() {
    if (this.state.currentView == "screen1") {
      this.setState({
        currentView: "screen2",
      })
    } else if (this.state.currentView == "screen2") {
      this.setState({
        currentView: "screen3",
      })
    }
    else if (this.state.currentView == "screen3") {
      this.setState({
        currentView: "screen4",
      })
    }
    else if (this.state.currentView == "screen4") {
      this.setState({
        currentView: "screen1",
      })
    }
  }

  checkScreen() {
    var currentScreen = this.state.currentView;
    if (currentScreen == "screen1") {
      return (<Screen1></Screen1>);
    } else if (currentScreen == "screen2") {
      return (<Screen2></Screen2>);
    } else if (currentScreen == "screen3") {
      return (<Screen3></Screen3>);
    } else if (currentScreen == "screen4") {
      return (<Screen4></Screen4>)
    }
  }

  render() {
    return (this.checkScreen());
  }
}
export default LandingScreen;