import React, { Component } from "react";
import "./style.css";
import axios from "axios";

const style = { backgroundImage: 'url(/backgrounds/bg_1548_946-min.jpg)' };

class _1548_946 extends Component {
    constructor(props) {
        super(props);
        let skip = Math.floor(Math.random() * 6)
        this.state = {
            img: `../images/${skip}-min.webp`,
            skip: Math.floor(Math.random() * 6),
            first: true,
        };
    }

    componentDidMount() {
        // if (this.state.first === true) {
        //     this.getImg();
        // }
        this.interval = setInterval(async () => {
            this.getImg();
        }, 6000)
    }

    getImg() {
        let skip = this.state.skip;
        // if (skip > 74) {
        //     skip = 0;
        // }
        // axios.post("https://www.tesvik-sgk.com/signal/api/image/getImage", { skip }).then((res) => {
        //     if (res?.data?.status === true) {
        let path = `../images/${skip}-min.webp`;
        skip = Math.floor(Math.random() * 6)
        this.setState({
            img: path,
            skip: skip,
            first: false
        })
        // } else {
        //     alert('Resim yüklenirken hata oluştu')
        // }
        // }).catch((err) => {
        //     alert("Resim yüklenirken hata oluştu");
        //     console.log(err);
        // })
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
        return <img id="img" src={data} alt="image_480" class="i_landscape_v1" onLoad={this.setImgHeigth}></img>
    }

    render() {
        return (
            <div class="bg_landscape"
                style={style}>
                {this.state.img !== false ? this.renderImg(this.state.img) : <div></div>}
            </div>
        );

    }
}
export default _1548_946;