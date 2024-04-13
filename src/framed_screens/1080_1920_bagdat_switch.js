import React, { Component } from "react";
import Stand from "./1080_1920_stand";
import _2160_3840_Bagdat from "./2160_3840_bagdat.js";

const photoThreshold = 200;
const standThreshold = 50;

class _1080_1920_Bagdat_Switch extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentView: "stand",
            standTime: 0,
            photoTime: 40,
        };
    }

    async componentDidMount() {
        this.timer = setInterval(async () => {
            this.checkTime();
        }, 10000);
    }

    componentWillUnmount() { clearInterval(this.timer) }


    checkTime() {
        if (this.state.currentView == 'stand' && this.state.standTime >= standThreshold) {
            this.setState({
                currentView: "photo",
                photoTime: 0,
            })
        } else if (this.state.currentView == 'stand' && this.state.standTime < standThreshold) {
            this.setState({
                standTime: this.state.standTime + 10,
            })
        }

        if (this.state.currentView == 'photo' && this.state.photoTime >= photoThreshold) {
            this.setState({
                currentView: "stand",
                standTime: 0,
            })
        } else if (this.state.currentView == 'photo' && this.state.photoTime < photoThreshold) {
            this.setState({
                photoTime: this.state.photoTime + 10,
            })
        }
    }


    checkScreen() {
        var currentScreen = this.state.currentView;
        if (currentScreen == "stand") {
            return (<Stand></Stand>);
        } else if (currentScreen == "photo") {
            return (<_2160_3840_Bagdat></_2160_3840_Bagdat>);
        }
    }

    render() {
        return (this.checkScreen());
    }
}
export default _1080_1920_Bagdat_Switch;