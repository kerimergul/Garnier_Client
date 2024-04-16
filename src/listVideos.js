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
            deleteLoading: false,
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
                                id: response?.data?.video?._id
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
        // Seçili videoya eriş
        const selectedIndex = this.state.selectedVideos.indexOf(videoSkip);
        // Eğer seçili ise, listeden çıkar, değilse ekler
        if (selectedIndex === -1) {
            // Seçilmemiş, listeye ekle
            this.setState(prevState => ({
                selectedVideos: [...prevState.selectedVideos, videoSkip],
            }));
        } else {
            // Seçilmiş, listeden çıkar
            this.setState(prevState => ({
                selectedVideos: prevState.selectedVideos.filter(skip => skip !== videoSkip),
            }));

        }
    }

    handleDeleteSelected = () => {
        const { selectedVideos } = this.state;
        let idList = selectedVideos.map((e) => e._id);
        this.setState({ deleteLoading: true });
        axios.post("https://www.tesvik-sgk.com/signal/api/video/setPassive", { idList })
            .then(response => {
                console.log(['setPassive response', response?.data])
                this.setState({ deleteLoading: false });
            })
            .catch(error => {
                console.error("Error deleting selected videos:", error);
                this.setState({ deleteLoading: false });
            });
    }

    showSelectedVideo = () => {
        const { selectedVideos } = this.state;
        axios.post("https://www.tesvik-sgk.com/signal/api/video/setShowOnlyInStageScreen", { selectedVideos })
            .then(response => {
                this.setState({ selectedVideos: [] });
            })
            .catch(error => {
                console.error("Error show selected videos:", error);
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
                    <button class="button-7" onClick={this.showSelectedVideo} disabled={selectedVideos.length === 0}>
                        Sabit Ekranda Sadece Seçileni Göster
                    </button>
                    <button class="button-7" onClick={this.handleDeleteSelected} disabled={selectedVideos.length === 0}>
                        Seçilenleri Sil
                    </button>
                </div>
                <div class='row'>
                    <div>
                        {videos.map((video, index) => (
                            <div key={index}>
                                <span class='radioText' >Video No : {video.skip}</span>
                                <input style={{ margin: '10px', width: '10px', height: 'auto' }}
                                    type="radio"
                                    value={video.skip}
                                    checked={selectedVideos.includes(video.skip)}
                                    onClick={() => this.handleVideoSelect(video.skip)}
                                    title={video.skip}
                                />
                                <video controls style={{ margin: '10px' }} width={108} height={192} >
                                    <source src={`${video.data}`} type="video/mp4" width={108} height={192} />
                                    Your browser does not support the video tag.
                                </video>

                            </div>
                        ))}
                    </div>
                </div>

            </div>
        );
    }
}

export default ListVideos;