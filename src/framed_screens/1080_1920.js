import React, { Component } from "react";
// import "./style.css";
import axios from "axios";
import './1080_1920.css';
const style = { backgroundImage: 'url(/backgrounds/1080_1920.png)' };



class _1080_1920 extends Component {
    constructor(props) {
        super(props);
        this.state = {
            video: "",
            skip: 0,
            first: true,
        };
    }
    componentDidMount() {
        if (this.state.first === true) {
            this.getImg();
        }
        this.interval = setInterval(async () => {
            this.getImg();
        }, 6000)
    }

    getImg() {
        let skip = this.state.skip;

        axios.post("https://www.tesvik-sgk.com/signal/api/video/getVideo", { skip }).then((res) => {
            if (res?.data?.status === true) {
                console.log(res?.data);
                var videoElement = document.getElementById('video');
                videoElement.src = res?.data?.video?.data;
                videoElement.load();
                this.setState({
                    // video: res?.data?.video?.data,
                    skip: skip,
                    first: false
                })
            } else {
                alert('Video yüklenirken hata oluştu')
            }
        }).catch((err) => {
            alert("Video yüklenirken hata oluştu");
            console.log(err);
        })
    }

    componentWillUnmount() { clearInterval(this.interval) }

    render() {
        return (
            <div id="bg" class="bg" style={style}>
                <video id="video" loop class="video" height="1516.8" width="708.48" autoplay="true" muted="true">
                </video>
                <div class="hole">
                </div>
            </div>
        );

    }
}
export default _1080_1920;
