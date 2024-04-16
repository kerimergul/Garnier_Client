import React, { Component } from "react";
import axios from "axios";
import './listVideos.css';

class ListVideos extends Component {
    constructor(props) {
        super(props);
        this.state = {
            videos: [],
            selectedVideos: [],
            skip: 0,
            stop: false,
        };
    }

    componentDidMount() {
        this.fetchVideos();
    }


    fetchVideos = () => {
        if (!this.state.stop) {
            const { skip } = this.state;
            let list = true;
            axios.post("https://www.tesvik-sgk.com/signal/api/video/getVideo", { skip: skip, list })
                .then(response => {
                    if (response.data.status) {
                        if (response?.data?.video?.data) {
                            let videoData = [{
                                data: response?.data?.video?.data,
                                skip: skip,
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
                            stop: true,
                        }));
                    }
                })
                .catch(error => {
                    console.error("Error fetching videos:", error);
                });
        }
    }

    handleVideoSelect = (videoSkip) => {
        console.log(['handleVideoSelect', videoSkip])
        // Seçili videoya eriş
        const selectedIndex = this.state.selectedVideos.indexOf(videoSkip);
        console.log(['selectedIndex', selectedIndex])
        // Eğer seçili ise, listeden çıkar, değilse ekler
        if (selectedIndex === -1) {
            // Seçilmemiş, listeye ekle
            this.setState(prevState => ({
                selectedVideos: [...prevState.selectedVideos, videoSkip],
            }));
        } else {
            console.log(['Seçilmiş, listeden çıkar', videoSkip])
            // Seçilmiş, listeden çıkar
            this.setState(prevState => ({
                selectedVideos: prevState.selectedVideos.filter(skip => skip !== videoSkip),
            }));
            console.log(['Çıkarılmış liste', this.state.selectedVideos.map((e) => e.skip)])

        }
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
            <div class='screen'>
                <header>
                    <h4>Yüklenmiş Videolar</h4>
                </header>
                <div class='row'>
                    <div>
                        {videos.map((video, index) => (
                            <div key={index}>
                                <input style={{ margin: '10px', width: '10px', height: 'auto' }}
                                    type="radio"
                                    value={video.skip}
                                    checked={selectedVideos.includes(video.skip)}
                                    onChange={() => this.handleVideoSelect(video.skip)}
                                    title={video.skip}
                                />
                                <video controls style={{ margin: '10px' }} width={108} height={192} >
                                    <source src={`${video.data}`} type="video/mp4" width={108} height={192} />
                                    Your browser does not support the video tag.
                                </video>

                            </div>
                        ))}
                    </div>
                    <button class="button-7" onClick={this.handleDeleteSelected} disabled={selectedVideos.length === 0}>
                        Seçilenleri Sil
                    </button>
                </div>

            </div>
        );
    }
}

export default ListVideos;