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
        this.setState(() => ({
            data: data
        }));
    }

    uploadToServer = (data) => {
        alert('Yükleme işlemi başladı.')
        this.setState(() => ({
            loading: true
        }));
        try {
            blobcnv(data, (error, image) => {
                if (error) {
                    throw error;
                }
                axios.post("https://www.tesvik-sgk.com/signal/api/image/upload", { image }).then((res) => {
                    console.log(res);
                    if (res?.data?.status === true) {
                        alert("image başarıyla yüklendi");
                    } else {
                        alert('image yüklenirken hata oluştu')
                    }
                    this.setState(() => ({
                        loading: false
                    }));
                }).catch((err) => {
                    alert("image yüklenirken hata oluştu");
                    this.setState(() => ({
                        loading: false
                    }));
                    console.log(err);
                })
            })
        } catch (err) {
            console.log(err);
            this.setState(() => ({
                loading: false
            }));
        }
    }


    async downloadImage(data) {
        console.log(data);
        return;
    }

    async handleImageUpload(event) {
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

            this.uploadToServer(compressedFile);

            this.setState({
                data: compressedFile
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
                        <h3>Garnier Resim Yükle</h3>
                        <div class="drop_box">
                            <header>
                                <h4>Dosyayı seçiniz</h4>
                            </header>
                            <p>Desteklenen dosya tipleri: PNG, JPG</p>
                            {this.state.loading ? <div class="loader"></div> : <input type="file" accept="image/*" id="fileID" class="input-image" onChange={(e) => this.handleImageUpload(e)} />}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
export default UploadScreen;