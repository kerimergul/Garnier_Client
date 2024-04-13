import React, { Component } from "react";
import "./style.css";
import axios from "axios";

const type = '960x2016_akmerkez';
const style = { backgroundImage: 'url(/backgrounds/960x2016.webp)' };

class _960_2016_Cekim extends Component {
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
    setImageWidth() {
        const resim = document.getElementById('img');
        const sayfaGenislik = window.innerWidth;
        const resimGenislik = resim.clientWidth;

        if (resimGenislik < sayfaGenislik) {
            resim.style.height = '72%';
            resim.style.maxHeight = '72%';
            resim.style.top = '35%';
        }
    }


    renderImg(img) {
        // let data = `${img?.data}`.replace('"', '').replace('"', '');
        let data = img;
        return <img id='img' src={data} alt="image_480" class="bg_vertical"  ></img>
    }

    render() {
        return (
            <div class="bg_vertical" style={this.state.currentStyle}>
                {this.state.img !== false ? this.renderImg(this.state.img) : <div></div>}
            </div>
        );

    }
}
export default _960_2016_Cekim;