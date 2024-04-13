import React, { Component } from "react";
import "./stand.css";
// import header from '../images/gulus.png';
// import flash from '../images/flash5.png';
const style = { backgroundImage: 'url(/backgrounds/sabit.webp)' };
const style_img = {
    width: '100%',
    height: '100%',
};

class _384_960_Stand extends Component {
    constructor(props) {
        super(props);
        this.state = {
            img: false,
            skip: 0,
            first: true,
        };
    }

    render() {
        return (
            <div class="bg_vertical"
                style={style}>
                {/* <div id="container">
                    <img
                        class='pulsate-fwd'
                        src={header}
                        style={
                            style_img
                        }
                        id="img1"
                    ></img>
                    <img
                        class='blink-1'
                        src={flash}
                        style={
                            style_img
                        }
                        id="img2"
                    ></img>
                </div> */}
            </div>
        );

    }
}
export default _384_960_Stand;

