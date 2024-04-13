import React, { Component } from "react";
import "./style.css";
import axios from "axios";

const style = { backgroundImage: 'url(/backgrounds/bg_1080_1920-min.jpg)' };

class _1080_1920_Kanyon extends Component {
    constructor(props) {
        super(props);
        let skip = 0;
        this.state = {
            img: false,
            skip: 0,
            first: true,
        };
    }

    componentDidMount() {
        if (this.state.first === true) {
            this.getImg();
        }
        this.interval = setInterval(async () => {
            this.getImg();
        }, 6000)
    }

    getImg() {
        let skip = this.state.skip;
        // if (skip > 74) {
        //     skip = 0;
        // }
        axios.post("https://www.tesvik-sgk.com/signal/api/image/getImage", { skip }).then((res) => {
            if (res?.data?.status === true) {
                // console.log(res?.data);
                // let path = `../images/${skip}-min.webp`;
                skip = skip + 1;
                this.setState({
                    img: res?.data?.img?.data,
                    skip: skip,
                    first: false
                })
            } else {
                alert('Resim yüklenirken hata oluştu')
            }
        }).catch((err) => {
            alert("Resim yüklenirken hata oluştu");
            console.log(err);
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
        return <img id='img' src={data} alt="image_480" class="i_v1" onLoad={this.setImageWidth}  ></img>
    }

    render() {
        return (
            <div class="bg_vertical"
                style={style}>
                {this.state.img !== false ? this.renderImg(this.state.img) : <div></div>}
            </div>
        );

    }
}
export default _1080_1920_Kanyon;



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