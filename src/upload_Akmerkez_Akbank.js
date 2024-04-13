import React, { Component } from "react";
import "./uploadScreen.css";
import imageCompression from 'browser-image-compression';
import axios from "axios";
import blobcnv from "blob-to-base64";

const specs = [{ width: 1080, height: 1920 }, { width: 480, height: 720 }, { width: 576, height: 864 }, { width: 768, height: 1152 }];


class UploadAkmerkez_AkbankScreen extends Component {
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

    async uploadToServer(data, type) {
        alert(type + ' Ölçülü resim için yükleme işlemi başladı.')
        try {
            blobcnv(data, function (error, img) {
                if (error) {
                    throw error;
                }
                axios.post("https://www.tesvik-sgk.com/signal/image/uploadAkmerkez", { img, type }).then((res) => {
                    console.log(res);
                    if (res?.data?.status === true) {
                        alert(type + " Ölçülü resim başarıyla yüklendi");
                    } else {
                        alert(type + ' Ölçülü resim yüklenirken hata oluştu')
                    }
                }).catch((err) => {
                    alert(type + " Ölçülü resim  yüklenirken hata oluştu");
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

    async handleImageUpload(event, type) {
        console.log('trigger handle image upload');
        const imageFile = event.target.files[0];
        console.log('originalFile instanceof Blob', imageFile instanceof Blob); // true
        console.log(`originalFile size ${imageFile.size / 1024 / 1024} MB`);

        const options = {
            maxSizeMB: 1,
            maxWidthOrHeight: 1920,
            useWebWorker: true,
        }
        try {
            const compressedFile = await imageCompression(imageFile, options);
            console.log('compressedFile instanceof Blob', compressedFile instanceof Blob); // true
            console.log(`compressedFile size ${compressedFile.size / 1024 / 1024} MB`); // smaller than maxSizeMB
            console.log(compressedFile)

            this.uploadToServer(compressedFile, type);

            this.setState({
                data: compressedFile
            })


        } catch (error) {
            console.log(error);
        }
        return;
    }
    // <input type="file" accept="image/*" onChange={this.handleImageUpload}></input>

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
                    <div class="col">
                        <div class="row">
                            <div class="col">
                                <div class="card">
                                    <h3>Akmerkez Akbank için Resim Yükle</h3>
                                    <div class="drop_box">
                                        <header>
                                            <h4>384x960 için dosyayı seçiniz</h4>
                                        </header>
                                        <p>Desteklenen dosya tipleri: JPEG, JPG, PNG</p>
                                        <input type="file" accept="image/*" id="fileID" class="input-image" onChange={(e) => this.handleImageUpload(e, '384x960_akmerkez')} />
                                        {/* <button class="btn" onChange={this.handleImageUpload}>Gözat</button> */}
                                    </div>
                                </div>
                            </div>
                            <div class="col">
                                <div class="card">
                                    <h3>Akmerkez Akbank için Resim Yükle</h3>
                                    <div class="drop_box">
                                        <header>
                                            <h4>960x2016 için dosyayı seçiniz</h4>
                                        </header>
                                        <p>Desteklenen dosya tipleri: JPEG, JPG, PNG</p>
                                        <input type="file" accept="image/*" id="fileID" class="input-image" onChange={(e) => this.handleImageUpload(e, '960x2016_akmerkez')} />
                                        {/* <button class="btn" onChange={this.handleImageUpload}>Gözat</button> */}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col">
                                <div class="card">
                                    <h3>Akmerkez Akbank için Resim Yükle</h3>
                                    <div class="drop_box">
                                        <header>
                                            <h4>1080x1920 için dosyayı seçiniz</h4>
                                        </header>
                                        <p>Desteklenen dosya tipleri: JPEG, JPG, PNG</p>
                                        <input type="file" accept="image/*" id="fileID" class="input-image" onChange={(e) => this.handleImageUpload(e, '1080x1920_akmerkez')} />
                                        {/* <button class="btn" onChange={this.handleImageUpload}>Gözat</button> */}
                                    </div>
                                </div>
                            </div>
                            <div class="col">
                                <div class="card">
                                    <h3>Akmerkez Akbank için Resim Yükle</h3>
                                    <div class="drop_box">
                                        <header>
                                            <h4>1344x416 için dosyayı seçiniz</h4>
                                        </header>
                                        <p>Desteklenen dosya tipleri: JPEG, JPG, PNG</p>
                                        <input type="file" accept="image/*" id="fileID" class="input-image" onChange={(e) => this.handleImageUpload(e, '1344x416_akmerkez')} />
                                        {/* <button class="btn" onChange={this.handleImageUpload}>Gözat</button> */}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col">
                                <div class="card">
                                    <h3>Akmerkez Akbank için Resim Yükle</h3>
                                    <div class="drop_box">
                                        <header>
                                            <h4>2160x3840 için dosyayı seçiniz</h4>
                                        </header>
                                        <p>Desteklenen dosya tipleri: JPEG, JPG, PNG</p>
                                        <input type="file" accept="image/*" id="fileID" class="input-image" onChange={(e) => this.handleImageUpload(e, '2160x3840_akmerkez')} />
                                        {/* <button class="btn" onChange={this.handleImageUpload}>Gözat</button> */}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>               
            </div >
        );
    }
}
export default UploadAkmerkez_AkbankScreen;