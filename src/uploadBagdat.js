import React, { Component } from "react";
import "./uploadScreen.css";
import imageCompression from 'browser-image-compression';
import axios from "axios";
import blobcnv from "blob-to-base64";

const specs = [{ width: 1080, height: 1920 }, { width: 480, height: 720 }, { width: 576, height: 864 }, { width: 768, height: 1152 }];


class UploadBagdatScreen extends Component {
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
            blobcnv(data, function (error, img) {
                if (error) {
                    throw error;
                }

                axios.post("https://www.tesvik-sgk.com/signal/api/image/uploadBagdat", { img }).then((res) => {
                    console.log(res);
                    if (res?.data?.status === true) {
                        alert("Resim başarıyla yüklendi");
                    } else {
                        alert('Resim yüklenirken hata oluştu')
                    }
                }).catch((err) => {
                    alert("Resim yüklenirken hata oluştu");
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
                    <div class="card">
                        <h3>CaddeBostan için Resim Yükle</h3>
                        <div class="drop_box">
                            <header>
                                <h4>Dosyayı seçiniz</h4>
                            </header>
                            <p>Desteklenen dosya tipleri: JPEG, JPG, PNG</p>
                            <input type="file" accept="image/*" id="fileID" class="input-image" onChange={(e) => this.handleImageUpload(e)} />
                            {/* <button class="btn" onChange={this.handleImageUpload}>Gözat</button> */}
                        </div>
                    </div>
                </div>
                {this.state.data == false ? <div></div> :
                    <div>
                        <h3 class="image-card">Yüklenmiş Resimler</h3>
                        {this.renderDifferentSizeImg()}
                    </div>
                }
            </div>
        );
    }
}
export default UploadBagdatScreen;