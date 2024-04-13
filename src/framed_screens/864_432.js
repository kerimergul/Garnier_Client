import React, { Component } from "react";
import "./style.css";
import axios from "axios";

const style = { backgroundImage: 'url(/backgrounds/bg_864_432-min.jpg)' };

class _864_432 extends Component {
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



    renderImg(img) {
        // let data = `${img?.data}`.replace('"', '').replace('"', '');
        let data = img;
        return <img src={data} alt="image_480" class="i_landscape_v1"></img>
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
export default _864_432;