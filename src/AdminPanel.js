import React, { Component } from "react";
import axios from "axios";
import './listVideos.css';
import { saveAs } from 'file-saver';


class AdminPanel extends Component {
    constructor(props) {
        super(props);
        this.state = {
            images: [],
            selectedimages: [],
            skip: 0,
            stop: false,
            deleteLoading: false,
        };
    }

    componentDidMount() {
        this.fetchimages();
    }


    downloadAll = () => {
        const { images } = this.state;
        images.forEach((img) => {
            try {
                saveAs(img?.data, img?.no);
            } catch (error) {
                console.error(error);
            }
        })

    }


    fetchimages = () => {
        if (!this.state.stop) {
            const { skip } = this.state;
            let list = true;
            axios.post("https://www.tesvik-sgk.com/signal/api/image/getImage", { skip: skip, list })
                .then(response => {
                    console.log(response);
                    if (response.data.status) {
                        if (response?.data?.image?.data) {
                            let imageData = [{
                                data: response?.data?.image?.data,
                                skip: response?.data?.image?.no,
                                id: response?.data?.image?._id,
                                active: response?.data?.image?.active
                            }]
                            this.setState(prevState => ({
                                skip: prevState.skip + 1,
                                images: [...prevState.images, ...imageData],
                            }), this.fetchimages);
                        } else {
                            this.setState(prevState => ({
                                skip: prevState.skip + 1,
                            }), this.fetchimages);
                        }
                    } else {
                        this.setState(prevState => ({
                            stop: true,
                        }));
                    }
                })
                .catch(error => {
                    console.error("Error fetching images:", error);
                });
        }
    }

    handleimageSelect = (imageSkip) => {
        // Seçili imageya eriş
        const selectedIndex = this.state.selectedimages.indexOf(imageSkip);
        // Eğer seçili ise, listeden çıkar, değilse ekler
        if (selectedIndex === -1) {
            // Seçilmemiş, listeye ekle
            this.setState(prevState => ({
                selectedimages: [...prevState.selectedimages, imageSkip],
            }));
        } else {
            // Seçilmiş, listeden çıkar
            this.setState(prevState => ({
                selectedimages: prevState.selectedimages.filter(skip => skip !== imageSkip),
            }));

        }
    }

    handleDeleteSelected = () => {
        const { selectedimages, images } = this.state;
        console.log(selectedimages);
        let idList = [];
        let newimagesList = [];
        selectedimages.forEach((s) => {
            images.forEach((e) => {
                if (e.skip === s) {
                    idList.push(e.id);
                } else {
                    console.log()
                    newimagesList.push(e);
                }
            });
        });
        this.setState({ deleteLoading: true });
        let skipList = selectedimages;
        axios.post("https://www.tesvik-sgk.com/signal/api/image/setPassive", { idList, skipList })
            .then(response => {
                this.setState(prevState => ({
                    deleteLoading: false,
                    images: newimagesList
                }));
            })
            .catch(error => {
                alert("Error deleting selected images:", error);
                this.setState({ deleteLoading: false });
            });
    }

    showSelectedimage = () => {
        const { selectedimages } = this.state;
        let skipNoList = selectedimages;
        axios.post("https://www.tesvik-sgk.com/signal/api/image/setShowOnlyInStageScreen", { skipNoList })
            .then(response => {
                alert("Sabit Ekranda Gösterilecek image No'ları :", JSON.stringify(selectedimages));
                this.setState({ selectedimages: [] });
            })
            .catch(error => {
                console.error("Error show selected images:", error);
            });
    }


    render() {
        const { images, selectedimages } = this.state;
        return (
            <div class='screen'>
                <header>
                    <h4>Yüklenmiş imagelar {images.filter((e) => e.active).length} Adet</h4>
                </header>
                <div class='row'>
                    <button class="button-7" onClick={this.downloadAll} disabled={selectedimages.length === 0}>
                        Hepsini İndir
                    </button>
                    <button class="button-7" onClick={this.showSelectedimage} disabled={selectedimages.length === 0}>
                        Sabit Ekranda Sadece Seçileni Göster
                    </button>
                    <button class="button-7" onClick={this.handleDeleteSelected} disabled={selectedimages.length === 0}>
                        Seçilenleri Sil
                    </button>
                </div>
                <div class='row'>
                    <div>
                        {images.map((image, index) => (
                            image.active && (
                                <div key={index}>
                                    <span className='radioText'>image No: {image.skip}</span>
                                    <input
                                        style={{ margin: '10px', width: '10px', height: 'auto' }}
                                        type="radio"
                                        value={image.skip}
                                        checked={selectedimages.includes(image.skip)}
                                        onClick={() => this.handleimageSelect(image.skip)}
                                        title={image.skip}
                                    />
                                    <img style={{ margin: '10px' }} width={108} height={192} src={`${image?.data}`} />
                                    <span className='radioText'></span>
                                </div>
                            )
                        ))}
                    </div>
                </div>

            </div>
        );
    }
}

export default AdminPanel;