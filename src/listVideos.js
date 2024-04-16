import React, { Component } from "react";
import axios from "axios";

class ListVideos extends Component {
    constructor(props) {
        super(props);
        this.state = {
            videos: [],
            selectedVideos: [],
            skip: 0,
        };
    }

    componentDidMount() {
        this.fetchVideos();
    }

    fetchVideos = () => {
        const { skip } = this.state;
        axios.post("https://www.tesvik-sgk.com/signal/api/video/getVideo", { skip: skip })
            .then(response => {
                if (response.data.status) {
                    if (response?.data?.video?.data) {
                        let videoData = [{
                            data: response?.data?.video?.data,
                            skip: prevState.skip
                        }]
                        this.setState(prevState => ({
                            skip: prevState.skip + 1,
                            videos: [...prevState.videos, ...videoData],
                        }), this.fetchVideos);
                    } else {
                        this.setState(prevState => ({
                            skip: prevState.skip + 1,
                        }), this.fetchVideos);
                    }
                } else {
                    this.setState(prevState => ({

                    }));
                }
            })
            .catch(error => {
                console.error("Error fetching videos:", error);
            });
    }

    handleVideoSelect = (videoSkip) => {
        this.setState(prevState => ({
            selectedVideos: [...prevState.selectedVideos, videoSkip],
        }));
    }

    handleDeleteSelected = () => {
        const { selectedVideos } = this.state;
        axios.post("delete_api_url", { selectedVideos })
            .then(response => {
                this.setState({ selectedVideos: [] });
            })
            .catch(error => {
                console.error("Error deleting selected videos:", error);
            });
    }

    render() {
        const { videos, selectedVideos } = this.state;
        return (
            <div>
                <div>
                    {videos.map((video, index) => (
                        <div key={index}>
                            {/* Her video için video etiketi oluştur */}
                            <video controls>
                                <source src={`data:video/mp4;base64,${video.data}`} type="video/mp4" />
                                Your browser does not support the video tag.
                            </video>
                            <input
                                type="radio"
                                value={video.skip}
                                checked={selectedVideos.includes(video.skip)}
                                onChange={() => this.handleVideoSelect(video.skip)}
                                title={video.skip}
                            />
                        </div>
                    ))}
                </div>
                <button onClick={this.handleDeleteSelected} disabled={selectedVideos.length === 0}>
                    Seçilenleri Sil
                </button>
            </div>
        );
    }
}

export default ListVideos;