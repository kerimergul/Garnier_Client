import React, { Component } from "react";
import "./style.css";
const style = { backgroundImage: 'url(/backgrounds/bg_1080_1920_giris-min.jpg)' };
const style_img = {
    width: '100%',
    height: '100%',
};

class _1080_1920_Giris extends Component {
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
            </div>
        );

    }
}
export default _1080_1920_Giris;

