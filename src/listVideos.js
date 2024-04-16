import React, { Component } from "react";
import axios from "axios";

class ListVideos extends Component {
    constructor(props) {
        super(props);
        this.state = {
            videos: [],
            selectedVideos: [],
            skip: 0, // Skip değerini state içinde tut
        };
    }

    componentDidMount() {
        // İlk sorguyu yap
        this.fetchVideos();
    }

    fetchVideos = () => {
        const { skip } = this.state;
        axios.post("https://www.tesvik-sgk.com/signal/api/video/getVideo", { skip: skip })
            .then(response => {
                if (response.data.status) {
                    // Status true ise skip değerini artır ve yeni bir sorgu yap
                    this.setState(prevState => ({
                        skip: prevState.skip + 1,
                    }), this.fetchVideos);
                } else {
                    // Status false ise videoları state'e ekle
                    this.setState(prevState => ({
                        videos: [...prevState.videos, ...response.data],
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
                <button onClick={this.handleDeleteSelected} disabled={selectedVideos.length === 0}>
                    Seçilenleri Sil
                </button>
                <div>
                    {videos.map(video => (
                        <div key={video.id}>
                            <img src={video.thumbnail} alt="Video Thumbnail" />
                            <input
                                type="radio"
                                value={video.skip}
                                checked={selectedVideos.includes(video.skip)}
                                onChange={() => this.handleVideoSelect(video.skip)}
                            />
                        </div>
                    ))}
                </div>                
            </div>
        );
    }
}

export default ListVideos;