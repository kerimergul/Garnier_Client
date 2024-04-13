import React, { Component } from "react";
import "./style.css";
import axios from "axios";
const type = '1080x1920_akmerkez';
const style = { backgroundImage: 'url(/backgrounds/1080x1920.webp)' };

class _1080_1920_Cekim extends Component {
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
        axios.post("https://www.tesvik-sgk.com/signal/image/getImageAkmerkez", { skip, type, id }).then((res) => {
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
            resim.style.width = '100%';
        }
    }

    renderImg(img) {
        // let data = `${img?.data}`.replace('"', '').replace('"', '');
        let data = img;
        return <img id='img' src={data} alt="image_480" class="bg_vertical" ></img>
    }

    render() {
        return (
            <div class="bg_vertical" style={this.state.currentStyle}>
                {this.state.img !== false ? this.renderImg(this.state.img) : <div></div>}
            </div>
        );

    }
}
export default _1080_1920_Cekim;



// import React, { Component } from "react";
// import "./style.css";
// import axios from "axios";

// const style = { backgroundImage: 'url(/backgrounds/bg_1080_1920.jpg)' };

// class _1080_1920 extends Component {
//     constructor(props) {
//         super(props);
//         this.state = {
//             img: false,
//             counter: 0,
//             index: 0
//         };
//     }

//     componentDidMount() {
//         this.getImg();
//     }

//     getImg() {
//         let skip = 0;
//         axios.post("https://signal-server.onrender.com/api/image/getImage", { skip }).then((res) => {
//             if (res?.data?.status === true) {
//                 this.setState({
//                     img: res.data.img,
//                 })
//             } else {
//                 alert('Resim yüklenirken hata oluştu')
//             }
//         }).catch((err) => {
//             alert("Resim yüklenirken hata oluştu");
//             console.log(err);
//         })
//     }

//     componentWillUnmount() { }


//     renderImg(img) {
//         let data = `${img?.data}`.replace('"', '').replace('"', '');
//         return <img src={data} alt="image_480" class="i"></img>
//     }

//     render() {
//         return (
//             <div class="_1080_1920"
//                 style={style}>
//                 {this.state.img !== false ? this.renderImg(this.state.img) : <div></div>}
//             </div>
//         );

//     }
// }
// export default _1080_1920;