import React, { Component } from "react";
import "./uploadScreen.css";
import imageCompression from 'browser-image-compression';
import axios from "axios";
import blobcnv from "blob-to-base64";

const specs = [{ width: 1080, height: 1920 }, { width: 480, height: 720 }, { width: 576, height: 864 }, { width: 768, height: 1152 }];


class UploadScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            data: false,
        };
    }

    setData(data) {
        this.setState({
            data: data
        })
    }

    async uploadToServer(data) {
        alert('Yükleme işlemi başladı.')
        try {
            blobcnv(data, function (error, video) {
                if (error) {
                    throw error;
                }
                axios.post("https://www.tesvik-sgk.com/signal/api/video/upload", { video }).then((res) => {
                    console.log(res);
                    if (res?.data?.status === true) {
                        alert("video başarıyla yüklendi");
                    } else {
                        alert('video yüklenirken hata oluştu')
                    }
                }).catch((err) => {
                    alert("video yüklenirken hata oluştu");
                    console.log(err);
                })
            })
        } catch (err) {
            console.log(err);
        }
    }


    async downloadImage(data) {
        console.log(data);
        return;
    }

    async handleImageUpload(event) {
        console.log('trigger handle image upload');
        const videoFile = event.target.files[0];
        console.log('originalFile instanceof Blob', videoFile instanceof Blob); // true
        console.log(`originalFile size ${videoFile.size / 1024 / 1024} MB`);

        try {
            this.uploadToServer(videoFile);

            this.setState({
                data: videoFile
            })


        } catch (error) {
            console.log(error);
        }
        return;
    }

    renderDifferentSizeImg() {
        return specs.map((sp, i) => {
            return this.returnImgWithSpec({ keys: i, width: sp.width, height: sp.height, title: JSON.stringify(sp) })
        })
    }

    returnImgWithSpec({ key, width, height, title }) {
        return (
            <div class="image-card">
                <header>
                    <h4>{title}</h4>
                </header>
                <img src={URL.createObjectURL(this.state.data)} width={width} height={height} alt={key}></img>
            </div>
        )
    }


    render() {
        return (
            <div class="col">
                <div class="container">
                    <div class="card">
                        <h3>Pharmaton Video Yükle</h3>
                        <div class="drop_box">
                            <header>
                                <h4>Dosyayı seçiniz (1080x1920)</h4>
                            </header>
                            <p>Desteklenen dosya tipleri: MP4</p>
                            <input type="file" accept="video/*" id="fileID" class="input-image" onChange={(e) => this.handleImageUpload(e)} />
                            {/* <button class="btn" onChange={this.handleImageUpload}>Gözat</button> */}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
export default UploadScreen;