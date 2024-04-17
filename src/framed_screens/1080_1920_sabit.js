import React, { Component } from "react";
import axios from "axios";
import '../styles/1080_1920.css';
import '../styles/serial.css';

const style = { backgroundImage: 'url(/backgrounds/1080_1920.png)' };

class _1080_1920_Sabit extends Component {
    constructor(props) {
        super(props);
        this.state = {
            video: "",
            skip: 0,
            first: true,
            visibleVideo: 'video2',
            firstLoad: true,
        };
    }

    componentDidMount() {
        console.log('componentDidMount')
        this.firstLoadVideo();
        this.interval = setInterval(this.loadVideo, 15000);
    }

    componentWillUnmount() {
        console.log('componentWillUnmount')
        clearInterval(this.interval);
    }

    componentDidUpdate() {
        console.log(['this.state.skip', this.state.skip, 'this.state.visibleVideo', this.state.visibleVideo])
        let visibleVideo = this.state.visibleVideo;
        if (!this.state.firstLoad) {
            document.getElementById('video').hidden = visibleVideo !== 'video';
            document.getElementById('video2').hidden = visibleVideo !== 'video2';
        }
    }

    setNextVisibleVideo = (visibleVideo) => {
        return visibleVideo === 'video' ? 'video2' : 'video';
    }

    getVisibleElement = (visibleVideo, first) => {
        let newVisibleElement = visibleVideo;
        return document.getElementById(newVisibleElement);
    }

    loadVideo = () => {
        console.log('loadVideo')
        const { skip, first } = this.state;
        axios.post("https://www.tesvik-sgk.com/signal/api/video/getVideoSelected", { skip })
            .then((res) => {
                if (res?.data?.status === true) {
                    const videoElement = this.getVisibleElement(this.state.visibleVideo, this.state.first)
                    videoElement.src = res?.data?.video?.data;
                    videoElement.load();
                    if (res?.data?.count == 1) {
                        this.setState(() => ({
                            skip: res?.data?.count,
                            first: false,
                            visibleVideo: 'video',
                            firstLoad: false
                        }));
                    } else {
                        this.setState(prevState => ({
                            skip: res?.data?.count,
                            first: false,
                            visibleVideo: this.setNextVisibleVideo(prevState.visibleVideo),
                            firstLoad: false
                        }));
                    }

                } else {
                }
            })
            .catch((err) => {
                console.log(err);
            })
    }

    firstLoadVideo = () => {
        console.log('firstLoadVideo')
        let skip = 0;
        axios.post("https://www.tesvik-sgk.com/signal/api/video/getVideoSelected", { skip })
            .then((res) => {
                if (res?.data?.status === true) {
                    const videoElement = document.getElementById('video');
                    videoElement.src = res?.data?.video?.data;
                    videoElement.load();
                    this.setState(() => ({
                        // skip: res?.data?.count,
                        first: false,
                        // firstLoad: true
                    }));
                    videoElement.hidden = false;
                } else {
                }
            })
            .catch((err) => {
                console.log(err);
            })
    }

    render() {
        return (
            <div id="bg" className="bg" style={style}>
                <video id="video" loop className="video_1080_1920" height="1516.8" width="708.48" autoPlay="true" muted="true"></video>
                <video id="video2" loop className="video_1080_1920" height="1516.8" width="708.48" autoPlay="true" muted="true"></video>
                <div className="hole"></div>
                <div id="serial" class="serial">MAT-TR-2400608</div>
            </div>
        );
    }
}

export default _1080_1920_Sabit;