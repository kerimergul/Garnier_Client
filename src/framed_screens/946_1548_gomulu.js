import React, { Component } from "react";
import '../styles/946_1548.css';

const style = { backgroundImage: 'url(/backgrounds/946_1548.png)' };

class _946_1548_Gomulu extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentVideoIndex: 0,
            videos: [
                "/videos/0.mp4",
                "/videos/1.mp4",
                "/videos/2.mp4",
                "/videos/3.mp4",
                "/videos/4.mp4",
                "/videos/5.mp4",
                "/videos/6.mp4",
                "/videos/7.mp4",
                "/videos/8.mp4",
                "/videos/9.mp4",
                "/videos/10.mp4",
                "/videos/11.mp4",
                "/videos/12.mp4",
                "/videos/13.mp4",
                "/videos/14.mp4",
                "/videos/15.mp4",
                "/videos/16.mp4",
                "/videos/17.mp4",
                "/videos/18.mp4",
                "/videos/19.mp4",
            ],
        };
    }

    componentDidMount() {
        this.loadVideo();
        this.interval = setInterval(this.loadVideo, 15000);
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }

    loadVideo = () => {
        const { currentVideoIndex, videos } = this.state;
        const videoElement = document.getElementById('video');
        videoElement.src = videos[currentVideoIndex];
        videoElement.load();
        videoElement.play();
        const nextIndex = (currentVideoIndex + 1) % videos.length;
        this.setState({ currentVideoIndex: nextIndex });
    }

    render() {
        return (
            <div id="bg" className="bg" style={style}>
                <video id="video" loop className="video_946_1548" height="1516.8" width="708.48" autoPlay="true" muted="true"></video>
                <div className="hole"></div>
                <div id="serial" class="serial_946_1548">MAT-TR-2400608</div>
            </div>
        );
    }
}

export default _946_1548_Gomulu;