import React, { Component } from "react";
import "./style.css";
import axios from "axios";

const style = { backgroundImage: 'url(/backgrounds/1344x416.webp)' };
const type = '1344x416_akmerkez';

class _1344_416_Cekim extends Component {
    constructor(props) {
        super(props);
        let skip = Math.floor(Math.random() * 6)
        this.state = {
            img: false,
            skip: Math.floor(Math.random() * 6),
            first: true,
            id: window.localStorage.getItem('id'),
            currentStyle: style
        };
    }

    componentDidMount() {
        if (this.state.first === true) {
            this.getImg();
        }
        this.interval = setInterval(async () => {
            this.getImg();
        }, 15000)
    }

    getImg() {
        let skip = this.state.skip;
        // if (skip > 74) {
        //     skip = 0;
        // }
        let id = this.state.id;
        axios.post("https://www.tesvik-sgk.com/signal/image/getImageAkmerkez", { skip, type,id }).then((res) => {
            if (res?.data?.status === true) {
                // let path = `../images/${skip}-min.webp`;
                skip = Math.floor(Math.random() * 6)
                this.setState({
                    img: res?.data?.img?.data,
                    skip: skip,
                    first: false,
                    currentStyle: {}
                })
            } else {
                alert('Resim yüklenirken hata oluştu')
            }
        }).catch((err) => {
            alert("Resim yüklenirken hata oluştu");
            console.log(err);
            this.setState({
                currentStyle: style
            })
        })
    }
    componentWillUnmount() { clearInterval(this.interval) }


    setImgHeigth() {
        const resim = document.getElementById('img');
        const sayfaYukseklik = window.innerHeight;
        const resimYukseklik = resim.clientHeight;

        if (resimYukseklik < sayfaYukseklik * 0.85) {
            resim.style.left = '-5%';
            resim.style.width = '55%';
        }
    }



    renderImg(img) {
        // let data = `${img?.data}`.replace('"', '').replace('"', '');
        let data = img;
        return <img id="img" src={data} alt="image_480" class="bg_landscape"></img>
    }

    render() {
        return (
            <div class="bg_landscape" style={this.state.currentStyle}>
                {this.state.img !== false ? this.renderImg(this.state.img) : <div></div>}
            </div>
        );

    }
}
export default _1344_416_Cekim;